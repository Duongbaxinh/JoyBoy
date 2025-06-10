import {
    AccountIcon,
    BillIcon,
    BoxIcon,
    CalendarIcon,
    CancelIcon,
    CategoriesIcon,
    ChannelIcon,
    CheckIcon,
    CoinIcon,
    CustomerIcon,
    EmployeeIcon,
    EnddayIcon,
    ExportIcon,
    EyeIcon,
    GuaranteeIcon,
    ImportIcon,
    OrderIcon,
    PartnerIcon,
    PayRollIcon,
    ReportIcon,
    ReturnIcon,
    SaleIcon,
    SettingCommissionIcon,
    SettingEmployeeIcon,
    SettingIcon,
    SupplyIcon,
    SwitchIcon,
    TagIcon,
    TimeKeepingIcon
} from "@/assets/icons";
import { AccountType, pageType, SettingType } from "@/interfaces";
import { report } from "process";
import { BiLogOut } from "react-icons/bi";
import { MdManageHistory } from "react-icons/md";
import { RiProfileFill } from "react-icons/ri";

export const pages: pageType[] = [
    {
        id: "dashboard",
        title: "Dashboard",
        url: "/dashboard",
        icon: <EyeIcon className="w-full h-full" />
    },
    {
        id: "product",
        title: "Products",
        url: "/product",
        icon: <BoxIcon className="w-full h-full" />
    },
    {
        id: "transactions",
        title: "Transactions",
        url: "/transactions",
        icon: <SwitchIcon className="w-full h-full" />
    },
    {
        id: "partner",
        title: "Partner",
        url: "/partner",
        icon: <AccountIcon className="w-full h-full" />
    },
    {
        id: "employees",
        title: "Employees",
        url: "/employees",
        icon: <EmployeeIcon className="w-full h-full" />
    },
    {
        id: "report",
        title: "Report",
        url: "/report",
        icon: <ReportIcon className="w-full h-full" />
    }
];

export const pageParent: pageType[] = [
    {
        id: "#",
        title: "Tổng quan",
        url: "/dashboard",
        icon: <EyeIcon className="w-full h-full" />,
        type: "link"
    },
    {
        id: "product",
        title: "Sản phẩm",
        url: "/product",
        icon: <BoxIcon className="w-full h-full" />,
        type: "button"
    },
    {
        id: "transactions",
        title: "Giao dịch",
        url: "/transaction",
        icon: <SwitchIcon className="w-full h-full" />,
        type: "button"
    },
    {
        id: "partner",
        title: "Đối tác",
        url: "/partner",
        icon: <AccountIcon className="w-full h-full" />,
        type: "button"
    },
    {
        id: "employees",
        title: "Nhân viên",
        url: "/employees",
        icon: <EmployeeIcon className="w-full h-full" />,
        type: "button"
    },
    {
        id: "report",
        title: "Báo cáo",
        url: "/report",
        icon: <ReportIcon className="w-full h-full" />,
        type: "button"
    }
];

export const pageChildren: { [key: string]: pageType[] } = {
    product: [
        {
            id: "product",
            title: "Danh muc",
            url: "/product/category",
            icon: <CategoriesIcon className="w-full h-full" />
        },
        {
            id: "price",
            title: "Thiết lập giá",
            url: "/product/price",
            icon: <CoinIcon className="w-full h-full" />
        },
        {
            id: "store",
            title: "Kiểm kho",
            url: "/product/store",
            icon: <CheckIcon className="w-full h-full" />
        }
    ],
    transactions: [
        {
            id: "order",
            title: "Đặt hàng",
            url: "/transaction/order",
            icon: <OrderIcon className="w-full h-full" />
        },
        {
            id: "invoice",
            title: "Hóa đơn",
            url: "/transaction/invoice",
            icon: <BillIcon className="w-full h-full" />
        },
        {
            id: "delivery-note",
            title: "Vận đơn",
            url: "/transaction/delivery-note",
            icon: <TagIcon className="w-full h-full" />
        },
        {
            id: "return",
            title: "Trả hàng",
            url: "/transaction/return",
            icon: <ReturnIcon className="w-full h-full" />
        },
        {
            id: "repair-request",
            title: "Yêu cầu sửa chữa",
            url: "/transaction/repair-request",
            icon: <ReportIcon className="w-full h-full" />
        },
        {
            id: "import",
            title: "Nhập hàng",
            url: "/transaction/import",
            icon: <ImportIcon className="w-full h-full" />
        },
        {
            id: "import-return",
            title: "Trả hàng nhập",
            url: "/transaction/import-return",
            icon: <ExportIcon className="w-full h-full" />
        },
        {
            id: "cancellation",
            title: "Xuất hủy",
            url: "/transaction/cancellation",
            icon: <CancelIcon className="w-full h-full" />
        }
    ],
    report: [
        {
            id: "end-of-day",
            title: "Cuối ngày",
            url: "/report/end-of-day",
            icon: <EnddayIcon className="w-full h-full" />
        },
        {
            id: "sales",
            title: "Bán hàng",
            url: "/report/sales",
            icon: <SaleIcon className="w-full h-full" />
        },
        {
            id: "order",
            title: "Đặt hàng",
            url: "/report/order",
            icon: <OrderIcon className="w-full h-full" />
        },
        {
            id: "product",
            title: "Hàng hóa",
            url: "/report/product",
            icon: <BoxIcon className="w-full h-full" />
        },
        {
            id: "customers",
            title: "Khách hàng",
            url: "/report/customers",
            icon: <CustomerIcon className="w-full h-full" />
        },
        {
            id: "suppliers",
            title: "Nhà cung cấp",
            url: "/report/suppliers",
            icon: <SupplyIcon className="w-full h-full" />
        },
        {
            id: "employees",
            title: "Nhân viên",
            url: "/report/employees",
            icon: <EmployeeIcon />
        },
        {
            id: "sales-channels",
            title: "Kênh bán hàng",
            url: "/report/sales-channels",
            icon: <ChannelIcon className="w-full h-full" />
        },
        {
            id: "finance",
            title: "Tài chính",
            url: "/report/finance",
            icon: <CoinIcon className="w-full h-full" />
        }
    ],
    employees: [
        {
            id: "staff",
            title: "Nhân viên",
            url: "/employee/staff",
            icon: <EmployeeIcon className="w-full h-full" />
        },
        {
            id: "schedule",
            title: "Lịch làm việc",
            url: "/employee/schedule",
            icon: <CalendarIcon className="w-full h-full" />
        },
        {
            id: "timekeeping",
            title: "Chấm công",
            url: "/employee/timekeeping",
            icon: <TimeKeepingIcon className="w-full h-full" />
        },
        {
            id: "payroll",
            title: "Bảng tính lương",
            url: "/employee/payroll",
            icon: <PayRollIcon className="w-full h-full" />
        },
        {
            id: "commission-setup",
            title: "Thiết lập hoa hồng",
            url: "/employee/commission-setup",
            icon: <SettingCommissionIcon className="w-full h-full" />
        },
        {
            id: "employee-setup",
            title: "Thiết lập nhân viên",
            url: "/employee/employee-setup",
            icon: <SettingEmployeeIcon className="w-full h-full" />
        }
    ],
    partner: [
        {
            id: "customer",
            title: "Customer",
            url: "/partner/customer",
            icon: <CustomerIcon className="w-full h-full" /> // Replace with actual icon
        },
        {
            id: "supplier",
            title: "Supplier",
            url: "/partner/supplier",
            icon: <SupplyIcon className="w-full h-full" />
        },
        {
            id: "cooperator",
            title: "Partner",
            url: "/partner/partner",
            icon: <PartnerIcon className="w-full h-full" />
        }
    ]
};

export const setting: SettingType[] = [
    {
        id: 1,
        url: "StoreSettings",
        title: "Store Settings",
        icon: <SettingIcon />
    },
    {
        id: 2,
        url: "TemplateManagement",
        title: "Template Management",
        icon: <MdManageHistory />
    },
    {
        id: 3,
        url: "UserManagement",
        title: "User Management",
        icon: <AccountIcon />
    },
    {
        id: 4,
        url: "BranchManagement",
        title: "Branch Management",
        icon: <AccountIcon />
    },
    {
        id: 5,
        url: "ActionHistory",
        title: "Action History",
        icon: <ReturnIcon />
    }
];

export const account: AccountType[] = [
    {
        id: 1,
        url: "Account",
        title: "Account",
        icon: <AccountIcon />
    },
    {
        id: 2,
        url: "StoreProfile",
        title: "Store Profile",
        icon: <RiProfileFill />
    },
    {
        id: 3,
        url: "Logout",
        title: "Logout",
        icon: <BiLogOut />
    }
];
