import { useState } from "react";

function useHome() {
    const [isManageOpen, setIsManageOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const onManageOpen = () => setIsManageOpen(true);
    const onSearchOpen = () => setIsSearchOpen(true);

    return [
        isManageOpen,
        isSearchOpen,
        setIsManageOpen,
        setIsSearchOpen,
        onManageOpen,
        onSearchOpen,
    ];
}

export default useHome;
