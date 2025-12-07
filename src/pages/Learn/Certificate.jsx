import React from "react";
import "./Certificate.css";
import image1 from './1.jpg'
// import image2 from './2.png'
import image3 from './3.png'
import image4 from './4.png'
import image5 from './5.png'

const Certificate = ({ userName, courseTitle }) => {
  const currentDate = new Date().toLocaleDateString();
  const randomNumber = Math.floor(100000 + Math.random() * 900000);

  return (
    <div className="certificate-container" id="certificate">
      <img src={image1} alt="Frame" className="cert-frame" />
      <div className="cert-content">
        <div className="cert-header">
          <img src={image3} alt="V&V Logo" className="vv-logo" />
          {/* <img src={image2} alt="Scheme Logo" className="scheme-logo" /> */}
        </div>

        <h1 className="cert-title">Certificate Of Completion</h1>

        <p className="cert-text">
          This is to certify that <strong>{userName}</strong> has successfully
          completed the <strong>“ENTREPRENEUR LITE”</strong> on {currentDate} conducted by
          <strong> V & V Educators</strong>.
        </p> 

        <div className="cert-footer">
          <img src={image5} alt="Badge" className="badge" />
          <div className="vv-tagline">
            <img src={image4} alt="QR Code" className="qr-code" />
            <p className="cert-number">
              CERTIFICATE NO: V&V-{randomNumber}-{currentDate.replaceAll("/", "")}
            </p>
            <p className="hashtag">#VANDVLIFE</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
