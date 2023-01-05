// Getting the form element
const form = document.getElementById('generate-form');
// Getting the qrcode element where QR code will be displayed once it generated
const qrCode = document.getElementById('qrcode');

const onGenerateSubmit = (e) => {
  // to prevent the default behaviour of submitting the form
  e.preventDefault();
  // getting the color from the user :)
  const colorValue = document.getElementById('colour').value;
  //   to clear the UI(Previous QR code/Download Button from the site before taking any other new request)
  ClearUI();
  //   we are using "value" to retrive the value of the input only : the url and the size
  const urlLink = document.getElementById('url').value;
  const size = document.getElementById('size').value;
  // if user enters without giving any input string to it.
  if (!urlLink) {
    alert('Enter a valid URL please!');
  } else {
    // when someone submits the form we want to show them the spinner to give them a feel that we are processing the data
    showSpinner(); //calling the function to enable the css
    // but we want to show for some secs only
    // after 1000 milisec it will despair
    setTimeout(() => {
      hideSpinner();
      // after hiding the spinner we want to show the result
      generateQrCode(urlLink, size, colorValue);
      //   after generating the QR code we will show them the download button
      setTimeout(() => {
        const Link = qrCode.querySelector('img').src;
        generateDownloadQrButton(Link);
        // we are giving 50 secs wait to appear the QR code in the page and then we will show the download button :)
      }, 50);
    }, 1000);
  }
};
// to show spinner when clicked on submit
const showSpinner = () => {
  document.getElementById('spinner').style.display = 'block';
};
// to remove/hide spinner when page loads
const hideSpinner = () => {
  document.getElementById('spinner').style.display = 'none';
};
// QR code generation (QR js part)
const generateQrCode = (link, size, color) => {
  var qrcodeOutput = new QRCode(document.getElementById('qrcode'), {
    text: link,
    width: size,
    height: size,
    colorDark: color,
    colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.H,
  });
};
const ClearUI = () => {
  // we doing this because next user clicks on generate it should remove the previous first and then place the new but if we don't do this it will be place one upon another.
  qrCode.innerHTML = '';
  const btnElement = document.getElementById('save-link');
  if (btnElement) {
    btnElement.remove();
  }
};
// Button for downloading the QR code
const generateDownloadQrButton = (downloadLink) => {
  const button = document.createElement('a');
  button.id = 'save-link';
  button.href = downloadLink;
  button.download = 'qrcode';
  button.classList =
    'bg-red-500 hover:bg-red-700 text-white font-bold py-2 rounded w-1/3 m-auto my-5';
  button.innerHTML = 'Download the QR';
  //   in last step we are adding the button dynamically using js to HTML page
  document.getElementById('QrSection').appendChild(button);
};

// here we are working with  the color of the QR code

form.addEventListener('submit', onGenerateSubmit);
