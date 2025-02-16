export interface HeaderInterface {
    pageParent: pageType[];
    pageChildren: {[key: string]: pageType[]};
    isOpenMenu?: boolean | null;
    onOpenMenu?: () => void;
}
export interface ButtonOption {
    parentItem: pageType;
    childrenItem: pageType[];
}

export type pageType = {
    id: string;

    title?: string;
    url: string;
    icon: JSX.Element;
    type?: string;
};

export interface SettingType {
    id: number;
    title: string;
    url: string;
    icon: JSX.Element;
}
export interface AccountType extends SettingType {}
