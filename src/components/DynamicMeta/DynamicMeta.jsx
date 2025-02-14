import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import previewImage from "./preview.jpeg"
const DynamicMeta = ({ title, description, image }) => {
    const location = useLocation();
    const url = `${window.location.origin}${location.pathname}`;
    const metaImage = image === null ? previewImage : image
    return (
        <Helmet>
            <title>{title || "MedxBay"}</title>
            <meta name="description" content={description} />

            {/* Open Graph (OG) Meta Tags for Facebook, WhatsApp */}
            <meta name="title" content={title || "MedxBay"} />
            <meta name="description" content={description || "MedxBay is an AI-enabled healthcare platform that revolutionizes provider workflows and patient care."} />
            <meta name="image" content={metaImage} />
            <meta name="url" content={url || "https://medxbay.com"} />
            <meta name="type" content="website" />

            {/* Twitter Meta Tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title || "MedxBay"} />
            <meta name="twitter:description" content={description || "MedxBay is an AI-enabled healthcare platform that revolutionizes provider workflows and patient care."} />
            <meta name="twitter:image" content={metaImage} />
        </Helmet>
    );
};

export default DynamicMeta;
