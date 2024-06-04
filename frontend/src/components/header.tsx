import logo from '../../public/noteTubeLogo.png';

export default function Header() {
  return (
    <header className='h-20 w-auto border-b border-slate-600 px-4'>
        <div className='lg:max-w-screen-lg mx-auto flex items-center justify-between h-full'>
            <div className='flex justify-between items-center w-full'>
                  <div className='w-[100px]'>
                      <img src={logo} alt={'logo'} />
                  </div>
                <h1 className='text-xl lg:text-2xl font-extrabold text-red-100 tracking-wide text-right pr-5'>YouTube Notes Generator</h1>
            </div>
        </div>
    </header>
  )
}