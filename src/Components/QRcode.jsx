import { useState } from 'react'
import '../Components/QR-code.css'
const QRcode = () => {
    const[img,setImage]=useState("")
    const[loading,setLoading]=useState(false);
    const[QRdata,setQRdata]=useState("https://google.in/");
    const[qrSize,setQrsize]=useState("150")
    function generateQR(){
        setLoading(true);
        try{
            const url=`https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=%22${encodeURIComponent(QRdata)}`;
            setImage(url);

        }
        catch(error)
        {
            console.error("Error Generating Qr code",error)

        }
        finally{
            setLoading(false);
        }

    }
    function downloadQR(){
        fetch(img)
        .then((response)=>response.blob())
        .then((blob)=>{
            const link=document.createElement("a");
            link.href=URL.createObjectURL(blob);
            link.download="qrcode.png";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        })

    }
  return (
        <div className="app-container">
            <h1>QR _Code_Generator</h1>
           {loading && <p>please wait...</p>}
            {img && <img src={img} className='qr-code-img' />}
          <div>
                <label htmlFor="data-input"   className='input-label'>
                Data for QR Code 
                </label>
                <input type='text' id ="data-input" placeholder='Enter data for QRCode'
                value={QRdata} onChange={(e)=>setQRdata(e.target.value)}/> 

                <label htmlFor="size-input"  className='input-label' >
                Image size(e.g.,150):
                </label>
                <input type='text' id ="size-input" value={qrSize}  onChange={(e)=>setQrsize(e.target.value)} placeholder='Enter the image size'/> 
                <button className='generate-btn' disabled={loading} onClick={generateQR}>Generate QR_code</button>
                <button className='download-btn' onClick={downloadQR}>Download QR_code</button>
           </div>
           <p className='footer'>Designed by Tharani</p>

        </div>
  )
}

export default QRcode
