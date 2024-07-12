import { useState } from "react";
import '../../../pages/e_approval/E_Approval.css';
import { Folder } from "./Folder";

export function FolderList({ folders }) {

    const [isOpen, setIsOpen] = useState({});

    return (
        <>
            {folders
                .filter(folder => folder.refFolderId === null)
                .map(folder => {
                    return <Folder folder={folder}
                        key={folder.folderId}
                        folders={folders}
                        isOpen={isOpen}
                        setIsOpen={setIsOpen} />
                })
            }
        </>
    );
}
