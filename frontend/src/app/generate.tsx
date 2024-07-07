import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFetchSummary } from '../customHooks/useFetchSummary';
import { ActivityIndicator } from '../utils/helper';
import FormWrapper from '../components/formWrapper';
import NotesWrapper from '../components/summaryWrapper';
import CardGrid from '../components/WhyCardGrid';
import HowItWorks from '../components/howItWorks';
import QuickPrompts from '../components/quickPrompts';
import { useAppContext } from '../context/appContext';
import { Navigate } from 'react-router-dom';

export default function Generate() {
  const { summary } = useAppContext();
  if (!summary) {
    toast.info('Please Enter Youtube Link to generate summary');
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return (
    <div className="relative flex flex-col">
      <NotesWrapper />
      <QuickPrompts />
      <CardGrid />
      <HowItWorks />
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
