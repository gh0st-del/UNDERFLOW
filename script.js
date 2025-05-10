// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Page Navigation
    const navLinks = document.querySelectorAll('.nav-link');
    const pageSections = document.querySelectorAll('.page-section');
    
    // Add click event listeners to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.getAttribute('data-page');
            
            // Hide all page sections
            pageSections.forEach(section => {
                section.classList.remove('active');
            });
            
            // Remove active class from all nav links
            navLinks.forEach(navLink => {
                navLink.classList.remove('active');
            });
            
            // Show the target page section
            document.getElementById(targetPage).classList.add('active');
            
            // Add active class to clicked nav link
            this.classList.add('active');
        });
    });
    
    // Tool Search Functionality
    const searchInput = document.getElementById('search');
    const tools = document.querySelectorAll('.tool');
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        tools.forEach(tool => {
            const toolName = tool.getAttribute('data-name').toLowerCase();
            const isVisible = toolName.includes(searchTerm);
            
            // If filter is active, respect both search and filter
            if (currentFilter !== 'all') {
                const toolType = tool.getAttribute('data-type');
                tool.style.display = (isVisible && toolType === currentFilter) ? 'block' : 'none';
            } else {
                tool.style.display = isVisible ? 'block' : 'none';
            }
        });
    });
    
    // Tool Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    let currentFilter = 'all'; // Default filter
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterType = this.getAttribute('data-filter');
            currentFilter = filterType;
            
            // Remove active class from all filter buttons
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked filter button
            this.classList.add('active');
            
            // Apply filter to tools
            tools.forEach(tool => {
                const toolType = tool.getAttribute('data-type');
                
                if (filterType === 'all') {
                    // If search is active, respect both search and filter
                    if (searchInput.value) {
                        const toolName = tool.getAttribute('data-name').toLowerCase();
                        tool.style.display = toolName.includes(searchInput.value.toLowerCase()) ? 'block' : 'none';
                    } else {
                        tool.style.display = 'block';
                    }
                } else {
                    // If search is active, respect both search and filter
                    if (searchInput.value) {
                        const toolName = tool.getAttribute('data-name').toLowerCase();
                        tool.style.display = (toolType === filterType && toolName.includes(searchInput.value.toLowerCase())) ? 'block' : 'none';
                    } else {
                        tool.style.display = toolType === filterType ? 'block' : 'none';
                    }
                }
            });
        });
    });
    
    // Installation Instructions Toggle
    const installToggles = document.querySelectorAll('.install-toggle');
    
    installToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const instructions = this.nextElementSibling;
            const toggleIcon = this.querySelector('.toggle-icon');
            
            // Toggle display of instructions
            if (instructions.style.display === 'none' || !instructions.style.display) {
                instructions.style.display = 'block';
                toggleIcon.textContent = '-';
            } else {
                instructions.style.display = 'none';
                toggleIcon.textContent = '+';
            }
        });
    });
    
    // Matrix Animation Background
    function createMatrixBackground() {
        const canvas = document.createElement('canvas');
        canvas.classList.add('matrix-animation');
        document.body.appendChild(canvas);
        const ctx = canvas.getContext('2d');
        
        // Set canvas dimensions
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // Characters to display
        const chars = '01'.split('');
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        
        // Array to track the y position of each column
        const drops = [];
        for (let i = 0; i < columns; i++) {
            drops[i] = 1;
        }
        
        // Drawing function
        function draw() {
            // Set semi-transparent black background to create fade effect
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Set text color and font
            ctx.fillStyle = '#0f0';
            ctx.font = fontSize + 'px monospace';
            
            // Loop through drops array
            for (let i = 0; i < drops.length; i++) {
                // Select random character
                const text = chars[Math.floor(Math.random() * chars.length)];
                
                // Draw character
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                // Send it to the top when it hits the bottom
                // Add randomness to the reset
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                
                // Increment y coordinate
                drops[i]++;
            }
        }
        
        // Run the animation
        setInterval(draw, 35);
        
        // Handle window resize
        window.addEventListener('resize', function() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }
    
    // Uncomment the line below if you want to enable the matrix background
    // createMatrixBackground();
});