
        // Function to add and remove the border outline after 1 second
        function applyBorderOutline(div) {
            // Add the border outline class
            div.classList.add('border-outline');
            // Remove the class after 1 second
            setTimeout(() => {
                div.classList.remove('border-outline');
            }, 1000);
        }

        // Get all divs with the 'clickable' class
        const clickableDivs = document.querySelectorAll('.clickable');

        // Add click event listener to each div
        clickableDivs.forEach(div => {
            div.addEventListener('click', () => {
                applyBorderOutline(div);
            });
        });

        function rgbToHsl(r, g, b) {
            r /= 255;
            g /= 255;
            b /= 255;
            const max = Math.max(r, g, b);
            const min = Math.min(r, g, b);
            let h, s;
            const l = (max + min) / 2;

            if (max === min) {
                h = s = 0; // achromatic
            } else {
                const d = max - min;
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

                switch (max) {
                    case r:
                        h = (g - b) / d + (g < b ? 6 : 0);
                        break;
                    case g:
                        h = (b - r) / d + 2;
                        break;
                    case b:
                        h = (r - g) / d + 4;
                        break;
                }

                h /= 6;
            }

            return [h * 360, s * 100, l * 100];
        }

        // Function to lighten HSL color
        function lightenColor(hsl, percent) {
            return `hsl(${hsl[0]}, ${hsl[1]}%, ${Math.min(hsl[2] + percent, 100)}%)`;
        }

        function addLighterBorder(div) {
            const bgColor = window.getComputedStyle(div).backgroundColor;
            const rgb = bgColor.match(/\d+/g).map(Number);

            const hsl = rgbToHsl(rgb[0], rgb[1], rgb[2]);

            const lighterBorder = lightenColor(hsl, 30); // Lighten by 30%

            div.style.border = `3px solid ${lighterBorder}`;
        }

        const clickableDiv = document.querySelectorAll('.clickable');

        clickableDiv.forEach(div => {
                addLighterBorder(div);
        });
        const mySpan = document.getElementById("upload-text");
        
        const overlayImage = document.querySelector('.overlay-image'); // Overlay image element

        const loader = document.getElementById("loader");

        loader.style.fill = `blue`;

        const loader_upload = document.getElementById("loader-upload");

        loader_upload.style.fill = `white`;

        function changeImage(color) {
            const img = document.getElementById("umbrella");
            const upload = document.getElementById("upload");
            if(color != loader.style.fill){
            // Show the loader and hide the image
            loader.style.visibility = 'visible';
            loader_upload.style.visibility = 'visible';

            img.style.opacity = '0';
            overlayImage.style.display = 'none';
            upload.style.opacity = '0';

            // Delay to simulate loading time
            setTimeout(() => {
                switch (color) {
                    case 'pink':
                        img.src = "./assets/Pink umbrella.png"; // Red image
                        loader.style.fill = `pink`;
                        break;
                    case 'yellow':
                        img.src = "./assets/Yellow umbrella.png"; // Green image
                        loader.style.fill = `yellow`;
                        break;
                    case 'blue':
                        img.src = "./assets/Blue umbrella.png"; // Blue image
                        loader.style.fill = `blue`;
                        break;
                    default:
                        img.src = "https://via.placeholder.com/200"; // Default image
                        break;
                }

                // After changing the image, hide the loader and show the image
                img.style.opacity = '1';
                console.log(mySpan,mySpan.textContent)
                overlayImage.style.display = mySpan.textContent == 'UPLOAD YOUR LOGO' ? 'none' : 'block';
                upload.style.opacity = '1';
                loader.style.visibility = 'hidden';
                loader_upload.style.visibility = 'hidden';
            }, 1000); // 1 second delay
        }  
        }

        function triggerFileInput() {
            const fileInput = document.getElementById('file-input');
            fileInput.click(); // Trigger the click event on the hidden input
        }

        const fileInput = document.getElementById('file-input'); // File input element
       
        fileInput.addEventListener('change', (event) => {
            const file = event.target.files[0]; // Get the uploaded file
            const fileName = file.name;

            const img = document.getElementById("umbrella");
            const upload = document.getElementById("upload");
            const crossbutton = document.getElementById("crossbutton");

            const fileType = file.type; // Get the file's MIME type

            if (file) {
                if (fileType === 'image/png' || fileType === 'image/jpeg') {
                loader.style.visibility = 'visible';
                loader_upload.style.visibility = 'visible';
    
                img.style.opacity = '0';
                overlayImage.style.display = 'none';
                upload.style.opacity = '0';

                setTimeout(() => {
                const reader = new FileReader(); // Create a FileReader to read the image
                reader.onload = (e) => {
                    overlayImage.src = e.target.result; // Set the image source to the uploaded image
                    overlayImage.style.display = 'block'; // Make the overlay image visible
                    crossbutton.style.display = 'inline-block'; // Make the Cross Visible
                };

                reader.readAsDataURL(file); // Read the file as a data URL

                mySpan.textContent = fileName;

                img.style.opacity = '1';
                upload.style.opacity = '1';
                loader.style.visibility = 'hidden';
                loader_upload.style.visibility = 'hidden';
            }, 1000); // 1 second delay
        } else {
            mySpan.textContent = 'UPLOAD YOUR LOGO';
        }
            } else {
                mySpan.textContent = 'UPLOAD YOUR LOGO';
            }

        });


        function removeimage() {
            const img = document.getElementById("umbrella");
            const upload = document.getElementById("upload");
            const crossbutton = document.getElementById("crossbutton");

            fileInput.value = "";

                loader.style.visibility = 'visible';
                loader_upload.style.visibility = 'visible';
    
                img.style.opacity = '0';
                overlayImage.style.display = 'none';
                upload.style.opacity = '0';
                crossbutton.style.display = 'none';

                setTimeout(() => {
             
                overlayImage.src = '#';
                mySpan.textContent = 'UPLOAD YOUR LOGO';

                img.style.opacity = '1';
                upload.style.opacity = '1';
                loader.style.visibility = 'hidden';
                loader_upload.style.visibility = 'hidden';
            }, 1000); // 1 second delay
        }
        
