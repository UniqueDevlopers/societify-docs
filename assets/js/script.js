document.addEventListener('DOMContentLoaded', () => {
    // Navigation Handling
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    function switchSection(targetId) {
        // Update Nav
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('data-target') === targetId);
        });

        // Update Content
        sections.forEach(section => {
            section.classList.toggle('active', section.id === targetId);
        });

        window.scrollTo(0, 0);
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');
            switchSection(targetId);
        });
    });

    // Content Tabs Handling
    document.querySelectorAll('.tabs').forEach(tabContainer => {
        const buttons = tabContainer.querySelectorAll('.tab-btn');
        const contentContainer = tabContainer.nextElementSibling; // The .tab-wrapper is the next sibling

        if (!contentContainer || !contentContainer.classList.contains('tab-wrapper')) {
            console.error('Tab wrapper not found for tabs:', tabContainer);
            return;
        }

        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetTab = btn.getAttribute('data-tab');

                // 1. Deactivate all buttons in this specific tab container
                buttons.forEach(b => b.classList.remove('active'));

                // 2. Deactivate all content in the associated wrapper
                contentContainer.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

                // 3. Activate clicked button
                btn.classList.add('active');

                // 4. Activate target content
                const targetContent = contentContainer.querySelector(`#${targetTab}`);
                if (targetContent) {
                    targetContent.classList.add('active');
                } else {
                    console.error(`Target tab content #${targetTab} not found.`);
                }
            });
        });
    });

    // Activate first section by default
    if (sections.length > 0) {
        switchSection(sections[0].id);
    }
});
