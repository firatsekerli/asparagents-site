/**
 * asparagents Google Ads export (Google Ads script, runs hourly inside account 809-433-2405).
 *
 * READ ONLY: it never changes anything in the account. It copies the figures the asparagents Desk shows
 * into tabs of the asparagents Content Sheet, overwritten on every run:
 *   Ads Daily        per day and campaign, last 90 days: impressions, clicks, cost, conversions
 *   Ads Ad Groups    per ad group, last 28 days
 *   Ads Search Terms per search term, last 28 days (top 200 by impressions)
 *   Ads Keywords     per keyword, last 28 days: match type, status, Quality Score, impressions, clicks, cost, conversions
 *   Ads Landing Pages per final URL, last 28 days
 *   Ads Share        per campaign, last 28 days: search impression share and why impressions were lost
 *   Ads Auction      per campaign and competitor domain, last 28 days (Google only returns this to some accounts;
 *                    when it does not, the Status tab says so)
 *   Ads Status       last run time, currency, export results
 *
 * Setup (once): Google Ads > Tools > Bulk actions > Scripts > + New script, paste this file, Authorize,
 * Preview, Save, Frequency "Hourly". Source of truth: github.com/firatsekerli/asparagents-site tools/google-ads/.
 */

var SHEET_ID = '1sCgzfZEFIC-heClibh5CSko-g2deFFWiUxNe6FRCeO8';
var TZ = 'Europe/Istanbul';

function main() {
  var ss = SpreadsheetApp.openById(SHEET_ID);
  var acct = AdsApp.currentAccount();
  var today = day(0), d28 = day(27), d90 = day(89);
  var results = [];

  results.push(write(ss, 'Ads Daily',
    ['Date', 'Campaign ID', 'Campaign', 'Status', 'Impressions', 'Clicks', 'Cost', 'Conversions', 'Conversion value'],
    'SELECT segments.date, campaign.id, campaign.name, campaign.status, metrics.impressions, metrics.clicks, metrics.cost_micros, ' +
    'metrics.conversions, metrics.conversions_value FROM campaign WHERE segments.date BETWEEN \'' + d90 + '\' AND \'' + today + '\' ' +
    'AND campaign.status != \'REMOVED\' ORDER BY segments.date DESC',
    function (r) { return [r.segments.date, r.campaign.id, r.campaign.name, r.campaign.status, n(r.metrics.impressions), n(r.metrics.clicks),
      money(r.metrics.costMicros), n(r.metrics.conversions), n(r.metrics.conversionsValue)]; }));

  results.push(write(ss, 'Ads Ad Groups',
    ['Campaign', 'Ad group ID', 'Ad group', 'Status', 'Impressions', 'Clicks', 'Cost', 'Conversions'],
    'SELECT campaign.name, ad_group.id, ad_group.name, ad_group.status, metrics.impressions, metrics.clicks, metrics.cost_micros, metrics.conversions ' +
    'FROM ad_group WHERE segments.date BETWEEN \'' + d28 + '\' AND \'' + today + '\' AND ad_group.status != \'REMOVED\' ORDER BY metrics.impressions DESC',
    function (r) { return [r.campaign.name, r.adGroup.id, r.adGroup.name, r.adGroup.status, n(r.metrics.impressions), n(r.metrics.clicks),
      money(r.metrics.costMicros), n(r.metrics.conversions)]; }));

  results.push(write(ss, 'Ads Search Terms',
    ['Search term', 'Campaign', 'Ad group', 'Impressions', 'Clicks', 'Cost', 'Conversions'],
    'SELECT search_term_view.search_term, campaign.name, ad_group.name, metrics.impressions, metrics.clicks, metrics.cost_micros, metrics.conversions ' +
    'FROM search_term_view WHERE segments.date BETWEEN \'' + d28 + '\' AND \'' + today + '\' ORDER BY metrics.impressions DESC LIMIT 200',
    function (r) { return [r.searchTermView.searchTerm, r.campaign.name, r.adGroup.name, n(r.metrics.impressions), n(r.metrics.clicks),
      money(r.metrics.costMicros), n(r.metrics.conversions)]; }));

  results.push(write(ss, 'Ads Keywords',
    ['Campaign', 'Ad group', 'Keyword', 'Match type', 'Status', 'Quality Score', 'Impressions', 'Clicks', 'Cost', 'Conversions'],
    'SELECT campaign.name, ad_group.name, ad_group_criterion.keyword.text, ad_group_criterion.keyword.match_type, ad_group_criterion.status, ' +
    'ad_group_criterion.quality_info.quality_score, metrics.impressions, metrics.clicks, metrics.cost_micros, metrics.conversions ' +
    'FROM keyword_view WHERE segments.date BETWEEN \'' + d28 + '\' AND \'' + today + '\' AND ad_group_criterion.status != \'REMOVED\' ' +
    'AND campaign.status != \'REMOVED\' ORDER BY metrics.impressions DESC',
    function (r) { return [r.campaign.name, r.adGroup.name, r.adGroupCriterion.keyword.text, r.adGroupCriterion.keyword.matchType,
      r.adGroupCriterion.status, (r.adGroupCriterion.qualityInfo && r.adGroupCriterion.qualityInfo.qualityScore) || '', n(r.metrics.impressions),
      n(r.metrics.clicks), money(r.metrics.costMicros), n(r.metrics.conversions)]; }));

  results.push(write(ss, 'Ads Landing Pages',
    ['Landing page', 'Impressions', 'Clicks', 'Cost', 'Conversions'],
    'SELECT landing_page_view.unexpanded_final_url, metrics.impressions, metrics.clicks, metrics.cost_micros, metrics.conversions ' +
    'FROM landing_page_view WHERE segments.date BETWEEN \'' + d28 + '\' AND \'' + today + '\' ORDER BY metrics.impressions DESC',
    function (r) { return [r.landingPageView.unexpandedFinalUrl, n(r.metrics.impressions), n(r.metrics.clicks), money(r.metrics.costMicros),
      n(r.metrics.conversions)]; }));

  results.push(write(ss, 'Ads Share',
    ['Campaign', 'Impressions', 'Impression share', 'Lost to rank', 'Lost to budget', 'Top of page', 'Absolute top'],
    'SELECT campaign.name, metrics.impressions, metrics.search_impression_share, metrics.search_rank_lost_impression_share, ' +
    'metrics.search_budget_lost_impression_share, metrics.search_top_impression_share, metrics.search_absolute_top_impression_share ' +
    'FROM campaign WHERE segments.date BETWEEN \'' + d28 + '\' AND \'' + today + '\' AND campaign.status != \'REMOVED\' ' +
    'AND campaign.advertising_channel_type = \'SEARCH\'',
    function (r) { return [r.campaign.name, n(r.metrics.impressions), pct(r.metrics.searchImpressionShare), pct(r.metrics.searchRankLostImpressionShare),
      pct(r.metrics.searchBudgetLostImpressionShare), pct(r.metrics.searchTopImpressionShare), pct(r.metrics.searchAbsoluteTopImpressionShare)]; }));

  results.push(write(ss, 'Ads Auction',
    ['Campaign', 'Domain', 'Impression share', 'Overlap rate', 'Position above rate', 'Top of page rate', 'Outranking share'],
    'SELECT campaign.name, segments.auction_insight_domain, metrics.auction_insight_search_impression_share, ' +
    'metrics.auction_insight_search_overlap_rate, metrics.auction_insight_search_position_above_rate, ' +
    'metrics.auction_insight_search_top_impression_percentage, metrics.auction_insight_search_outranking_share ' +
    'FROM campaign WHERE segments.date BETWEEN \'' + d28 + '\' AND \'' + today + '\' AND campaign.status != \'REMOVED\'',
    function (r) { return [r.campaign.name, r.segments.auctionInsightDomain, pct(r.metrics.auctionInsightSearchImpressionShare),
      pct(r.metrics.auctionInsightSearchOverlapRate), pct(r.metrics.auctionInsightSearchPositionAboveRate),
      pct(r.metrics.auctionInsightSearchTopImpressionPercentage), pct(r.metrics.auctionInsightSearchOutrankingShare)]; }));

  var st = tab(ss, 'Ads Status');
  st.clear();
  var rows = [['Item', 'Value'], ['Last run', Utilities.formatDate(new Date(), TZ, 'yyyy-MM-dd HH:mm')],
    ['Account', acct.getCustomerId() + ' ' + acct.getName()], ['Currency', acct.getCurrencyCode()]];
  results.forEach(function (x) { rows.push(['Export ' + x[0], x[1]]); });
  st.getRange(1, 1, rows.length, 2).setValues(rows);
}

function write(ss, name, headers, query, map) {
  try {
    var out = [headers];
    var it = AdsApp.search(query);
    while (it.hasNext()) out.push(map(it.next()));
    var sh = tab(ss, name);
    sh.clearContents();
    sh.getRange(1, 1, out.length, headers.length).setValues(out);
    sh.setFrozenRows(1);
    return [name, 'ok, ' + (out.length - 1) + ' rows'];
  } catch (e) {
    return [name, 'ERROR ' + e];
  }
}

function tab(ss, name) { return ss.getSheetByName(name) || ss.insertSheet(name); }
function day(back) { return Utilities.formatDate(new Date(Date.now() - back * 864e5), TZ, 'yyyy-MM-dd'); }
function n(v) { return Number(v || 0); }
function pct(v) { return (v === undefined || v === null || v === '') ? '' : Math.round(Number(v) * 1000) / 10; }
function money(micros) { return Math.round(Number(micros || 0) / 10000) / 100; }
