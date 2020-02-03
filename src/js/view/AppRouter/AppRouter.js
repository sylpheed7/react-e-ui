import {
    Fragment,
    Suspense,
    lazy
} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';


const ButtonPage = lazy(() => import('../common/ButtonPage'));
const IconPage = lazy(() => import('../common/IconPage'));
const AvatarPage = lazy(() => import('../common/AvatarPage'));
const DividerPage = lazy(() => import('../common/DividerPage'));
import MenuPage from '../common/MenuPage';
import DatePickerPage from '../common/DatePickerPage';
const CheckboxRadio = lazy(() => import('../common/checkboxRadio'));
const InputPage = lazy(() => import('../common/InputPage'));
const DropdownPage = lazy(() => import('../common/DropdownPage'));
const TabsPage = lazy(() => import('../common/TabsPage'));
const TreePage = lazy(() => import('../common/TreePage'));
const TooltipPage = lazy(() => import('../common/TooltipPage'));
const TextTypePage = lazy(() => import('../common/TextTypePage'));
const ModalPage = lazy(() => import('../common/modal'));
// const SelectPage = lazy(() => import('../common/SelectPage'));
import SelectPage from '../common/SelectPage';
const UploadPage = lazy(() => import('../common/UploadPage'));
import FormPage from '../common/FormPage';
import LayoutPage from '../common/LayoutPage';
const TablePage = lazy(() => import('../common/TablePage'));
const BasicForm = lazy(() => import('../form/BasicForm'));
const TableList = lazy(() => import('../list/TableList'));
const BasicList = lazy(() => import('../list/BasicList'));
const CardList = lazy(() => import('../list/CardList'));
const SearchArticleList = lazy(() => import('../list/SearchArticleList'));
const SearchProductList = lazy(() => import('../list/SearchProductList'));
const SearchAppList = lazy(() => import('../list/SearchAppList'));
const Exception403 = lazy(() => import('../exception/403'));
const Exception404 = lazy(() => import('../exception/404'));
const Exception500 = lazy(() => import('../exception/500'));
const Success = lazy(() => import('../result/Success'));
const Fail = lazy(() => import('../result/Fail'));
const Committing = lazy(() => import('../result/Committing'));
const UserInfo = lazy(() => import('../user/UserInfo'));
const UserSet = lazy(() => import('../user/UserSet'));
const CascaderPage = lazy(() => import('../common/CascaderPage'));
import PaginationTest from '../common/PaginationTest';
const SwitchPage = lazy(() => import('../common/SwitchPage'));  // switch 开关
const ProgressPage = lazy(() => import('../common/ProgressPage'));  // progress 进度条
const TransferPage = lazy(() => import('../common/TransferPage'));  // TransferPage 穿梭框
const ToastPage = lazy(() => import('../common/ToastPage'));  // ToastPage 穿梭框
const TagPage = lazy(() => import('../common/TagPage'));  // ToastPage 穿梭框
const BreadcrumbPage = lazy(() => import('../common/BreadcrumbPage'));  // BreadcrumbPage 面包屑
const Cardpage = lazy(() => import('../common/CardPage'));  // CardPage 卡片

const TreeSelectPage = lazy(() => import('../common/TreeSelectPage'));  // CardPage 卡片

import TableDemo from '../TableDEMO/TableDEMO';


const routes = [
    {
        path: "/common/TablePage",
        component: TablePage
    },
    {
        path: "/common/Treeselect",
        component: TreeSelectPage
    },
    {
        path: "/common/Layoutpage",
        component: LayoutPage
    },
    {
        path: "/table/Demo",
        component: TableDemo
    },
    {
        path: "/common/cardpage",
        component: Cardpage
    },
    {
        path: "/common/breadcrumbpage",
        component: BreadcrumbPage
    },
    {
        path: "/common/toast",
        component: ToastPage
    },
    {
        path: "/common/button",
        component: ButtonPage
    },
    {
        path: "/common/icon",
        component: IconPage
    },
    {
        path: "/common/menu",
        component: MenuPage
    },
    {
        path: "/common/date-picker",
        component: DatePickerPage
    },
    {
        path: "/common/checkbox-radio",
        component: CheckboxRadio
    },
    {
        path: "/common/input",
        component: InputPage
    },
    {
        path: "/common/CascaderPage",
        component: CascaderPage
    },
    {
        path: "/common/dropdown",
        component: DropdownPage
    },
    {
        path: "/common/tabs",
        component: TabsPage
    },
    {
        path: "/common/tree",
        component: TreePage
    },
    {
        path: "/common/tooltip",
        component: TooltipPage
    },
    {
        path: "/common/textType",
        component: TextTypePage
    },
    {
        path: "/common/modal",
        component: ModalPage
    },
    {
        path: "/common/SelectPage",
        component: SelectPage
    },
    {
        path: "/common/UploadPage",
        component: UploadPage
    },
    {
        path: "/common/FormPage",
        component: FormPage
    },
    {
        path: "/common/switch",
        component: SwitchPage
    },
    {
        path: "/common/progress",
        component: ProgressPage
    },
    {
        path: "/common/transfer",
        component: TransferPage
    },
    {
        path: "/common/tag",
        component: TagPage
    },
    {
        path: "/form/basic-form",
        component: BasicForm
    },
    {
        path: "/list/table-list",
        component: TableList
    },
    {
        path: "/list/basic-list",
        component: BasicList
    },
    {
        path: "/list/card-list",
        component: CardList
    },
    {
        path: "/list/articles",
        component: SearchArticleList
    },
    {
        path: "/list/products",
        component: SearchProductList
    },
    {
        path: "/list/apps",
        component: SearchAppList
    },
    {
        path: "/exception/403",
        component: Exception403
    },
    {
        path: "/exception/404",
        component: Exception404
    },
    {
        path: "/exception/500",
        component: Exception500
    },
    {
        path: "/result/success",
        component: Success
    },
    {
        path: "/result/fail",
        component: Fail
    },
    {
        path: "/result/committing",
        component: Committing
    },
    {
        path: "/user/userInfo",
        component: UserInfo
    },
    {
        path: "/user/userSet",
        component: UserSet
    },
    {
        path: "/common/PaginationTest",
        component: PaginationTest
    },
    // {
    //     path: "/common/TableTest",
    //     component: TableTest
    // },
    {
        path: "/common/avatar",
        component: AvatarPage
    },
    {
        path: "/common/divider",
        component: DividerPage
    }
];
//  [
//     {
//         path: "/bus",
//         component: Bus
//     },
//     {
//         path: "/cart",
//         component: Cart,
//         routes: [
//             {
//                 path: "/cart/item",
//                 component: CartItem
//             }
//         ]
//     }
// ];

let a = [];
function AppRoutes(arrayRoutes) {
    arrayRoutes.map((route, i) => {
        a.push((
            <Route
                key={i}
                exact
                path={route.path}
                component={route.component}
            />
        ));
        if (Array.isArray(route.routes) && route.routes.length > 0) {
            AppRoutes(route.routes)
        }
    });
}
AppRoutes(routes);


export default a;