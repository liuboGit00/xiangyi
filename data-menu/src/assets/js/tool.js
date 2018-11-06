/**
 * 在此封装各种工具类的方法
 */
import Vue from 'vue';
import { Loading } from 'element-ui';
import store from '@/store/index'
/*
 * 公共变量
 * */
let loadingInstance="";
export let Tool = {
	/*
	 * 提示信息，有确定按钮，参数可配置
	 * message：提示信息
	 * title：提示标题。可不填
	 * showCancelButton：默认false，布尔值
	 * scuessfun：确定按钮的回调
	 * cancelfun：取消按钮的回调
	 * */

    alert: function (message, title, showCancelButton, scuessfun, cancelfun) {
        // MessageBox({
        //     title: title || "",
        //     message: message,
        //     showCancelButton: showCancelButton,
        //     closeOnClickModal: false
        // }).then(action => {
        //     if (action === "confirm") {
        //         if (scuessfun) {
        //             scuessfun();
        //         }
        //     } else {
        //         if (cancelfun) {
        //             cancelfun();
        //         }
        //     }
        // });
    },
	/*
	 * 自定义弹出框内容
	 */
    prompt: function (option, scuessfun, cancelfun) {
        MessageBox(option).then(action => {
            if (action === "confirm") {
                if (scuessfun) {
                    scuessfun();
                }
            } else {
                if (cancelfun) {
                    cancelfun();
                }
            }
        });
    },
	/*
    loading遮罩层
	 * */
    loading: function (texts, spinnerType) {    //加载loading
        loadingInstance = Loading.service({ fullscreen: true, text: "拼命加载中", background:"rgba(0, 0, 0, 0.6)" });
        store.dispatch("setApparatus", loadingInstance);
    },

    close: function () {        //取消loading
        store.state.apparatus.close();
    },

}