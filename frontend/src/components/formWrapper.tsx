import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export interface FormDataInterface{
    youtubeUrl: string
} 

export interface FormWrapperProps{
    error: string | null; 
    invokeNotesApi: (formData: FormDataInterface) => Promise<void>
}

export default function FormWrapper({error, invokeNotesApi}: FormWrapperProps) {
    const [formData, setFormData] = useState<FormDataInterface>({ youtubeUrl: '' });

    const handleOnSubmit = useCallback((event: React.SyntheticEvent) => {
        event.preventDefault();
        invokeNotesApi(formData);
     }, [formData, invokeNotesApi]);

    useEffect(() => {
      if(error) toast.error(error)
    },[error])

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, youtubeUrl: e.target.value});
    }, [formData]);

    return (
            <><h2 className="text-4xl lg:text-6xl text-white">Quick Notes for <span className="bg-gradient-to-r from-purple-600 via-red-500 to-indigo-400 inline-block text-transparent bg-clip-text">YouTube Video</span> for free</h2><p className="mt-4 text-white">Instantly, without uploading any files!</p><form className="flex flex-col lg:flex-row items-center justify-between p-8 mx-6 w-[80%]" onSubmit={handleOnSubmit}>
            <div className="px-4 mr-8 lg:mx-8 w-full">
                <input type="text" className="block w-full p-4 border border-blue-300 rounded-lg bg-transparent text-white focus:ring-blue-500 focus:border-blue-500" placeholder="Enter YouTube URL..... https://www.youtube.com/watch?v=AAABBBCCCDDD" required onChange={handleInputChange} />
            </div>
            <input type="submit" className="font-bold rounded-full text-center text-white bg-transparent border-2 border-purple-300 px-6 py-4 m-0 mt-6 lg:mt-0" value={"Generate Notes"} />
        </form><p className="text-white">Quick and Simple</p></>
    )
}