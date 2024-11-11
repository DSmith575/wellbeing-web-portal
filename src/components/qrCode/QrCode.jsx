import QRCode from "react-qr-code";
import { useDownloadQRCode } from "../hooks/useDownloadQrCode";
import Button from "../../buttons/Button";
import { BsQrCodeScan } from "react-icons/bs";

const QrCode = ({ qrCodeValue, hideQr, showQrIcon }) => {
  const { svgRef, downloadQRCode } = useDownloadQRCode(qrCodeValue);
  return (
    <>
      <image ref={svgRef}>
        <QRCode
          className={`rounded-lg shadow-md ${hideQr ? "hidden" : ""}`}
          value={qrCodeValue.id || qrCodeValue}
          size={256}
        />
      </image>
      <Button
        styles={`bg-green-500 hover:bg-green-400 ${!showQrIcon && "mt-2"}`}
        onClick={downloadQRCode}
        children={
          showQrIcon ? (
            <BsQrCodeScan size={20} className={"text-white"} />
          ) : (
            "Download Qr Code"
          )
        }
      />
    </>
  );
};

export default QrCode;
