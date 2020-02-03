const removeClass = (className, ...arg) => {
    const classNameArr = className.split(' ');

    arg.map((n) => {
        if (classNameArr.indexOf(n) >= 0) {
            classNameArr.splice(classNameArr.indexOf(n), 1);
        }
        return false;
    });

    return classNameArr;
};

const ElementUtils = {
    addClassName(ele, className) {
        const classNameArr = ele.className.split(' ');
        const eles = ele;
        let classIndex = '';

        if (classNameArr.indexOf(className) > -1) {
            (classIndex = classNameArr.indexOf(className));
            classNameArr.splice(classIndex, 1);
            classNameArr.push(className);
        } else {
            classNameArr.push(className);
        }

        eles.className = classNameArr.join(' ');
        return this;
    },

    removeClassName(ele, className) {
        const eles = ele;
        eles.className = removeClass(ele.className, className).join(' ');
        return this;
    },

    remove(ele) {
        ele.remove();
        return this;
    },

    hide(ele) {
        const eles = ele;
        eles.style.display = 'none';
        return this;
    }
};

const throttle = (fn, ms) => {
    let timeout = 0;

    function exec() {
        fn.apply();
    }

    function clear() {
        clearTimeout(timeout);
    }

    if (fn !== undefined && ms !== undefined) {
        timeout = setTimeout(exec, ms);
    } else {
        throw (new Error('回调函数和时间必填'));
    }

    throttle.clearTimeout = () => {
        clear();
    };
};

export {
    ElementUtils,
    removeClass,
    throttle
};
