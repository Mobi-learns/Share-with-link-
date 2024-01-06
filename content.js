
let storedURL = "";

// Listen for messages from the extension
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "addLink") {
    // Store the current URL
    storedURL = window.location.href;
    console.log("URL stored:", storedURL);
  }
});

// Listen for the 'copy' event on the document
document.addEventListener("copy", function (event) {
  // Check if there is a stored URL
  if (storedURL) {
    // Get the selected text
    const selectedText = window.getSelection().toString();

    // Append the stored URL to the copied text
    const textWithLink = `${selectedText}\n\nSource: ${storedURL}`;

    // Copy the modified text to the clipboard
    event.clipboardData.setData("text/plain", textWithLink);

    // Prevent the default copy behavior
    event.preventDefault();

    console.log("Text with link copied to clipboard:", textWithLink);
  }
});
