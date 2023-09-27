export async function hello(data) {
    const outputDir = 'output';
  
    // Load newsletter data from JSON
    // const newsletterDataResponse = await fetch('data/newsletter_data.json');
    const newsletterDataArray = data;
  
   console.log("newsletter_data:",data)

    // Read the content template for the content section only
    const contentTemplatePath = `./templates/content_template.txt`;
    const contentTemplateResponse = await fetch(contentTemplatePath);
    const contentTemplateContent = await contentTemplateResponse.text();
  
    // Initialize an empty string to store the combined HTML content
    let combinedHtml = '';
  
    // Iterate through newsletter data objects and generate combined content
    for (const newsletterData of newsletterDataArray) {
      // Create a dictionary with data for rendering the content section
  
      const data = {
        text: newsletterData.text,
        title: newsletterData.title,
        imgSrc: newsletterData.imgSrc,
        name: newsletterData.name,
      };
  
      let imgElement = '';
    if (data.imgSrc !== null) {
      imgElement = `<img src="${data.imgSrc}" alt="Avatar" style="width:200px" class="center-img">`;
    }

      // Render the content section template with data using template literals
      const renderedContent = `
      <div class="card">
          <div class="container">
            <div class="row">
              <div class="column">
              <h4><b>${data.name}</b></h4>
              <p>${data.text}</p>
              </div>
              <div class="column">
              ${imgElement}
              </div>
            </div>
          </div>
        </div>
        <br>
      `;
  
      // Append the rendered content section to the combinedHtml string
      combinedHtml += renderedContent;
    }
  
    // Generate a single filename for the combined content
    const combinedFilename = `${outputDir}/combined_newsletter.html`;
  
    // Read the main template for the main HTML structure
    const mainTemplatePath = `./templates/newsletter_template.txt`;
    const mainTemplateResponse = await fetch(mainTemplatePath);
    const mainTemplateContent = await mainTemplateResponse.text();
  
    // Replace the title placeholder in the main template with the first title from JSON
    const firstTitle = newsletterDataArray.length > 0 ? newsletterDataArray[0].title : '';
    let finalNewsletter = mainTemplateContent.replace('<%= title %>', firstTitle);
  
    // Replace the content placeholder in the main template with the combined content
    finalNewsletter = finalNewsletter.replace('<%- content_placeholder %>', combinedHtml);
  
    // Create a Blob containing the HTML content
    const blob = new Blob([finalNewsletter], { type: 'text/html' });
  
    // Create an object URL for the Blob
    const blobUrl = URL.createObjectURL(blob);
  
    // Create a link element for downloading the file
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = 'combined_newsletter.html';
  
    // Trigger a click event to download the file
    a.click();
  
    console.log('Combined newsletter generated successfully!');
  }
  