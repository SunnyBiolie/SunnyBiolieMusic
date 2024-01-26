interface UploadLayoutProps {
  children: React.ReactNode;
}

export async function generateMetadata() {
  return {
    title: "Upload",
  };
}

const UploadLayout = ({ children }: UploadLayoutProps) => {
  return <>{children}</>;
};

export default UploadLayout;
