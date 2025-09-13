import React from "react";
import type { SvgIconProps } from "@mui/material/SvgIcon";

// Import the specific icons you plan to support in your UI.
// Add more here as needed.
import DevicesIcon from "@mui/icons-material/Devices";
import GroupsIcon from "@mui/icons-material/Groups";
import VerifiedIcon from "@mui/icons-material/Verified";
import HandshakeIcon from "@mui/icons-material/Handshake";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import BalanceIcon from "@mui/icons-material/Balance";

// 1) Define the set of supported icon keys as a union.
//    Add keys here as you add new icons above.
//    Using lowercase keys makes it easy to use values directly from JSON/config.
export type IconKey =
    | "devices"
    | "groups"
    | "balance"
    | "handshake"
    | "verified"
    | "wallet";

// 2) Map icon keys to actual components
const ICONS: Record<IconKey, React.ComponentType<SvgIconProps>> = {
    devices: DevicesIcon,
    groups: GroupsIcon,
    balance: BalanceIcon,
    verified: VerifiedIcon,
    handshake: HandshakeIcon,
    wallet: AccountBalanceWalletIcon,
};

export type IconByNameProps = SvgIconProps & {
    name?: string | null; // allow undefined/null safely
    fallback?: IconKey;   // optional fallback icon key
};

// 3) Render icon by name, with optional fallback and graceful no-op if unknown.
const IconByName: React.FC<IconByNameProps> = ({ name, fallback = "code", ...props }) => {
    if (!name) return null;

    // normalize to lowercase to make inputs forgiving
    const normalized = String(name).toLowerCase() as IconKey;

    const Component =
        (ICONS[normalized as IconKey] as React.ComponentType<SvgIconProps>) ||
        ICONS[fallback];

    return <Component {...props} />;
};

export default IconByName;