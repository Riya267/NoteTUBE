import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ActivityIndicator } from '../utils/helper';
import HowItWorks from '../components/ui/HowItWorks';
import { useAppContext } from '../context/appContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { howItWorksData, noteTubeFeatures } from '../utils/constants';
import YoutubeSummaryForm from '../components/containers/YoutubeSummaryForm';
import NoteTubeFeaturesGrid from '../components/ui/NoteTubeFeaturesGrid';

export default function Dashboard() {
  const { summary, isLoading } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (summary && !isLoading) navigate('/generate');
  }, [isLoading, summary]);

  return (
    <div className="relative flex flex-col">
      {isLoading && !summary && (
        <div className="fixed inset-0 bg-black bg-opacity-10 backdrop-blur-sm flex justify-center items-center z-50">
          <ActivityIndicator />
        </div>
      )}
      <YoutubeSummaryForm />
      <NoteTubeFeaturesGrid noteTubeFeatures={noteTubeFeatures} />
      <HowItWorks {...howItWorksData} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}
