import {PureComponent, createRef} from 'react';
import Tree from '../Tree/Tree';
import Icon from '../Icon/Icon';
import {CSSTransition, TransitionGroup} from "react-transition-group";
import isEqual from 'lodash/isEqual';

//scss
import  './index.scss';


function mixin(target = {}, source = {}) {
    Object.getOwnPropertyNames(source).forEach(key => {
        const desc = Object.getOwnPropertyDescriptor(source, key);
        Object.defineProperty(target, key, desc)
    });
    return target;
}

export default class TreeSelect extends PureComponent {
    constructor(props){
        super(props);

        this.state = {
            visible: false,
            treeDataClone: this.setTreeDataIsSelected() || [],
            selectedValue: this.loopDefaultInit() || []
        };

        this.treeSelect = createRef();
    }

    //根据defaultValue设置TreeData选中值
    setTreeDataIsSelected() {
        const {props} = this;

        let treeDataCloneArr = JSON.parse(JSON.stringify(props.treeData));
        let storageCode = [];

        const dataArr = Array.isArray(props.defaultValue) ? props.defaultValue : [props.defaultValue];

        dataArr.map(item => {
            treeDataCloneArr.map((v, i) => {
                if(v.name === item) {
                    storageCode.push(v[props.treeabel.objKey]);
                    treeDataCloneArr[i].isSelected = true;
                }
            })
        });

        if(storageCode.length) {
            storageCode.map(item => {
                treeDataCloneArr.map((v, i) => {
                    if(v[props.treeabel.dataKey] === item) {
                        treeDataCloneArr[i].isSelected = true;
                    }
                })
            });
        }


        return treeDataCloneArr;
    
    }

    //根据defaultValue设置回显值
    loopDefaultInit() {
        const {props} = this;

        const defaultValue = Array.isArray(props.defaultValue) ? props.defaultValue : (props.defaultValue ? [props.defaultValue] : []);

        let a = [];

        defaultValue.map(v => {
            loop(props.treeData, v)
        });

        function loop(arry, item) {
            arry.map((v, i) => {
                if(v.name === item) {
                    a.push(v);
                }

                if(('children' in v) && v.children.length > 0) {
                    loop(v.children, item);
                }
            })
        }

        return (props.maxLabel && a.length > props.maxLabel) ? a.slice(0, Number(props.maxLabel)) : a;
    }

    
    handelClear = e => {
        e.preventDefault();
        e.stopPropagation();

        const {onChange} = this.props;

        const {treeDataClone} = this.state;

        let ad = [...treeDataClone];

        ad.map(v => {
            v['isSelected'] = false;
            v['isCur'] = false;
            v['isPartSelected'] = false;
        });


        this.setState({
            selectedValue: [],
            treeDataClone: ad
        });

        onChange && onChange([], [], ad);
    }

    renderClearBtn() {
        const clearElement = (<Icon onClick={this.handelClear} className="clear" type="deleted" />);
        const {allowClear, defaultValue} = this.props;

        if(allowClear && this.state.selectedValue.length > 0) {
            return clearElement;
        }
    }

    clickNodeGetInfo = (node) => {
        const {onSelect} = this.props;
        onSelect && onSelect(node);
    }

    handleSelectedNode = (leafNodeList, selectedNodeList, treeDataList) => {
        const {onChange, showCheckedStrategy = 'SHOW_ALL', multiple, treeabel: {treeCheckable}, maxLabel} = this.props;

        let tmpArr = [];

        let selectedNodeListArr = [];

        if((multiple || treeCheckable)) {
            if( showCheckedStrategy === 'SHOW_CHILD') {
                selectedNodeListArr = selectedNodeList.filter(item => item.isLeaf);
            }

            if(showCheckedStrategy === 'SHOW_PARENT') {
                selectedNodeList.map(item => {
                    !item.isLeaf && item.children.map(v => {
    
                        const indexa = selectedNodeList.indexOf(v);
    
                        selectedNodeList.splice(indexa, 1);
                    })
                });
    
                selectedNodeListArr = selectedNodeList;
            }

            if(showCheckedStrategy === 'SHOW_ALL') {
                selectedNodeListArr = selectedNodeList;
            }
            
        } else {
            selectedNodeListArr = selectedNodeList;
        }

        selectedNodeListArr.forEach(item => {
            tmpArr.push(item);
        });

        this.setState({
            selectedValue: (maxLabel && tmpArr.length > maxLabel) ? tmpArr.slice(0, Number(maxLabel)) : tmpArr 
        })

        onChange && onChange(tmpArr, treeDataList);

    }

    showTree = e => {
        e.preventDefault();
        e.stopPropagation();

        if(this.props.disabled) {
            return false;
        }

        if(e.target.className === 'tree-select-menu') {
            return false;
        }

        this.setState({
            visible: !this.state.visible
        })
    }

    hideTree = e => {
        e.preventDefault();
        e.stopPropagation();

        this.setState({
            visible: false
        })
    }

    removeItem = (item, e) => {
        e.preventDefault();
        e.stopPropagation();

        const {onChange, treeabel: {objKey, dataKey}, maxLabel} = this.props;
        const {treeDataClone, selectedValue} = this.state;

        let filterArr = selectedValue;
        let parentCodeID = '';
        
        //如果选择删除的是父级节点，则其关联的所有孩子节点先删除
        if(('children' in item) && item.children.length > 0) {
            item.children.map((v, i) => {
                filterArr = filterArr.filter(vi => {console.log(v[objKey] !== vi[objKey]); return v[objKey] !== vi[objKey]});
            });
        }

        //如果选择删除的节点有父级节点，则把父级节点先删除
        if(item[dataKey] !== undefined) {
            filterArr = filterArr.filter(v => v[objKey] !== item[dataKey]);
        }
        
        //删除选择的节点
        filterArr = filterArr.filter(v => v[objKey] !== item[objKey]);

        treeDataClone.map(v => {                             
            if(v[objKey] === item[objKey]) {
                v['isSelected'] = false;
                parentCodeID = v[dataKey];
                if('children' in v && v.children.length) {
                    v.children.map(vi => {
                        vi['isSelected'] = false;
                    })
                }
            }
        });

        treeDataClone.map(v => {
            if(v[objKey] === parentCodeID) {
                v['isSelected'] = false;
                v['isPartSelected'] = true;
            }
        });

        

        this.setState({
            selectedValue: (maxLabel && filterArr.length > maxLabel) ? filterArr.slice(0, Number(maxLabel)) : filterArr,
            treeDataClone
        });

        onChange && onChange(filterArr, treeDataClone);
    }
    
    componentDidUpdate(prevProps) {
        if(!isEqual(prevProps.treeData, this.props.treeData) || !isEqual(prevProps.defaultValue, this.props.defaultValue)) {
            this.setState({
                treeDataClone: this.setTreeDataIsSelected(),
                selectedValue: this.loopDefaultInit(),
                updateTreeKey: Date.now()
            })
        }
    }

    render(){

        const {
            className, 
            treeData, 
            allowClear,
            disabled,
            onChange, 
            onSelect,
            showCheckedStrategy,
            placeholder = '请选择',
            multiple = false,
            defaultValue,
            maxLabel,
            treeabel: {
                expendable = true, 
                treeCheckable = false, 
                dataKey, 
                objKey,
                style
            }, 
            ...other
        } = this.props;

        // const treeDataClone = this.setTreeDataIsSelected(defaultValue || this.state.selectedValue);

        return (
            <div 
                className={classNames('tree-select', {
                    'tree-select-open': this.state.visible,
                    'tree-select-disabled': disabled,
                    'tree-select-multiple': multiple || treeCheckable
                }, className)}
                onClick={this.showTree}
                onBlur={this.hideTree}
                ref={this.treeSelect}
                tabIndex={disabled ? '-1' : '0'}
                {...other}
            >
                <div className="tree-select-input">
                    <div className="tree-select-input-inner">
                        {
                            placeholder && !defaultValue && !this.state.selectedValue.length ?
                                placeholder : 
                                <TransitionGroup component="ul">
                                    {
                                        this.state.selectedValue.map((item, index) => {
                                            return (
                                                <CSSTransition
                                                    key={item[objKey] || index}
                                                    timeout={200}
                                                    classNames="items"
                                                >
                                                    <li className="tree-select-selected-value" title={item.name}>
                                                        <span>{item.name}</span>
                                                        {
                                                            multiple ? <Icon type="close-2" onClick={e => this.removeItem(item, e)} /> : null
                                                        }
                                                    </li>
                                                </CSSTransition>
                                            )
                                        })
                                    }
                                </TransitionGroup>
                        }
                    </div>
                    {this.renderClearBtn()}
                </div>
                <Icon type="down-arrow" className="arrow" />
                <CSSTransition
                    in={this.state.visible}
                    timeout={200}
                    classNames="tree-select"
                    unmountOnExit
                >
                    <div 
                        className="tree-select-menu"
                        onClick={e => e.stopPropagation()}
                        style={style}
                    >
                        <Tree
                            key={this.state.updateTreeKey}
                            multiple={multiple}
                            treeData={this.state.treeDataClone}
                            iconclick={expendable}
                            canSelected={treeCheckable || multiple}
                            clickNodeGetInfo={this.clickNodeGetInfo}
                            selectedNode={this.handleSelectedNode}
                            dataKey={dataKey}
                            objKey={objKey}
                        />
                    </div>
                </CSSTransition>
            </div>
        );
    }
};