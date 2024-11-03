// {/* Sliding Menu for mobile and tablet devices */}
// <div className={`fixed top-0 right-0 h-full bg-black w-5/12 text-white transition-transform transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} z-50`}>
// <div className="flex flex-col p-6 justify-center items-center">
//   {/* Close button in sliding menu */}
//   <button onClick={toggleMenu} className="self-end text-white" aria-label="Close menu">
//     <X className='w-7 h-7' />
//   </button>

//   {/* Navigation links in sliding menu */}
//   {navLinks.map((link) => (
//     <Link
//       key={link.path}
//       to={link.path}
//       className="py-2 text-white hover:text-white"
//       onClick={() => setIsOpen(false)} // Close menu on link click
//     >
//       {link.label}
//     </Link>
//   ))}

//   {/* Login Dropdown in sliding menu */}
//   <DropdownMenu>
//     <DropdownMenuTrigger asChild>
//       <button className="py-2 text-white hover:text-white">
//         Login
//       </button>
//     </DropdownMenuTrigger>
//    <LoginDropdown/>
//   </DropdownMenu>

//   {/* Registration Dropdown in sliding menu */}
//   <DropdownMenu>
//     <DropdownMenuTrigger asChild>
//       <button className="py-2 text-white hover:text-white">
//         Register
//       </button>
//     </DropdownMenuTrigger>
//    <RegisterDropdown/>
//   </DropdownMenu>

//   {/* Feedback link in sliding menu */}
//   <Link
//     to="/feedback"
//     className="py-2 text-white hover:text-white"
//     onClick={() => setIsOpen(false)} // Close menu on link click
//   >
//     Feedback
//   </Link>
// </div>
// </div>

// {/* Overlay for the sliding menu */}
// {isOpen && (
// <div
//   className="fixed inset-0 bg-black bg-opacity-50 z-40"
//   onClick={toggleMenu} // Close menu when clicking outside 
// />
// )}



    //   {/* Hamburger menu for mobile and tablet devices */}
    //   <div className="flex lg:hidden">
    //     <button onClick={toggleMenu} className="text-white">
    //       {isOpen ? <X className='w-4 h-4'/> : <Menu className='w-7 h-7'/>} 
    //     </button>
    //   </div>

      // const toggleMenu = () => {
  //   setIsOpen(!isOpen);
  // };

//   const [isOpen, setIsOpen] = useState(false); // State to manage the menu visibility
