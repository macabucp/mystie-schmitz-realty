/* ================================================================
   BLOG PAGE INTERACTIVITY
   ================================================================ */

// Log blog post views for analytics
function logBlogView() {
    const pageTitle = document.querySelector('h1')?.textContent || 'Blog Index';
    const postMeta = document.querySelector('.blog-post-meta');
    const category = postMeta?.querySelector('span:nth-child(3)')?.textContent || 'General';

    console.log('✓ Blog Post Viewed', {
        timestamp: new Date().toISOString(),
        title: pageTitle,
        category: category,
        url: window.location.pathname,
    });
}

// Log related post clicks
const relatedLinks = document.querySelectorAll('.blog-related-item a');
relatedLinks.forEach((link) => {
    link.addEventListener('click', function (e) {
        const relatedTitle = this.textContent;
        console.log('→ Related Post Clicked:', {
            timestamp: new Date().toISOString(),
            relatedTitle: relatedTitle,
            fromPost: document.querySelector('h1')?.textContent,
        });
    });
});

// Smooth scroll for back to blog link
const backLink = document.querySelector('.blog-back-link');
if (backLink) {
    backLink.addEventListener('click', function (e) {
        if (this.getAttribute('href') === 'index.html') {
            console.log('→ Navigating back to blog index');
        }
    });
}

// Reading time estimate (optional enhancement)
function estimateReadingTime() {
    const content = document.querySelector('.blog-post-content');
    if (content) {
        const wordCount = content.innerText.split(/\s+/).length;
        const readingTime = Math.ceil(wordCount / 200); // Average reading speed: 200 words/minute

        console.log('Reading Estimate', {
            wordCount: wordCount,
            estimatedMinutes: readingTime,
            contentLength: wordCount > 1000 ? 'Long' : wordCount > 500 ? 'Medium' : 'Short',
        });
    }
}

// Initialize blog page on load
window.addEventListener('load', function () {
    logBlogView();
    estimateReadingTime();
});

// Track scroll position on blog posts for engagement metrics
let scrollPercentage = 0;

window.addEventListener('scroll', function () {
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = window.scrollY;
    const newScrollPercentage = (scrolled / docHeight) * 100;

    // Log when user reaches different scroll milestones
    if (newScrollPercentage > 25 && scrollPercentage <= 25) {
        console.log('→ User scrolled 25% through content');
    }
    if (newScrollPercentage > 50 && scrollPercentage <= 50) {
        console.log('→ User scrolled 50% through content');
    }
    if (newScrollPercentage > 75 && scrollPercentage <= 75) {
        console.log('→ User scrolled 75% through content');
    }

    scrollPercentage = newScrollPercentage;
});

// Handle blog grid hover effects
const blogPostCards = document.querySelectorAll('.blog-post-card');
blogPostCards.forEach((card, index) => {
    card.addEventListener('mouseenter', function () {
        const postTitle = this.querySelector('.blog-post-title a').textContent;
        console.log(`→ Blog post hovered: ${postTitle}`);
    });

    card.addEventListener('click', function () {
        const postLink = this.querySelector('.blog-post-title a');
        const postTitle = postLink.textContent;
        const postCategory = this.querySelector('.blog-category').textContent;

        console.log('✓ Blog Post Selected', {
            timestamp: new Date().toISOString(),
            title: postTitle,
            category: postCategory,
            position: index + 1,
        });
    });
});
