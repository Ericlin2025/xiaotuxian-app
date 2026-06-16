//导入观察视图是否进入视野内函数
import { useIntersectionObserver } from '@vueuse/core'

//定义懒加载插件


export const imgLazyPlugin={
    install(app){
         //自定义全局指令img-lazy:图片懒加载(视图内存在图片时才加载)
        app.directive('img-lazy',{
            //在组件挂载时执行
            mounted(el,binding){

                //el:绑定的那个元素:img
                //binding：binding.value 指令等于号后面绑定的表达式值：图片的url

                // console.log(el,binding.value)
                const {stop} = useIntersectionObserver(
                    el,
                    ([{isIntersecting}]) => {
                        //判断视图内是否有该指令指向的目标(如果有isintersecting为true,否为false)
                        console.log(isIntersecting)
                        if(isIntersecting){
                            //如果视图内存在目标，就把目标的src值赋为binding
                            el.src=binding.value
                            //useIntersectionObserver对于元素的监听一直存在的，除非手动停止监听，存在内存浪费
                            //设置如果图片已经加载了就用stop停止监听
                            stop()
                        }
                    },
        )
            }
        })
    }
}