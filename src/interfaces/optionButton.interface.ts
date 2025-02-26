export interface MenuItem {
    id: string | number;
    title?: string;
    url: string;
    icon: JSX.Element;
    type?: string;
}

export interface OptionButtonProps {
    parentItem: MenuItem;
    childrenItem: MenuItem[];
    customParenItem?: string;
    customChildrenItem?: string;
    customChildrenContainer?: string;
    customParentIcon?: string;
    customChildrenIcon?: string;
    customChildrenLabel?: string;
    customParentLabel?: string;
    hoverStyle?: string;
}
