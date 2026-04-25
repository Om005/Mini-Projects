// import React, { useContext, useState } from "react"
// import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar"
// import { Link } from "react-router-dom"
// import { motion } from "framer-motion"
// import { cn } from "../lib/utils"
// import Guest2 from "./Guest2"
// import { AppContent } from "../context/Appcontex"
// import { IconFolder, IconFile } from "@tabler/icons-react"

// export default function Ide() {
//   const { userData, files } = useContext(AppContent)
//   const [open, setOpen] = useState(false)
//   // console.log(files)
//   const renderFileSystem = (items) => {
//     return items.map((item) => (
//       <React.Fragment key={item.name}>
//         <SidebarLink
//           link={{
//             label: item.name,
//             href: "#",
//             icon: item.type === "folder" ? "folder" : (item.type),
//             type: item.type,
//             children: item.children,
//           }}
//         />
//         {item.type === "folder" && item.children && (
//           <div style={{ marginLeft: "16px" }}>{renderFileSystem(item.children)}</div>
//         )}
//       </React.Fragment>
//     ))
//   }


//   return (
//     <div
//       className={cn(
//         "rounded-md flex md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 max-w7xl mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
//         "h-[100vh]",
//       )}
//     >
//       <Sidebar open={open} setOpen={setOpen}>
//         <SidebarBody className="justify-between gap-10">
//           <div className={`flex flex-col flex-1 ${open ? "overflow-y-auto" : "overflow-y-hidden"} overflow-x-hidden`}>
//             {open ? <Logo /> : <LogoIcon />}
//             <div className="mt-8 flex flex-col gap-2">{files && renderFileSystem(files)}</div>
//           </div>
//           <div>
//             <SidebarLink
//               link={{
//                 label: userData.name,
//                 href: "#",
//                 icon: "user",
//               }}
//             />
//           </div>
//         </SidebarBody>
//       </Sidebar>
//       <Guest2 signup={true} />
//     </div>
//   )
// }

// export const Logo = () => {
//   return (
//     <Link to={"/"} className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20">
//       <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
//       <motion.span
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         className="font-medium text-black dark:text-white whitespace-pre"
//       >
//         PIXELCODE
//       </motion.span>
//     </Link>
//   )
// }

// export const LogoIcon = () => {
//   return (
//     <Link to={"/"} className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20">
//       <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
//     </Link>
//   )
// }

// import React, { useContext, useState } from "react"
// import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar"
// import { Link } from "react-router-dom"
// import { motion } from "framer-motion"
// import { cn } from "../lib/utils"
// import Guest2 from "./Guest2"
// import { AppContent } from "../context/Appcontex"
// import { IconFolder, IconFile } from "@tabler/icons-react"

// export default function Ide() {
//   const { userData, files } = useContext(AppContent)
//   const [open, setOpen] = useState(false)

//   const renderFileSystem = (items) => {
//     // console.log(files)
//     if (!Array.isArray(items)) return null

//     return items.map((item) => (
//       <React.Fragment key={item.name}>
//         <SidebarLink
//           link={{
//             label: item.name,
//             href: "#",
//             icon: item.type === "folder" ? "folder" : item.type,
//             type: item.type,
//             children: item.children,
//           }}
//         />
//         {item.type === "folder" && item.children && (
//           <div style={{ marginLeft: "16x" }}>{open && renderFileSystem(item.children)}</div>
//         )}
//       </React.Fragment>
//     ))
//   }

//   return (
//     <div
//       className={cn(
//         "rounded-md flex md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 max-w7xl mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
//         "h-[100vh]",
//       )}
//     >
//       <Sidebar open={open} setOpen={setOpen}>
//         <SidebarBody className="justify-between gap-10">
//           <div className={`flex flex-col flex-1 ${open ? "overflow-y-auto" : "overflow-y-hidden"} overflow-x-hidden`}>
//             {open ? <Logo /> : <LogoIcon />}
//             <div className="mt-8 flex flex-col gap-2">
//               {files && renderFileSystem(files)}
//             </div>
//           </div>
//           <div>
//             <SidebarLink
//               link={{
//                 label: userData.name,
//                 href: "#",
//                 icon: "user",
//               }}
//             />
//           </div>
//         </SidebarBody>
//       </Sidebar>
//       <Guest2 signup={true} />
//     </div>
//   )
// }

// export const Logo = () => {
//   return (
//     <Link to={"/"} className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20">
//       <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
//       <motion.span
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         className="font-medium text-black dark:text-white whitespace-pre"
//       >
//         PIXELCODE
//       </motion.span>
//     </Link>
//   )
// }

// export const LogoIcon = () => {
//   return (
//     <Link to={"/"} className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20">
//       <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
//     </Link>
//   )
// }

//-------------------------------------------------------------

import React, { useContext, useState, useEffect } from "react"
import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { cn } from "../lib/utils"
import Guest2 from "./Guest2"
import { AppContent } from "../context/Appcontex"
import { IconFolder, IconFile } from "@tabler/icons-react"

export default function Ide() {
  const { userData, files } = useContext(AppContent)
  const [open, setOpen] = useState(false)
  const [fileSystem, setFileSystem] = useState({})
  const [selectedFile, setSelectedFile] = useState(null)
  const [openFolders, setOpenFolders] = useState({})

  useEffect(() => {
    if (files) {
      const system = buildFileSystem(files)
      setFileSystem(system)
      console.log(system);
    }
  }, [files])
  const buildFileSystem = (files) => {
    console.log(files)
    const system = {}
    files.forEach((file) => {
      const parts = file.path.split("/")
      let current = system
      parts.forEach((part, index) => {
        if (index === parts.length - 1) {
          current[part] = { ...file, name: part }
        } else {
          if (!current[part]) {
            current[part] = { type: "folder", name: part, children: {} }
          }
          current = current[part].children
        }
      })
    })
    return system
  }

  const toggleFolder = (folderPath) => {
    setOpenFolders((prev) => {
      const newState = { ...prev, [folderPath]: !prev[folderPath] };
      console.log(newState);  // Log the new state
      return newState;
    });
  };
  

  const renderFileSystem = (items, currentPath = "") => {
    return Object.entries(items).map(([name, item]) => {
      const fullPath = `${currentPath}${name}`
      if (item.type === "folder") {
        console.log(item.type)
        return (
          <React.Fragment key={fullPath}>
            <SidebarLink
              link={{
                label: name,
                href: "#",
                icon: "folder",
                isOpen: openFolders[fullPath],
                // onToggle: () => toggleFolder(fullPath),
              }}
            onClick={()=>toggleFolder(fullPath)}
            />
            {openFolders[fullPath] && (
              <div style={{ marginLeft: "16px" }}>{renderFileSystem(item.children, `${fullPath}/`)}</div>
            )}
          </React.Fragment>
        )
      } else {
        return (
          <SidebarLink
            key={fullPath}
            link={{
              label: name,
              href: "#",
              icon: item.type,
              type: item.type,
            }}
            onClick={() => {
              setSelectedFile(item)
              console.log(item)
            }}
          />
        )
      }
    })
  }

  return (
    <div
      className={cn(
        "rounded-md flex md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 max-w7xl mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-[100vh]",
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className={`flex flex-col flex-1 ${open ? "overflow-y-auto" : "overflow-y-hidden"} overflow-x-hidden`}>
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">{renderFileSystem(fileSystem)}</div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: userData.name,
                href: "#",
                icon: "user",
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      {/* <Guest2 item={selectedFile} /> */}
      <Guest2 item={selectedFile} />
    </div>
  )
}

export const Logo = () => {
  return (
    <Link to={"/"} className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20">
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        PIXELCODE
      </motion.span>
    </Link>
  )
}

export const LogoIcon = () => {
  return (
    <Link to={"/"} className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20">
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  )
}

