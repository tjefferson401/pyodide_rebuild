var Module=typeof globalThis.__pyodide_module!=="undefined"?globalThis.__pyodide_module:{};if(!Module.expectedDataFileDownloads){Module.expectedDataFileDownloads=0}Module.expectedDataFileDownloads++;(function(){var loadPackage=function(metadata){var PACKAGE_PATH="";if(typeof window==="object"){PACKAGE_PATH=window["encodeURIComponent"](window.location.pathname.toString().substring(0,window.location.pathname.toString().lastIndexOf("/"))+"/")}else if(typeof process==="undefined"&&typeof location!=="undefined"){PACKAGE_PATH=encodeURIComponent(location.pathname.toString().substring(0,location.pathname.toString().lastIndexOf("/"))+"/")}var PACKAGE_NAME="regex.data";var REMOTE_PACKAGE_BASE="regex.data";if(typeof Module["locateFilePackage"]==="function"&&!Module["locateFile"]){Module["locateFile"]=Module["locateFilePackage"];err("warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)")}var REMOTE_PACKAGE_NAME=Module["locateFile"]?Module["locateFile"](REMOTE_PACKAGE_BASE,""):REMOTE_PACKAGE_BASE;var REMOTE_PACKAGE_SIZE=metadata["remote_package_size"];var PACKAGE_UUID=metadata["package_uuid"];function fetchRemotePackage(packageName,packageSize,callback,errback){if(typeof process==="object"){require("fs").readFile(packageName,(function(err,contents){if(err){errback(err)}else{callback(contents.buffer)}}));return}var xhr=new XMLHttpRequest;xhr.open("GET",packageName,true);xhr.responseType="arraybuffer";xhr.onprogress=function(event){var url=packageName;var size=packageSize;if(event.total)size=event.total;if(event.loaded){if(!xhr.addedTotal){xhr.addedTotal=true;if(!Module.dataFileDownloads)Module.dataFileDownloads={};Module.dataFileDownloads[url]={loaded:event.loaded,total:size}}else{Module.dataFileDownloads[url].loaded=event.loaded}var total=0;var loaded=0;var num=0;for(var download in Module.dataFileDownloads){var data=Module.dataFileDownloads[download];total+=data.total;loaded+=data.loaded;num++}total=Math.ceil(total*Module.expectedDataFileDownloads/num);if(Module["setStatus"])Module["setStatus"]("Downloading data... ("+loaded+"/"+total+")")}else if(!Module.dataFileDownloads){if(Module["setStatus"])Module["setStatus"]("Downloading data...")}};xhr.onerror=function(event){throw new Error("NetworkError for: "+packageName)};xhr.onload=function(event){if(xhr.status==200||xhr.status==304||xhr.status==206||xhr.status==0&&xhr.response){var packageData=xhr.response;callback(packageData)}else{throw new Error(xhr.statusText+" : "+xhr.responseURL)}};xhr.send(null)}function handleError(error){console.error("package error:",error)}var fetchedCallback=null;var fetched=Module["getPreloadedPackage"]?Module["getPreloadedPackage"](REMOTE_PACKAGE_NAME,REMOTE_PACKAGE_SIZE):null;if(!fetched)fetchRemotePackage(REMOTE_PACKAGE_NAME,REMOTE_PACKAGE_SIZE,(function(data){if(fetchedCallback){fetchedCallback(data);fetchedCallback=null}else{fetched=data}}),handleError);function runWithFS(){function assert(check,msg){if(!check)throw msg+(new Error).stack}Module["FS_createPath"]("/","lib",true,true);Module["FS_createPath"]("/lib","python3.9",true,true);Module["FS_createPath"]("/lib/python3.9","site-packages",true,true);Module["FS_createPath"]("/lib/python3.9/site-packages","regex",true,true);Module["FS_createPath"]("/lib/python3.9/site-packages","regex-2021.7.6-py3.9.egg-info",true,true);function processPackageData(arrayBuffer){assert(arrayBuffer,"Loading data file failed.");assert(arrayBuffer instanceof ArrayBuffer,"bad input to processPackageData");var byteArray=new Uint8Array(arrayBuffer);var curr;var compressedData={data:null,cachedOffset:395286,cachedIndexes:[-1,-1],cachedChunks:[null,null],offsets:[0,1299,2626,4065,5177,6392,7444,8444,9489,10549,11634,12720,13807,14881,15946,17019,18094,19176,20256,21482,22726,23874,25186,26725,28238,29247,30883,32465,34084,35374,36590,37871,39242,40495,41931,43275,44274,45304,46538,47785,48935,50550,51982,53375,54650,56051,57040,58337,59625,60685,62043,63429,64847,66253,67426,68501,69801,71061,72521,73782,75061,76052,77013,77922,78862,79979,81133,82410,83786,84830,85668,86927,88376,89717,90922,91791,93249,94732,95884,97185,98378,99686,100912,102317,103578,105062,106041,107584,109135,110352,111802,113070,114340,115708,117072,118701,120275,121678,122498,123423,124525,125944,127278,128621,130100,131746,133212,134644,136071,137053,138081,139055,139846,140987,142096,143161,144074,144960,145876,146521,147237,147861,148490,148840,149518,150374,150805,150978,151176,151350,151554,151746,151933,152110,152295,152482,152674,152862,153059,153448,154473,155104,155551,156262,156855,157268,157647,158290,159118,159656,160124,160470,161055,161867,162878,163585,164479,165311,166072,166919,167639,168465,169170,169808,170846,171606,172556,173662,174757,175651,176273,176967,177561,178153,178916,179548,180887,182112,182311,183128,183859,184544,184922,185422,185902,186381,187e3,187643,188111,188653,189062,189593,189798,190214,190528,191831,192669,193875,194638,195421,196417,197388,198243,198926,199855,200796,201593,202466,202791,203137,203597,203807,204895,206040,206431,206957,207975,209323,210537,211197,212084,212942,213511,214470,215233,216060,216750,216991,217700,217941,219036,219487,219832,220660,221391,222326,223154,223963,224525,225394,226044,226759,227462,228334,229201,229954,230674,231451,232203,232974,233798,234780,235514,236267,236938,237658,238135,238713,239512,240075,240550,241111,241628,242173,242751,243359,244149,244697,245269,245792,246348,246873,247387,248037,248734,249588,250363,251134,251836,252608,253336,254073,254668,255596,256199,257010,257751,258434,259166,259866,261021,261646,262519,263280,264103,264980,266040,266867,268915,270963,273011,274869,276902,278811,280748,282550,284110,285531,286915,288363,289561,290608,291262,292250,293344,294228,295265,296279,297254,298280,299080,300173,301244,302238,303222,304230,305371,306228,307272,308516,309556,310749,311889,313067,313999,314977,315991,317081,318140,319032,319986,321117,322209,323344,324276,325181,326060,327070,328133,329035,330027,331024,331964,332909,333970,335113,336186,337300,338250,339243,340326,341229,342096,342944,343957,344980,346143,346947,347579,348362,349471,350596,351835,353079,354407,355489,356534,357869,358908,360183,361518,362448,363228,364246,365434,366778,367987,369104,370448,371754,373018,374255,375552,376896,377943,379e3,380234,381182,381975,383077,384312,385417,386674,388020,389441,390429,391539,392819,394058],sizes:[1299,1327,1439,1112,1215,1052,1e3,1045,1060,1085,1086,1087,1074,1065,1073,1075,1082,1080,1226,1244,1148,1312,1539,1513,1009,1636,1582,1619,1290,1216,1281,1371,1253,1436,1344,999,1030,1234,1247,1150,1615,1432,1393,1275,1401,989,1297,1288,1060,1358,1386,1418,1406,1173,1075,1300,1260,1460,1261,1279,991,961,909,940,1117,1154,1277,1376,1044,838,1259,1449,1341,1205,869,1458,1483,1152,1301,1193,1308,1226,1405,1261,1484,979,1543,1551,1217,1450,1268,1270,1368,1364,1629,1574,1403,820,925,1102,1419,1334,1343,1479,1646,1466,1432,1427,982,1028,974,791,1141,1109,1065,913,886,916,645,716,624,629,350,678,856,431,173,198,174,204,192,187,177,185,187,192,188,197,389,1025,631,447,711,593,413,379,643,828,538,468,346,585,812,1011,707,894,832,761,847,720,826,705,638,1038,760,950,1106,1095,894,622,694,594,592,763,632,1339,1225,199,817,731,685,378,500,480,479,619,643,468,542,409,531,205,416,314,1303,838,1206,763,783,996,971,855,683,929,941,797,873,325,346,460,210,1088,1145,391,526,1018,1348,1214,660,887,858,569,959,763,827,690,241,709,241,1095,451,345,828,731,935,828,809,562,869,650,715,703,872,867,753,720,777,752,771,824,982,734,753,671,720,477,578,799,563,475,561,517,545,578,608,790,548,572,523,556,525,514,650,697,854,775,771,702,772,728,737,595,928,603,811,741,683,732,700,1155,625,873,761,823,877,1060,827,2048,2048,2048,1858,2033,1909,1937,1802,1560,1421,1384,1448,1198,1047,654,988,1094,884,1037,1014,975,1026,800,1093,1071,994,984,1008,1141,857,1044,1244,1040,1193,1140,1178,932,978,1014,1090,1059,892,954,1131,1092,1135,932,905,879,1010,1063,902,992,997,940,945,1061,1143,1073,1114,950,993,1083,903,867,848,1013,1023,1163,804,632,783,1109,1125,1239,1244,1328,1082,1045,1335,1039,1275,1335,930,780,1018,1188,1344,1209,1117,1344,1306,1264,1237,1297,1344,1047,1057,1234,948,793,1102,1235,1105,1257,1346,1421,988,1110,1280,1239,1228],successes:[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]};compressedData["data"]=byteArray;assert(typeof Module["LZ4"]==="object","LZ4 not present - was your app build with  -s LZ4=1  ?");Module["LZ4"].loadPackage({metadata:metadata,compressedData:compressedData},true);Module["removeRunDependency"]("datafile_regex.data")}Module["addRunDependency"]("datafile_regex.data");if(!Module.preloadResults)Module.preloadResults={};Module.preloadResults[PACKAGE_NAME]={fromCache:false};if(fetched){processPackageData(fetched);fetched=null}else{fetchedCallback=processPackageData}}if(Module["calledRun"]){runWithFS()}else{if(!Module["preRun"])Module["preRun"]=[];Module["preRun"].push(runWithFS)}};loadPackage({files:[{filename:"/lib/python3.9/site-packages/regex/__init__.py",start:0,end:65},{filename:"/lib/python3.9/site-packages/regex/_regex.so",start:65,end:624897},{filename:"/lib/python3.9/site-packages/regex/_regex_core.py",start:624897,end:765115},{filename:"/lib/python3.9/site-packages/regex/regex.py",start:765115,end:797658},{filename:"/lib/python3.9/site-packages/regex-2021.7.6-py3.9.egg-info/PKG-INFO",start:797658,end:836915},{filename:"/lib/python3.9/site-packages/regex-2021.7.6-py3.9.egg-info/SOURCES.txt",start:836915,end:837509},{filename:"/lib/python3.9/site-packages/regex-2021.7.6-py3.9.egg-info/dependency_links.txt",start:837509,end:837510},{filename:"/lib/python3.9/site-packages/regex-2021.7.6-py3.9.egg-info/top_level.txt",start:837510,end:837516}],remote_package_size:399382,package_uuid:"0e0e37eb-9a7f-4c37-a97a-3f548f9257fe"})})();