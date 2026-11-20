// Moved from the WordPress blog (post 141, published 16.06.2024, edited 07.11.2026). Text unchanged except the
// "Using Custom Code" section, whose code example was missing on WordPress; it now points to the custom code guide.
export default {
  slug: 'how-to-disable-comments-in-wordpress',
  title: 'How to Disable Comments in WordPress',
  date: '2024-06-16',
  updated: '2026-11-07',
  excerpt: 'WordPress offers several ways to disable comments, from adjusting settings to using plugins. In this comprehensive guide, we’ll walk you through how to disable comments in WordPress effectively.',
  content: `
<p>Comments can be a valuable part of your WordPress site, fostering engagement and community interaction. However, there are times when you may want to disable comments, whether it's to prevent spam, maintain a professional tone, or streamline your site's content management. Fortunately, WordPress offers several ways to disable comments, from adjusting settings to using plugins. In this comprehensive guide, we’ll walk you through how to disable comments in WordPress effectively.</p>
<h2>Why Disable Comments in WordPress?</h2>
<p>Before diving into the methods, let's explore why you might want to disable comments on your WordPress site:</p>
<ul>
<li><strong>Reduce Spam:</strong> Spam comments can clutter your site and negatively impact user experience.</li>
<li><strong>Improve Performance:</strong> Disabling comments can reduce database load and improve site performance.</li>
<li><strong>Maintain Professionalism:</strong> For corporate or portfolio sites, comments might not be necessary.</li>
<li><strong>Focus on Content:</strong> Disabling comments can help keep the focus on your content rather than discussions.</li>
</ul>
<h2>Methods to Disable Comments in WordPress</h2>
<p>There are several ways to disable comments in WordPress, depending on whether you want to disable them site-wide, on specific posts, or on custom post types. Let’s explore these methods in detail:</p>
<h3>1. Disabling Comments Site-Wide</h3>
<p>If you want to disable comments across your entire WordPress site, the built-in settings make it straightforward.</p>
<h4>Using WordPress Settings:</h4>
<ol>
<li><strong>Navigate to Settings:</strong> Go to your WordPress dashboard and navigate to <code>Settings</code> &gt; <code>Discussion</code>.</li>
<li><strong>Uncheck the Comment Settings:</strong> Uncheck the option “Allow people to submit comments on new posts.” This prevents comments on future posts. Optionally, you can also disable pingbacks and trackbacks by unchecking the appropriate box.</li>
<li><strong>Save Changes:</strong> Click on the “Save Changes” button to apply the new settings.</li>
</ol>
<h4>Closing Comments on Existing Posts:</h4>
<p>To close comments on existing posts, follow these steps:</p>
<ol>
<li><strong>Navigate to Posts:</strong> Go to <code>Posts</code> &gt; <code>All Posts</code>.</li>
<li><strong>Select All Posts:</strong> Check the box at the top to select all posts.</li>
<li><strong>Bulk Actions:</strong> Choose “Edit” from the bulk actions dropdown menu and click “Apply.” In the bulk edit options, set the “Comments” dropdown to “Do not allow.” Click “Update” to apply the changes.</li>
</ol>
<h3>2. Disabling Comments on Specific Posts or Pages</h3>
<p>Sometimes you may want to disable comments on individual posts or pages.</p>
<ol>
<li><strong>Edit the Post/Page:</strong> Go to <code>Posts</code> &gt; <code>All Posts</code> or <code>Pages</code> &gt; <code>All Pages</code>, then click “Edit” on the desired post or page.</li>
<li><strong>Discussion Settings:</strong> Scroll down to the “Discussion” section. If you don’t see it, click on “Screen Options” at the top and check “Discussion.”</li>
<li><strong>Uncheck Allow Comments:</strong> Uncheck the “Allow comments” box.</li>
<li><strong>Update:</strong> Click “Update” to save your changes.</li>
</ol>
<h3>3. Disabling Comments on Custom Post Types</h3>
<p>To disable comments on custom post types, you might need to modify the post type registration code.</p>
<ol>
<li><strong>Locate the Registration Code:</strong> In your theme’s <code>functions.php</code> file or a custom plugin, find the code where the custom post type is registered.</li>
<li><strong>Modify the Code:</strong> Add <code>'supports' =&gt; array( 'title', 'editor', 'thumbnail' )</code> to the post type registration arguments, excluding <code>'comments'</code>.</li>
<li><strong>Save Changes:</strong> Save the changes to your <code>functions.php</code> file or custom plugin.</li>
</ol>
<h3>4. Using Plugins to Disable Comments</h3>
<p>If you prefer not to touch any code or settings manually, several plugins can help you disable comments in WordPress easily.</p>
<h4>Recommended Plugin: Disable Comments</h4>
<p>The Disable Comments plugin is a popular choice for disabling comments across your entire site or on specific post types.</p>
<ol>
<li><strong>Install and Activate the Plugin:</strong> Go to <code>Plugins</code> &gt; <code>Add New</code>, search for “Disable Comments,” install, and activate the plugin.</li>
<li><strong>Configure Plugin Settings:</strong> Go to <code>Settings</code> &gt; <code>Disable Comments</code>. Choose whether to disable comments everywhere or only on certain post types. Save your settings.</li>
</ol>
<h3>5. Using Custom Code to Disable Comments</h3>
<p>If you are comfortable with code, you can also turn comments off with a short snippet in your theme’s <code>functions.php</code> file or a snippets plugin. Our guide on <a href="/how-to-add-custom-code-in-wordpress/">how to add custom code in WordPress</a> explains the safe ways to add it.</p>
<h3>Best Practices for Disabling Comments</h3>
<ul>
<li><strong>Backup Your Site:</strong> Always backup your site before making changes.</li>
<li><strong>Test Changes:</strong> Test the changes in a staging environment to ensure they work as expected.</li>
<li><strong>Update Regularly:</strong> Keep your WordPress site, themes, and plugins updated to prevent security vulnerabilities.</li>
</ul>
<h2>Conclusion</h2>
<p>Disabling comments in WordPress can help you maintain control over your site’s content and user interactions. Whether you choose to disable comments site-wide, on specific posts, or through custom post types, WordPress provides flexible options to meet your needs. Using plugins like Disable Comments can simplify the process, especially for those who prefer not to delve into code. By following this guide, you can effectively disable comments and focus on delivering high-quality content to your audience.</p>
`,
};
