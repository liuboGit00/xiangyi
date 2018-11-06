/**
 * 底层网络请求封装
 */

import Vue from 'vue';
import axios from 'axios';
import qs from 'qs';
import { Tool } from "./Tool.js";
import { baseUrl, cancleHTTP } from "../../axios/env.js";
import { Loading } from 'element-ui';


let loadingInstance = "";
export function GetMethod() {
	let getUrl = "",
		param = "",
		callback = "";
	if (arguments.length > 2) {
		getUrl = baseUrl + 'report-center/' + arguments[0];
		param = arguments[1];
		callback = arguments[2];
	} else {
		getUrl = baseUrl + 'report-center/' + arguments[0];
		if (arguments[1] && typeof (arguments[1]) == "function") {
			callback = arguments[1];
		} else {
			param = arguments[1];
		}
	}
	loadingInstance = Loading.service({ fullscreen: true, text: "拼命加载中", background: "rgba(0, 0, 0, 0.6)" });
	axios({
		url: getUrl,
		method: 'get',
		dataType: 'json',
		params: param,
		headers: {
			'Content-Type': 'text/json'
		}
	})
		.then(response => {
			loadingInstance.close();
			if (response.data.status == "SUCCESS") {
				callback(response)
			}
		}, err => {
			loadingInstance.close();
			// Tool.tip("网络异常，请检查网络");
		})
		.catch(err => {
			loadingInstance.close();
			// reject(error)
		});
	// }
}

export function PostMethod(url, params, callback) {
	let postUrl = baseUrl + 'report-center/' + url;
	loadingInstance = Loading.service({ fullscreen: true, text: "拼命加载中", background: "rgba(0, 0, 0, 0.6)" });
	axios({
		url: postUrl,
		method: 'post',
		data: params,
		dataType: 'json',
	})
		.then(response => {
			loadingInstance.close();
			if (response.data.status == "SUCCESS") {
				callback(response)
			}
			// if(!ishowload) {
			// 	Tool.close();
			// }
			// let data = response.data;
			// if (!data) {
			// 	Tool.tip("暂无数据");
			// 	return;
			// }
			// if(!data.status) {
			// 	if(data.code == 401) {
			// 		Tool.alert("登录失效", "", false, () => {
			// 			window.location.href = 'token.html';
			// 		});
			// 	} else {
			// 		Tool.tip(data.data);
			// 	}
			// 	return;
			// }
			// resolve(data);
		}, err => {
			loadingInstance.close();
			// if(err.config) {
			// 	Tool.tip("网络异常，请检查网络");
			// }
		})
		.catch(err => {
			loadingInstance.close();
			// reject(error)
		});
}
export function DeleteMethod() {
	let deleteUrl = "",
		param = "",
		callback = "";
	if (arguments.length > 2) {
		deleteUrl = baseUrl + 'report-center/' + arguments[0] + arguments[1];
		callback = arguments[2];
	}
	loadingInstance = Loading.service({ fullscreen: true, text: "拼命加载中", background: "rgba(0, 0, 0, 0.6)" });
	axios({
		url: deleteUrl,
		method: 'delete',
		dataType: 'json',
		params: param,
		headers: {
			'Content-Type': 'text/json'
		}
	})
		.then(response => {
			loadingInstance.close();
			if (response.data.status == "SUCCESS") {
				callback(response)
			}
		}, err => {
			loadingInstance.close();
			// Tool.tip("网络异常，请检查网络");
		})
		.catch(err => {
			loadingInstance.close();
			// reject(error)
		});
	// }

}
export function PutMethod() {
	let putUrl = "",
		param = "",
		callback = "";
	if (arguments.length > 2) {
		putUrl = baseUrl + 'report-center/' + arguments[0];
		param = arguments[1]
		callback = arguments[2];
	}
	loadingInstance = Loading.service({ fullscreen: true, text: "拼命加载中", background: "rgba(0, 0, 0, 0.6)" });
	axios({
		url: putUrl,
		method: 'put',
		dataType: 'json',
		data: param,
		// headers: {
		// 	'Content-Type': 'text/json'
		// }
	})
		.then(response => {
			loadingInstance.close();
			if (response.data.status == "SUCCESS") {
				callback(response)
			}
		}, err => {
			loadingInstance.close();
			// Tool.tip("网络异常，请检查网络");
		})
		.catch(err => {
			loadingInstance.close();
			// reject(error)
		});
	// }

}