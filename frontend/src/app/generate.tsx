import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CardGrid from '../components/ui/NoteTubeFeaturesGrid';
import HowItWorks from '../components/ui/HowItWorks';
import { useAppContext } from '../context/appContext';
import { Navigate } from 'react-router-dom';
import { howItWorksData, noteTubeFeatures } from '../utils/constants';
import QuickPrompts from '../components/containers/QuickPrompts';
import SummaryWrapper from '../components/containers/SummaryWrapper';

export default function Generate() {
  const { summary } = useAppContext();
  if (!summary) {
    toast.info('Please Enter Youtube Link to generate summary');
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return (
    <div className="relative flex flex-col">
      <SummaryWrapper />
      <QuickPrompts />
      <CardGrid noteTubeFeatures={noteTubeFeatures} />
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
