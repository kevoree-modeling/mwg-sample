var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var org;
(function (org) {
    var mwg;
    (function (mwg) {
        var ml;
        (function (ml) {
            var common;
            (function (common) {
                var matrix;
                (function (matrix) {
                    var blassolver;
                    (function (blassolver) {
                        var blas;
                        (function (blas) {
                            var JSBlas = (function () {
                                function JSBlas() {
                                    this.netlib = Module;
                                    this.c_dgemm = this.netlib.cwrap('f2c_dgemm', null, ['number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number']);
                                    this.c_dgetrs = this.netlib.cwrap('dgetrs_', null, ['number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number']);
                                    this.c_dgetri = this.netlib.cwrap('dgetri_', null, ['number', 'number', 'number', 'number', 'number', 'number', 'number']);
                                    this.c_dorgqr = this.netlib.cwrap('dorgqr_', null, ['number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number']);
                                    this.c_dgesdd = this.netlib.cwrap('dgesdd_', null, ['number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number']);
                                    this.c_dgeqrf = this.netlib.cwrap('dgeqrf_', null, ['number', 'number', 'number', 'number', 'number', 'number', 'number', 'number']);
                                    this.c_dgetrf = this.netlib.cwrap('dgetrf_', null, ['number', 'number', 'number', 'number', 'number', 'number']);
                                }
                                JSBlas.prototype.dgemm = function (transA, transB, m, n, k, alpha, matA, offsetA, ldA, matB, offsetB, ldB, beta, matC, offsetC, ldC) {
                                    var ptransA = this.netlib._malloc(1), ptransB = this.netlib._malloc(1), pm = this.netlib._malloc(4), pn = this.netlib._malloc(4), pk = this.netlib._malloc(4), palpha = this.netlib._malloc(8), pmatA = this.netlib._malloc(8 * matA.length), pldA = this.netlib._malloc(4), pmatB = this.netlib._malloc(8 * matB.length), pldB = this.netlib._malloc(4), pbeta = this.netlib._malloc(8), pmatC = this.netlib._malloc(8 * matC.length), pldC = this.netlib._malloc(4);
                                    this.netlib.setValue(ptransA, org.mwg.ml.common.matrix.blassolver.blas.BlasHelper.transTypeToChar(transA).charCodeAt(0), 'i8');
                                    this.netlib.setValue(ptransB, org.mwg.ml.common.matrix.blassolver.blas.BlasHelper.transTypeToChar(transB).charCodeAt(0), 'i8');
                                    this.netlib.setValue(pm, m, 'i32');
                                    this.netlib.setValue(pn, n, 'i32');
                                    this.netlib.setValue(pk, k, 'i32');
                                    this.netlib.setValue(palpha, alpha, 'double');
                                    var ddpmatA = new Float64Array(this.netlib.HEAPF64.buffer, pmatA, matA.length);
                                    ddpmatA.set(matA);
                                    this.netlib.setValue(pldA, ldA, 'i32');
                                    var ddpmatB = new Float64Array(this.netlib.HEAPF64.buffer, pmatB, matB.length);
                                    ddpmatB.set(matB);
                                    this.netlib.setValue(pldB, ldB, 'i32');
                                    this.netlib.setValue(pbeta, beta, 'double');
                                    var ddpmatC = new Float64Array(this.netlib.HEAPF64.buffer, pmatC, matC.length);
                                    ddpmatC.set(matC);
                                    this.netlib.setValue(pldC, ldC, 'i32');
                                    this.c_dgemm(ptransA, ptransB, pm, pn, pk, palpha, pmatA, pldA, pmatB, pldB, pbeta, pmatC, pldC);
                                    // matA.set(ddpmatA);
                                    // matB.set(ddpmatB);
                                    matC.set(ddpmatC);
                                    this.netlib._free(ptransA);
                                    this.netlib._free(ptransB);
                                    this.netlib._free(pm);
                                    this.netlib._free(pn);
                                    this.netlib._free(pk);
                                    this.netlib._free(palpha);
                                    this.netlib._free(pmatA);
                                    this.netlib._free(pldA);
                                    this.netlib._free(pmatB);
                                    this.netlib._free(pldB);
                                    this.netlib._free(pbeta);
                                    this.netlib._free(pmatC);
                                    this.netlib._free(pldC);
                                };
                                JSBlas.prototype.dgetrs = function (transA, dim, nrhs, matA, offsetA, ldA, ipiv, offsetIpiv, matB, offsetB, ldB, info) {
                                    var ptransA = this.netlib._malloc(1), pdim = this.netlib._malloc(4), pnrhs = this.netlib._malloc(4), pmatA = this.netlib._malloc(8 * matA.length), pldA = this.netlib._malloc(4), pipiv = this.netlib._malloc(4 * ipiv.length), pmatB = this.netlib._malloc(8 * matB.length), pldB = this.netlib._malloc(4), pinfo = this.netlib._malloc(4 * info.length);
                                    this.netlib.setValue(ptransA, org.mwg.ml.common.matrix.blassolver.blas.BlasHelper.transTypeToChar(transA).charCodeAt(0), 'i8');
                                    this.netlib.setValue(pdim, dim, 'i32');
                                    this.netlib.setValue(pnrhs, nrhs, 'i32');
                                    var ddpmatA = new Float64Array(this.netlib.HEAPF64.buffer, pmatA, matA.length);
                                    ddpmatA.set(matA);
                                    this.netlib.setValue(pldA, ldA, 'i32');
                                    var iipipiv = new Int32Array(this.netlib.HEAP32.buffer, pipiv, ipiv.length);
                                    iipipiv.set(ipiv);
                                    var ddpmatB = new Float64Array(this.netlib.HEAPF64.buffer, pmatB, matB.length);
                                    ddpmatB.set(matB);
                                    this.netlib.setValue(pldB, ldB, 'i32');
                                    var iipinfo = new Int32Array(this.netlib.HEAP32.buffer, pinfo, info.length);
                                    iipinfo.set(info);
                                    this.c_dgetrs(ptransA, pdim, pnrhs, pmatA, pldA, pipiv, pmatB, pldB, pinfo);
                                    //  matA.set(ddpmatA);
                                    // ipiv.set(iipipiv);
                                    matB.set(ddpmatB);
                                    info.set(iipinfo);
                                    this.netlib._free(ptransA);
                                    this.netlib._free(pdim);
                                    this.netlib._free(pnrhs);
                                    this.netlib._free(pmatA);
                                    this.netlib._free(pldA);
                                    this.netlib._free(pipiv);
                                    this.netlib._free(pmatB);
                                    this.netlib._free(pldB);
                                    this.netlib._free(pinfo);
                                };
                                JSBlas.prototype.dgetri = function (dim, matA, offsetA, ldA, ipiv, offsetIpiv, work, offsetWork, ldWork, info) {
                                    var pdim = this.netlib._malloc(4), pmatA = this.netlib._malloc(8 * matA.length), pldA = this.netlib._malloc(4), pipiv = this.netlib._malloc(4 * ipiv.length), pwork = this.netlib._malloc(8 * work.length), pldWork = this.netlib._malloc(4), pinfo = this.netlib._malloc(4 * info.length);
                                    this.netlib.setValue(pdim, dim, 'i32');
                                    var ddpmatA = new Float64Array(this.netlib.HEAPF64.buffer, pmatA, matA.length);
                                    ddpmatA.set(matA);
                                    this.netlib.setValue(pldA, ldA, 'i32');
                                    var iipipiv = new Int32Array(this.netlib.HEAP32.buffer, pipiv, ipiv.length);
                                    iipipiv.set(ipiv);
                                    var ddpwork = new Float64Array(this.netlib.HEAPF64.buffer, pwork, work.length);
                                    ddpwork.set(work);
                                    this.netlib.setValue(pldWork, ldWork, 'i32');
                                    var iipinfo = new Int32Array(this.netlib.HEAP32.buffer, pinfo, info.length);
                                    iipinfo.set(info);
                                    this.c_dgetri(pdim, pmatA, pldA, pipiv, pwork, pldWork, pinfo);
                                    matA.set(ddpmatA);
                                    //ipiv.set(iipipiv);
                                    work.set(ddpwork);
                                    info.set(iipinfo);
                                    this.netlib._free(pdim);
                                    this.netlib._free(pmatA);
                                    this.netlib._free(pldA);
                                    this.netlib._free(pipiv);
                                    this.netlib._free(pwork);
                                    this.netlib._free(pldWork);
                                    this.netlib._free(pinfo);
                                };
                                JSBlas.prototype.dgetrf = function (rows, columns, matA, offsetA, ldA, ipiv, offsetIpiv, info) {
                                    var prows = this.netlib._malloc(4), pcolumns = this.netlib._malloc(4), pmatA = this.netlib._malloc(8 * matA.length), pldA = this.netlib._malloc(4), pipiv = this.netlib._malloc(4 * ipiv.length), pinfo = this.netlib._malloc(4 * info.length);
                                    this.netlib.setValue(prows, rows, 'i32');
                                    this.netlib.setValue(pcolumns, columns, 'i32');
                                    var ddpmatA = new Float64Array(this.netlib.HEAPF64.buffer, pmatA, matA.length);
                                    ddpmatA.set(matA);
                                    this.netlib.setValue(pldA, ldA, 'i32');
                                    var iipipiv = new Int32Array(this.netlib.HEAP32.buffer, pipiv, ipiv.length);
                                    iipipiv.set(ipiv);
                                    var iipinfo = new Int32Array(this.netlib.HEAP32.buffer, pinfo, info.length);
                                    iipinfo.set(info);
                                    this.c_dgetrf(prows, pcolumns, pmatA, pldA, pipiv, pinfo);
                                    matA.set(ddpmatA);
                                    ipiv.set(iipipiv);
                                    info.set(iipinfo);
                                    this.netlib._free(prows);
                                    this.netlib._free(pcolumns);
                                    this.netlib._free(pmatA);
                                    this.netlib._free(pldA);
                                    this.netlib._free(pipiv);
                                    this.netlib._free(pinfo);
                                };
                                JSBlas.prototype.dorgqr = function (m, n, k, matA, offsetA, ldA, taw, offsetTaw, work, offsetWork, lWork, info) {
                                    var pm = this.netlib._malloc(4), pn = this.netlib._malloc(4), pk = this.netlib._malloc(4), pmatA = this.netlib._malloc(8 * matA.length), pldA = this.netlib._malloc(4), ptaw = this.netlib._malloc(8 * taw.length), pwork = this.netlib._malloc(8 * work.length), plWork = this.netlib._malloc(4), pinfo = this.netlib._malloc(4 * info.length);
                                    this.netlib.setValue(pm, m, 'i32');
                                    this.netlib.setValue(pn, n, 'i32');
                                    this.netlib.setValue(pk, k, 'i32');
                                    var ddpmatA = new Float64Array(this.netlib.HEAPF64.buffer, pmatA, matA.length);
                                    ddpmatA.set(matA);
                                    this.netlib.setValue(pldA, ldA, 'i32');
                                    var ddptaw = new Float64Array(this.netlib.HEAPF64.buffer, ptaw, taw.length);
                                    ddptaw.set(taw);
                                    var ddpwork = new Float64Array(this.netlib.HEAPF64.buffer, pwork, work.length);
                                    ddpwork.set(work);
                                    this.netlib.setValue(plWork, lWork, 'i32');
                                    var iipinfo = new Int32Array(this.netlib.HEAP32.buffer, pinfo, info.length);
                                    iipinfo.set(info);
                                    this.c_dorgqr(pm, pn, pk, pmatA, pldA, ptaw, pwork, plWork, pinfo);
                                    matA.set(ddpmatA);
                                    //taw.set(ddptaw);
                                    work.set(ddpwork);
                                    info.set(iipinfo);
                                    this.netlib._free(pm);
                                    this.netlib._free(pn);
                                    this.netlib._free(pk);
                                    this.netlib._free(pmatA);
                                    this.netlib._free(pldA);
                                    this.netlib._free(ptaw);
                                    this.netlib._free(pwork);
                                    this.netlib._free(plWork);
                                    this.netlib._free(pinfo);
                                };
                                JSBlas.prototype.dgeqrf = function (m, n, matA, offsetA, ldA, taw, offsetTaw, work, offsetwork, lWork, info) {
                                    var pm = this.netlib._malloc(4), pn = this.netlib._malloc(4), pmatA = this.netlib._malloc(8 * matA.length), pldA = this.netlib._malloc(4), ptaw = this.netlib._malloc(8 * taw.length), pwork = this.netlib._malloc(8 * work.length), plWork = this.netlib._malloc(4), pinfo = this.netlib._malloc(4 * info.length);
                                    this.netlib.setValue(pm, m, 'i32');
                                    this.netlib.setValue(pn, n, 'i32');
                                    var ddpmatA = new Float64Array(this.netlib.HEAPF64.buffer, pmatA, matA.length);
                                    ddpmatA.set(matA);
                                    this.netlib.setValue(pldA, ldA, 'i32');
                                    var ddptaw = new Float64Array(this.netlib.HEAPF64.buffer, ptaw, taw.length);
                                    ddptaw.set(taw);
                                    var ddpwork = new Float64Array(this.netlib.HEAPF64.buffer, pwork, work.length);
                                    ddpwork.set(work);
                                    this.netlib.setValue(plWork, lWork, 'i32');
                                    var iipinfo = new Int32Array(this.netlib.HEAP32.buffer, pinfo, info.length);
                                    iipinfo.set(info);
                                    this.c_dgeqrf(pm, pn, pmatA, pldA, ptaw, pwork, plWork, pinfo);
                                    matA.set(ddpmatA);
                                    taw.set(ddptaw);
                                    work.set(ddpwork);
                                    info.set(iipinfo);
                                    this.netlib._free(pm);
                                    this.netlib._free(pn);
                                    this.netlib._free(pmatA);
                                    this.netlib._free(pldA);
                                    this.netlib._free(ptaw);
                                    this.netlib._free(pwork);
                                    this.netlib._free(plWork);
                                    this.netlib._free(pinfo);
                                };
                                JSBlas.prototype.dgesdd = function (jobz, m, n, data, lda, s, u, ldu, vt, ldvt, work, length, iwork, info) {
                                    var pjobz = this.netlib._malloc(1), pm = this.netlib._malloc(4), pn = this.netlib._malloc(4), pdata = this.netlib._malloc(8 * data.length), plda = this.netlib._malloc(4), ps = this.netlib._malloc(8 * s.length), pu = this.netlib._malloc(8 * u.length), pldu = this.netlib._malloc(4), pvt = this.netlib._malloc(8 * vt.length), pldvt = this.netlib._malloc(4), pwork = this.netlib._malloc(8 * work.length), plength = this.netlib._malloc(4), piwork = this.netlib._malloc(4 * iwork.length), pinfo = this.netlib._malloc(4 * info.length);
                                    this.netlib.setValue(pjobz, jobz.charCodeAt(0), 'i8');
                                    this.netlib.setValue(pm, m, 'i32');
                                    this.netlib.setValue(pn, n, 'i32');
                                    var ddpdata = new Float64Array(this.netlib.HEAPF64.buffer, pdata, data.length);
                                    ddpdata.set(data);
                                    this.netlib.setValue(plda, lda, 'i32');
                                    var ddps = new Float64Array(this.netlib.HEAPF64.buffer, ps, s.length);
                                    ddps.set(s);
                                    var ddpu = new Float64Array(this.netlib.HEAPF64.buffer, pu, u.length);
                                    ddpu.set(u);
                                    this.netlib.setValue(pldu, ldu, 'i32');
                                    var ddpvt = new Float64Array(this.netlib.HEAPF64.buffer, pvt, vt.length);
                                    ddpvt.set(vt);
                                    this.netlib.setValue(pldvt, ldvt, 'i32');
                                    var ddpwork = new Float64Array(this.netlib.HEAPF64.buffer, pwork, work.length);
                                    ddpwork.set(work);
                                    this.netlib.setValue(plength, length, 'i32');
                                    var iipiwork = new Int32Array(this.netlib.HEAP32.buffer, piwork, iwork.length);
                                    iipiwork.set(iwork);
                                    var iipinfo = new Int32Array(this.netlib.HEAP32.buffer, pinfo, info.length);
                                    iipinfo.set(info);
                                    this.c_dgesdd(pjobz, pm, pn, pdata, plda, ps, pu, pldu, pvt, pldvt, pwork, plength, piwork, pinfo);
                                    data.set(ddpdata);
                                    s.set(ddps);
                                    u.set(ddpu);
                                    vt.set(ddpvt);
                                    work.set(ddpwork);
                                    iwork.set(iipiwork);
                                    info.set(iipinfo);
                                    this.netlib._free(pjobz);
                                    this.netlib._free(pm);
                                    this.netlib._free(pn);
                                    this.netlib._free(pdata);
                                    this.netlib._free(plda);
                                    this.netlib._free(ps);
                                    this.netlib._free(pu);
                                    this.netlib._free(pldu);
                                    this.netlib._free(pvt);
                                    this.netlib._free(pldvt);
                                    this.netlib._free(pwork);
                                    this.netlib._free(plength);
                                    this.netlib._free(piwork);
                                    this.netlib._free(pinfo);
                                };
                                JSBlas.prototype.connect = function () {
                                };
                                JSBlas.prototype.disconnect = function () {
                                };
                                return JSBlas;
                            }());
                            blas.JSBlas = JSBlas;
                        })(blas = blassolver.blas || (blassolver.blas = {}));
                    })(blassolver = matrix.blassolver || (matrix.blassolver = {}));
                })(matrix = common.matrix || (common.matrix = {}));
            })(common = ml.common || (ml.common = {}));
        })(ml = mwg.ml || (mwg.ml = {}));
    })(mwg = org.mwg || (org.mwg = {}));
})(org || (org = {}));
/// <reference path="mwg.d.ts" />
/// <reference path="mwg.structure.d.ts" />
/// <reference path="mwg.blas.ts" />
var org;
(function (org) {
    var mwg;
    (function (mwg) {
        var ml;
        (function (ml) {
            var AbstractMLNode = (function (_super) {
                __extends(AbstractMLNode, _super);
                function AbstractMLNode(p_world, p_time, p_id, p_graph) {
                    _super.call(this, p_world, p_time, p_id, p_graph);
                }
                AbstractMLNode.requireNotNull = function (obj, message) {
                    if (obj == null) {
                        throw new Error(message);
                    }
                };
                AbstractMLNode.prototype.illegalArgumentIfFalse = function (condition, errorMessage) {
                    if (!condition) {
                        throw new Error(errorMessage);
                    }
                };
                AbstractMLNode.prototype.extractFeatures = function (callback) {
                    var query = _super.prototype.get.call(this, AbstractMLNode.FROM);
                    if (query != null) {
                        var split = query.split(AbstractMLNode.FROM_SEPARATOR);
                        var tasks = new Array(split.length);
                        for (var i = 0; i < split.length; i++) {
                            var t = org.mwg.task.Actions.setWorld("" + this.world());
                            t.setTime(this.time() + "");
                            t.parse(split[i].trim());
                            tasks[i] = t;
                        }
                        var result_1 = new Float64Array(tasks.length);
                        var waiter_1 = this.graph().newCounter(tasks.length);
                        var _loop_1 = function(i) {
                            var taskIndex = i;
                            var initial = org.mwg.task.Actions.newTask().emptyResult();
                            initial.add(this_1);
                            tasks[i].executeWith(this_1.graph(), initial, function (currentResult) {
                                {
                                    if (currentResult == null) {
                                        result_1[taskIndex] = org.mwg.Constants.NULL_LONG;
                                    }
                                    else {
                                        result_1[taskIndex] = parseFloat(currentResult.get(0).toString());
                                        currentResult.free();
                                    }
                                    waiter_1.count();
                                }
                            });
                        };
                        var this_1 = this;
                        for (var i = 0; i < split.length; i++) {
                            _loop_1(i);
                        }
                        waiter_1.then(function () {
                            {
                                callback(result_1);
                            }
                        });
                    }
                    else {
                        callback(null);
                    }
                };
                AbstractMLNode.FROM_SEPARATOR = ";";
                AbstractMLNode.FROM = "from";
                return AbstractMLNode;
            }(org.mwg.plugin.AbstractNode));
            ml.AbstractMLNode = AbstractMLNode;
            var MLPlugin = (function (_super) {
                __extends(MLPlugin, _super);
                function MLPlugin() {
                    _super.call(this);
                    this.declareNodeType(org.mwg.ml.algorithm.regression.PolynomialNode.NAME, function (world, time, id, graph) {
                        {
                            return new org.mwg.ml.algorithm.regression.PolynomialNode(world, time, id, graph);
                        }
                    });
                    this.declareNodeType(org.mwg.ml.algorithm.profiling.GaussianSlotNode.NAME, function (world, time, id, graph) {
                        {
                            return new org.mwg.ml.algorithm.profiling.GaussianSlotNode(world, time, id, graph);
                        }
                    });
                    this.declareNodeType(org.mwg.ml.algorithm.profiling.GaussianMixtureNode.NAME, function (world, time, id, graph) {
                        {
                            return new org.mwg.ml.algorithm.profiling.GaussianMixtureNode(world, time, id, graph);
                        }
                    });
                    this.declareNodeType(org.mwg.ml.algorithm.regression.LiveLinearRegressionNode.NAME, function (world, time, id, graph) {
                        {
                            return new org.mwg.ml.algorithm.regression.LiveLinearRegressionNode(world, time, id, graph);
                        }
                    });
                    this.declareNodeType(org.mwg.ml.algorithm.anomalydetector.InterquartileRangeOutlierDetectorNode.NAME, function (world, time, id, graph) {
                        {
                            return new org.mwg.ml.algorithm.anomalydetector.InterquartileRangeOutlierDetectorNode(world, time, id, graph);
                        }
                    });
                    this.declareNodeType(org.mwg.ml.algorithm.profiling.GaussianTreeNode.NAME, function (world, time, id, graph) {
                        {
                            return new org.mwg.ml.algorithm.profiling.GaussianTreeNode(world, time, id, graph);
                        }
                    });
                    this.declareNodeType(org.mwg.ml.algorithm.profiling.GaussianNode.NAME, function (world, time, id, graph) {
                        {
                            return new org.mwg.ml.algorithm.profiling.GaussianNode(world, time, id, graph);
                        }
                    });
                }
                return MLPlugin;
            }(org.mwg.structure.StructurePlugin));
            ml.MLPlugin = MLPlugin;
            var algorithm;
            (function (algorithm) {
                var anomalydetector;
                (function (anomalydetector) {
                    var InterquartileRangeOutlierDetectorNode = (function (_super) {
                        __extends(InterquartileRangeOutlierDetectorNode, _super);
                        function InterquartileRangeOutlierDetectorNode(p_world, p_time, p_id, p_graph) {
                            _super.call(this, p_world, p_time, p_id, p_graph);
                        }
                        InterquartileRangeOutlierDetectorNode.prototype.addValue = function (value) {
                            this.illegalArgumentIfFalse(value != null, "Value must be not null");
                            var state = this.unphasedState();
                            var dimensions = state.getFromKeyWithDefault(InterquartileRangeOutlierDetectorNode.INPUT_DIM_KEY, InterquartileRangeOutlierDetectorNode.INPUT_DIM_DEF);
                            if (dimensions < 0) {
                                dimensions = value.length;
                                state.setFromKey(InterquartileRangeOutlierDetectorNode.INPUT_DIM_KEY, org.mwg.Type.INT, value.length);
                            }
                            var buffer = state.getFromKeyWithDefault(InterquartileRangeOutlierDetectorNode.INTERNAL_VALUE_BUFFER_KEY, new Float64Array(0));
                            var bufferLength = buffer.length / dimensions;
                            var maxBufferLength = state.getFromKeyWithDefault(InterquartileRangeOutlierDetectorNode.BUFFER_SIZE_KEY, InterquartileRangeOutlierDetectorNode.BUFFER_SIZE_DEF);
                            var numValuesToRemoveFromBeginning = Math.max(0, bufferLength + 1 - maxBufferLength);
                            var newBufferLength = bufferLength + 1 - numValuesToRemoveFromBeginning;
                            var newBuffer = new Float64Array(newBufferLength * dimensions);
                            java.lang.System.arraycopy(buffer, numValuesToRemoveFromBeginning * dimensions, newBuffer, 0, newBuffer.length - dimensions);
                            java.lang.System.arraycopy(value, 0, newBuffer, newBuffer.length - dimensions, dimensions);
                            var upperBounds = new Float64Array(dimensions);
                            var lowerBounds = new Float64Array(dimensions);
                            for (var i = 0; i < dimensions; i++) {
                                var column = new Float64Array(newBufferLength);
                                var index = i;
                                for (var j = 0; j < newBufferLength; j++) {
                                    column[j] = newBuffer[index];
                                    index += dimensions;
                                }
                                column.sort();
                                var upperPercentile = column[Math.min(Math.round(newBufferLength * InterquartileRangeOutlierDetectorNode.UPPER_PERCENTILE), newBufferLength - 1)];
                                var lowerPercentile = column[Math.max(Math.round(newBufferLength * InterquartileRangeOutlierDetectorNode.LOWER_PERCENTILE), 0)];
                                var interquartileRange = upperPercentile - lowerPercentile;
                                upperBounds[i] = upperPercentile + InterquartileRangeOutlierDetectorNode.RANGE_COEF * interquartileRange;
                                lowerBounds[i] = lowerPercentile - InterquartileRangeOutlierDetectorNode.RANGE_COEF * interquartileRange;
                                state.setFromKey(InterquartileRangeOutlierDetectorNode.UPPER_BOUND_KEY_PREFIX + i, org.mwg.Type.DOUBLE, upperBounds[i]);
                                state.setFromKey(InterquartileRangeOutlierDetectorNode.LOWER_BOUND_KEY_PREFIX + i, org.mwg.Type.DOUBLE, lowerBounds[i]);
                            }
                            state.setFromKey(InterquartileRangeOutlierDetectorNode.INTERNAL_VALUE_BUFFER_KEY, org.mwg.Type.DOUBLE_ARRAY, newBuffer);
                            return this.checkValue(value, upperBounds, lowerBounds);
                        };
                        InterquartileRangeOutlierDetectorNode.prototype.checkValue = function (value, lowerBounds, upperBounds) {
                            for (var i = 0; i < value.length; i++) {
                                if (!((value[i] <= upperBounds[i]) && (value[i] >= lowerBounds[i]))) {
                                    return true;
                                }
                            }
                            return false;
                        };
                        InterquartileRangeOutlierDetectorNode.prototype.learn = function (callback) {
                            var _this = this;
                            this.extractFeatures(function (result) {
                                {
                                    var outcome = _this.addValue(result);
                                    callback(outcome);
                                }
                            });
                        };
                        InterquartileRangeOutlierDetectorNode.prototype.classify = function (callback) {
                            var _this = this;
                            this.extractFeatures(function (result) {
                                {
                                    var lowerBounds = new Float64Array(result.length);
                                    var upperBounds = new Float64Array(result.length);
                                    var state = _this.unphasedState();
                                    for (var i = 0; i < result.length; i++) {
                                        lowerBounds[i] = state.getFromKey(org.mwg.ml.algorithm.anomalydetector.InterquartileRangeOutlierDetectorNode.LOWER_BOUND_KEY_PREFIX + i);
                                        upperBounds[i] = state.getFromKey(org.mwg.ml.algorithm.anomalydetector.InterquartileRangeOutlierDetectorNode.UPPER_BOUND_KEY_PREFIX + i);
                                    }
                                    var isAnomaly = _this.checkValue(result, lowerBounds, upperBounds);
                                    callback(isAnomaly);
                                }
                            });
                        };
                        InterquartileRangeOutlierDetectorNode.prototype.setProperty = function (propertyName, propertyType, propertyValue) {
                            if (InterquartileRangeOutlierDetectorNode.INTERNAL_VALUE_BUFFER_KEY === propertyName || InterquartileRangeOutlierDetectorNode.INPUT_DIM_KEY === propertyName) {
                            }
                            else {
                                InterquartileRangeOutlierDetectorNode.enforcer.check(propertyName, propertyType, propertyValue);
                                _super.prototype.setProperty.call(this, propertyName, propertyType, propertyValue);
                            }
                        };
                        InterquartileRangeOutlierDetectorNode.MAX_BUFFER_LIMIT = 100000;
                        InterquartileRangeOutlierDetectorNode.NAME = "InterquartileRangeAnomalyDetection";
                        InterquartileRangeOutlierDetectorNode.INTERNAL_VALUE_BUFFER_KEY = "_valueBuffer";
                        InterquartileRangeOutlierDetectorNode.BUFFER_SIZE_KEY = "BufferSize";
                        InterquartileRangeOutlierDetectorNode.BUFFER_SIZE_DEF = 50;
                        InterquartileRangeOutlierDetectorNode.INPUT_DIM_KEY = "InputDimensions";
                        InterquartileRangeOutlierDetectorNode.INPUT_DIM_DEF = -1;
                        InterquartileRangeOutlierDetectorNode.UPPER_PERCENTILE = 0.75;
                        InterquartileRangeOutlierDetectorNode.LOWER_PERCENTILE = 0.25;
                        InterquartileRangeOutlierDetectorNode.RANGE_COEF = 1.5;
                        InterquartileRangeOutlierDetectorNode.UPPER_BOUND_KEY_PREFIX = "UpperBoundDimension";
                        InterquartileRangeOutlierDetectorNode.LOWER_BOUND_KEY_PREFIX = "LowerBoundDimension";
                        InterquartileRangeOutlierDetectorNode.enforcer = new org.mwg.utility.Enforcer().asIntWithin(InterquartileRangeOutlierDetectorNode.BUFFER_SIZE_KEY, 1, InterquartileRangeOutlierDetectorNode.MAX_BUFFER_LIMIT);
                        return InterquartileRangeOutlierDetectorNode;
                    }(org.mwg.ml.AbstractMLNode));
                    anomalydetector.InterquartileRangeOutlierDetectorNode = InterquartileRangeOutlierDetectorNode;
                })(anomalydetector = algorithm.anomalydetector || (algorithm.anomalydetector = {}));
                var preprocessing;
                (function (preprocessing) {
                    var PCA = (function () {
                        function PCA(data, processType) {
                            this._data = data;
                            this._processType = processType;
                            this.calculateMinMaxAvg();
                            if (processType == PCA.CENTER_ON_AVG) {
                                org.mwg.ml.algorithm.preprocessing.PCA.shiftColumn(this._data, this._avg, true);
                            }
                            else if (processType == PCA.NORMALIZE) {
                                this.normalizeData(this._data);
                            }
                            this._svdDecompose = org.mwg.ml.common.matrix.Matrix.defaultEngine().decomposeSVD(this._data, true);
                            var singularValues = this._svdDecompose.getS();
                            console.log("Need to retain: " + this.retainDynamic(singularValues) + " / " + data.columns() + " dimensions");
                            console.log("Energy retained: " + this._percentToRetain + " %");
                            var x = 0;
                        }
                        PCA.prototype.normalizeData = function (data) {
                            var d = 0;
                            for (var j = 0; j < data.columns(); j++) {
                                if ((this._max[j] - this._min[j]) < PCA.EPS) {
                                    for (var i = 0; i < data.rows(); i++) {
                                        data.set(i, j, 0);
                                    }
                                }
                                else {
                                    d = 1 / (this._max[j] - this._min[j]);
                                    for (var i = 0; i < data.rows(); i++) {
                                        data.set(i, j, (data.get(i, j) - this._avg[j]) * d);
                                    }
                                }
                            }
                        };
                        PCA.prototype.inverseNormalizeData = function (data) {
                            var d = 0;
                            for (var j = 0; j < data.columns(); j++) {
                                if ((this._max[j] - this._min[j]) < PCA.EPS) {
                                    for (var i = 0; i < data.rows(); i++) {
                                        data.set(i, j, this._min[j]);
                                    }
                                }
                                else {
                                    d = this._max[j] - this._min[j];
                                    for (var i = 0; i < data.rows(); i++) {
                                        data.set(i, j, data.get(i, j) * d + this._avg[j]);
                                    }
                                }
                            }
                        };
                        PCA.prototype.calculateMinMaxAvg = function () {
                            this._min = new Float64Array(this._data.columns());
                            this._max = new Float64Array(this._data.columns());
                            this._avg = new Float64Array(this._data.columns());
                            for (var j = 0; j < this._data.columns(); j++) {
                                this._min[j] = this._data.get(0, j);
                                this._max[j] = this._min[j];
                                this._avg[j] = this._min[j];
                            }
                            var d;
                            for (var i = 1; i < this._data.rows(); i++) {
                                for (var j = 0; j < this._data.columns(); j++) {
                                    d = this._data.get(i, j);
                                    this._avg[j] += d;
                                    if (d < this._min[j]) {
                                        this._min[j] = d;
                                    }
                                    else if (d > this._max[j]) {
                                        this._max[j] = d;
                                    }
                                }
                            }
                            for (var j = 0; j < this._data.columns(); j++) {
                                this._avg[j] = this._avg[j] / this._data.rows();
                            }
                        };
                        PCA.shiftColumn = function (data, shift, workInPlace) {
                            var temp = data;
                            if (!workInPlace) {
                                temp = data.clone();
                            }
                            for (var i = 0; i < temp.rows(); i++) {
                                for (var j = 0; j < temp.columns(); j++) {
                                    temp.set(i, j, temp.get(i, j) - shift[j]);
                                }
                            }
                            return temp;
                        };
                        PCA.inverseShift = function (data, shift, workInPlace) {
                            var temp = data;
                            if (!workInPlace) {
                                temp = data.clone();
                            }
                            for (var i = 0; i < temp.rows(); i++) {
                                for (var j = 0; j < temp.columns(); j++) {
                                    temp.set(i, j, temp.get(i, j) + shift[j]);
                                }
                            }
                            return temp;
                        };
                        PCA.prototype.retainDynamic = function (svector) {
                            var d = 0;
                            for (var i = 0; i < svector.length; i++) {
                                d += svector[i] * svector[i];
                            }
                            var integrator = 0;
                            var previoust = 0;
                            var t = svector[1] * svector[1] / (svector[0] * svector[0]);
                            integrator = svector[0] * svector[0] + svector[1] * svector[1];
                            for (var i = 2; i < svector.length; i++) {
                                previoust = t;
                                t = svector[i] * svector[i] / (svector[i - 1] * svector[i - 1]);
                                console.log(i + " " + t / previoust + " , energy: " + integrator * 100 / d + " %");
                                if (t / previoust < 0.98) {
                                    this._percentToRetain = integrator * 100 / d;
                                    return i;
                                }
                                integrator += svector[i] * svector[i];
                            }
                            this._percentToRetain = integrator * 100 / d;
                            console.log(svector.length + " " + t / previoust + " , energy: " + integrator * 100 / d + " %");
                            console.log("");
                            return svector.length;
                        };
                        PCA.retain = function (svector, percent) {
                            var d = 0;
                            for (var i = 0; i < svector.length; i++) {
                                d += svector[i] * svector[i];
                            }
                            d = d * percent;
                            var t = 0;
                            for (var i = 0; i < svector.length; i++) {
                                t += svector[i] * svector[i];
                                if (t > d) {
                                    return i + 1;
                                }
                            }
                            return svector.length;
                        };
                        PCA.EPS = 1e-30;
                        PCA.NOPROCESS = 0;
                        PCA.CENTER_ON_AVG = 1;
                        PCA.NORMALIZE = 2;
                        return PCA;
                    }());
                    preprocessing.PCA = PCA;
                })(preprocessing = algorithm.preprocessing || (algorithm.preprocessing = {}));
                var profiling;
                (function (profiling) {
                    var GaussianMixtureNode = (function (_super) {
                        __extends(GaussianMixtureNode, _super);
                        function GaussianMixtureNode(p_world, p_time, p_id, p_graph) {
                            _super.call(this, p_world, p_time, p_id, p_graph);
                        }
                        GaussianMixtureNode.prototype.setProperty = function (propertyName, propertyType, propertyValue) {
                            GaussianMixtureNode.enforcer.check(propertyName, propertyType, propertyValue);
                            _super.prototype.setProperty.call(this, propertyName, propertyType, propertyValue);
                        };
                        GaussianMixtureNode.prototype.type = function (attributeName) {
                            if (attributeName === GaussianMixtureNode.AVG) {
                                return org.mwg.Type.DOUBLE_ARRAY;
                            }
                            else if (attributeName === GaussianMixtureNode.MIN) {
                                return org.mwg.Type.DOUBLE_ARRAY;
                            }
                            else if (attributeName === GaussianMixtureNode.MAX) {
                                return org.mwg.Type.DOUBLE_ARRAY;
                            }
                            else if (attributeName === GaussianMixtureNode.COV) {
                                return org.mwg.Type.DOUBLE_ARRAY;
                            }
                            else if (attributeName === GaussianMixtureNode.PRECISION) {
                                return org.mwg.Type.DOUBLE_ARRAY;
                            }
                            else {
                                return _super.prototype.type.call(this, attributeName);
                            }
                        };
                        GaussianMixtureNode.prototype.get = function (attributeName) {
                            if (attributeName === GaussianMixtureNode.AVG) {
                                return this.getAvg();
                            }
                            else if (attributeName === GaussianMixtureNode.MIN) {
                                return this.getMin();
                            }
                            else if (attributeName === GaussianMixtureNode.MAX) {
                                return this.getMax();
                            }
                            else if (attributeName === GaussianMixtureNode.MAX) {
                                return this.getMax();
                            }
                            else if (attributeName === GaussianMixtureNode.COV) {
                                var resolved = this._resolver.resolveState(this);
                                var initialPrecision = resolved.getFromKey(GaussianMixtureNode.PRECISION);
                                var nbfeature = this.getNumberOfFeatures();
                                if (initialPrecision == null) {
                                    initialPrecision = new Float64Array(nbfeature);
                                    for (var i = 0; i < nbfeature; i++) {
                                        initialPrecision[i] = 1;
                                    }
                                }
                                return this.getCovariance(this.getAvg(), initialPrecision);
                            }
                            else {
                                return _super.prototype.get.call(this, attributeName);
                            }
                        };
                        GaussianMixtureNode.prototype.learn = function (callback) {
                            var _this = this;
                            this.extractFeatures(function (values) {
                                {
                                    _this.learnVector(values, callback);
                                }
                            });
                        };
                        GaussianMixtureNode.prototype.learnVector = function (values, callback) {
                            var _this = this;
                            var resolved = this._resolver.alignState(this);
                            var width = resolved.getFromKeyWithDefault(GaussianMixtureNode.WIDTH, GaussianMixtureNode.WIDTH_DEF);
                            var compressionFactor = resolved.getFromKeyWithDefault(GaussianMixtureNode.COMPRESSION_FACTOR, GaussianMixtureNode.COMPRESSION_FACTOR_DEF);
                            var compressionIter = resolved.getFromKeyWithDefault(GaussianMixtureNode.COMPRESSION_ITER, GaussianMixtureNode.COMPRESSION_ITER_DEF);
                            var initialPrecision = resolved.getFromKey(GaussianMixtureNode.PRECISION);
                            if (initialPrecision == null) {
                                initialPrecision = new Float64Array(values.length);
                                for (var i = 0; i < values.length; i++) {
                                    initialPrecision[i] = 1;
                                }
                            }
                            var precisions = initialPrecision;
                            var threshold = resolved.getFromKeyWithDefault(GaussianMixtureNode.THRESHOLD, GaussianMixtureNode.THRESHOLD_DEF);
                            var traverse = org.mwg.task.Actions.newTask();
                            traverse.asGlobalVar("parent").traverse(GaussianMixtureNode.INTERNAL_SUBGAUSSIAN).then(function (context) {
                                {
                                    var result = context.resultAsNodes();
                                    var parent_1 = context.variable("parent").get(0);
                                    var resultChild = _this.filter(result, values, precisions, threshold, parent_1.getLevel() - 1.0);
                                    if (resultChild != null) {
                                        parent_1.internallearn(values, width, compressionFactor, compressionIter, precisions, threshold, false);
                                        context.continueWith(context.wrapClone(resultChild));
                                    }
                                    else {
                                        parent_1.internallearn(values, width, compressionFactor, compressionIter, precisions, threshold, true);
                                        context.continueWith(null);
                                    }
                                }
                            }).ifThen(function (context) {
                                {
                                    return (context.result() != null);
                                }
                            }, traverse);
                            var mainTask = org.mwg.task.Actions.setTime(this.time() + "").setWorld(this.world() + "").inject(this).subTask(traverse);
                            mainTask.execute(this.graph(), function (result) {
                                {
                                    if (result != null) {
                                        result.free();
                                    }
                                    if (callback != null) {
                                        callback(true);
                                    }
                                }
                            });
                        };
                        GaussianMixtureNode.prototype.checkInside = function (min, max, precisions, threshold, level) {
                            threshold = threshold + level * 0.707;
                            var avg = this.getAvg();
                            var result = true;
                            var cov = this.getCovarianceArray(avg, precisions);
                            for (var i = 0; i < min.length; i++) {
                                cov[i] = Math.sqrt(cov[i]);
                                if (((avg[i] + cov[i]) < (min[i] - threshold * precisions[i])) || ((avg[i] - cov[i]) > (max[i] + threshold * precisions[i]))) {
                                    result = false;
                                    break;
                                }
                            }
                            return result;
                        };
                        GaussianMixtureNode.prototype.filter = function (result, features, precisions, threshold, level) {
                            threshold = threshold + level * 0.707;
                            if (result == null || result.size() == 0) {
                                return null;
                            }
                            var distances = new Float64Array(result.size());
                            var min = java.lang.Double.MAX_VALUE;
                            var index = 0;
                            for (var i = 0; i < result.size(); i++) {
                                var temp = result.get(i);
                                var avg = temp.getAvg();
                                distances[i] = org.mwg.ml.algorithm.profiling.GaussianMixtureNode.distance(features, avg, temp.getCovarianceArray(avg, precisions));
                                if (distances[i] < min) {
                                    min = distances[i];
                                    index = i;
                                }
                            }
                            if (min < threshold) {
                                return result.get(index);
                            }
                            else {
                                return null;
                            }
                        };
                        GaussianMixtureNode.prototype.predict = function (callback) { };
                        GaussianMixtureNode.prototype.getLevel = function () {
                            return this._resolver.resolveState(this).getFromKeyWithDefault(GaussianMixtureNode.LEVEL, GaussianMixtureNode.LEVEL_DEF);
                        };
                        GaussianMixtureNode.prototype.getWidth = function () {
                            return this._resolver.resolveState(this).getFromKeyWithDefault(GaussianMixtureNode.WIDTH, GaussianMixtureNode.WIDTH_DEF);
                        };
                        GaussianMixtureNode.prototype.getCompressionFactor = function () {
                            return this._resolver.resolveState(this).getFromKeyWithDefault(GaussianMixtureNode.COMPRESSION_FACTOR, GaussianMixtureNode.COMPRESSION_FACTOR_DEF);
                        };
                        GaussianMixtureNode.prototype.getCompressionIter = function () {
                            return this._resolver.resolveState(this).getFromKeyWithDefault(GaussianMixtureNode.COMPRESSION_ITER, GaussianMixtureNode.COMPRESSION_ITER_DEF);
                        };
                        GaussianMixtureNode.prototype.updateLevel = function (newLevel) {
                            _super.prototype.set.call(this, GaussianMixtureNode.LEVEL, newLevel);
                            if (newLevel == 0) {
                                _super.prototype.set.call(this, GaussianMixtureNode.INTERNAL_SUBGAUSSIAN, new Float64Array(0));
                            }
                            else {
                                _super.prototype.rel.call(this, GaussianMixtureNode.INTERNAL_SUBGAUSSIAN, function (result) {
                                    {
                                        for (var i = 0; i < result.length; i++) {
                                            var g = result[i];
                                            g.updateLevel(newLevel - 1);
                                            result[i].free();
                                        }
                                    }
                                });
                            }
                        };
                        GaussianMixtureNode.prototype.createLevel = function (values, level, width, compressionFactor, compressionIter, precisions, threshold) {
                            var g = this.graph().newTypedNode(this.world(), this.time(), GaussianMixtureNode.NAME);
                            g.set(GaussianMixtureNode.LEVEL, level);
                            g.internallearn(values, width, compressionFactor, compressionIter, precisions, threshold, false);
                            _super.prototype.add.call(this, GaussianMixtureNode.INTERNAL_SUBGAUSSIAN, g);
                            return g;
                        };
                        GaussianMixtureNode.prototype.checkAndCompress = function (width, compressionFactor, compressionIter, precisions, threshold) {
                            var selfPointer = this;
                            var subgaussians = _super.prototype.get.call(this, GaussianMixtureNode.INTERNAL_SUBGAUSSIAN);
                            if (subgaussians != null && subgaussians.size() != 0 && subgaussians.size() >= compressionFactor * width) {
                                _super.prototype.rel.call(this, GaussianMixtureNode.INTERNAL_SUBGAUSSIAN, function (result) {
                                    {
                                        var subgauss = new Array(result.length);
                                        var data = new Array(result.length);
                                        for (var i = 0; i < result.length; i++) {
                                            subgauss[i] = result[i];
                                            data[i] = subgauss[i].getAvg();
                                        }
                                        var clusteringEngine = new org.mwg.ml.algorithm.profiling.KMeans();
                                        var clusters = clusteringEngine.getClusterIds(data, width, compressionIter, precisions);
                                        var mainClusters = new Array(width);
                                        for (var i = 0; i < width; i++) {
                                            if (clusters[i] != null && clusters[i].length > 0) {
                                                var max = 0;
                                                var maxpos = 0;
                                                for (var j = 0; j < clusters[i].length; j++) {
                                                    var x = subgauss[clusters[i][j]].getTotal();
                                                    if (x > max) {
                                                        max = x;
                                                        maxpos = clusters[i][j];
                                                    }
                                                }
                                                mainClusters[i] = subgauss[maxpos];
                                            }
                                        }
                                        for (var i = 0; i < width; i++) {
                                            if (clusters[i].length > 1 && mainClusters[i].getTotal() == 1 && mainClusters[i].getLevel() > 0) {
                                                mainClusters[i].createLevel(mainClusters[i].getAvg(), mainClusters[i].getLevel() - 1, width, compressionFactor, compressionIter, precisions, threshold).free();
                                            }
                                            if (clusters[i] != null && clusters[i].length > 0) {
                                                for (var j = 0; j < clusters[i].length; j++) {
                                                    var g = subgauss[clusters[i][j]];
                                                    if (g != mainClusters[i]) {
                                                        mainClusters[i].move(g);
                                                        selfPointer.remove(org.mwg.ml.algorithm.profiling.GaussianMixtureNode.INTERNAL_SUBGAUSSIAN, g);
                                                        g.free();
                                                    }
                                                }
                                                mainClusters[i].checkAndCompress(width, compressionFactor, compressionIter, precisions, threshold);
                                            }
                                        }
                                        for (var i = 0; i < result.length; i++) {
                                            result[i].free();
                                        }
                                    }
                                });
                            }
                        };
                        GaussianMixtureNode.prototype.move = function (subgaus) {
                            var total = this.getTotal();
                            var level = this.getLevel();
                            var sum = this.getSum();
                            var min = this.getMin();
                            var max = this.getMax();
                            var sumsquares = this.getSumSquares();
                            total = total + subgaus.getTotal();
                            var sum2 = subgaus.getSum();
                            var min2 = subgaus.getMin();
                            var max2 = subgaus.getMax();
                            var sumsquares2 = subgaus.getSumSquares();
                            for (var i = 0; i < sum.length; i++) {
                                sum[i] = sum[i] + sum2[i];
                                if (min2[i] < min[i]) {
                                    min[i] = min2[i];
                                }
                                if (max2[i] > max[i]) {
                                    max[i] = max2[i];
                                }
                            }
                            for (var i = 0; i < sumsquares.length; i++) {
                                sumsquares[i] = sumsquares[i] + sumsquares2[i];
                            }
                            this.set(GaussianMixtureNode.INTERNAL_TOTAL_KEY, total);
                            this.set(GaussianMixtureNode.INTERNAL_SUM_KEY, sum);
                            this.set(GaussianMixtureNode.INTERNAL_MIN_KEY, min);
                            this.set(GaussianMixtureNode.INTERNAL_MAX_KEY, max);
                            this.set(GaussianMixtureNode.INTERNAL_SUMSQUARE_KEY, sumsquares);
                            if (level > 0) {
                                var subrelations = subgaus.get(GaussianMixtureNode.INTERNAL_SUBGAUSSIAN);
                                if (subrelations == null || subrelations.size() == 0) {
                                    subgaus.updateLevel(level - 1);
                                    _super.prototype.add.call(this, GaussianMixtureNode.INTERNAL_SUBGAUSSIAN, subgaus);
                                }
                                else {
                                    var oldrel = this.getOrCreateRel(GaussianMixtureNode.INTERNAL_SUBGAUSSIAN);
                                    for (var i = 0; i < subrelations.size(); i++) {
                                        oldrel.add(subrelations.get(i));
                                    }
                                }
                            }
                        };
                        GaussianMixtureNode.prototype.query = function (level, min, max, callback) {
                            var nbfeature = this.getNumberOfFeatures();
                            if (nbfeature == 0) {
                                callback(null);
                                return;
                            }
                            var resolved = this._resolver.resolveState(this);
                            var initialPrecision = resolved.getFromKey(GaussianMixtureNode.PRECISION);
                            if (initialPrecision == null) {
                                initialPrecision = new Float64Array(nbfeature);
                                for (var i = 0; i < nbfeature; i++) {
                                    initialPrecision[i] = 1;
                                }
                            }
                            if (min == null) {
                                min = this.getMin();
                            }
                            if (max == null) {
                                max = this.getMax();
                            }
                            for (var i = 0; i < nbfeature; i++) {
                                if ((max[i] - min[i]) < initialPrecision[i]) {
                                    min[i] = min[i] - initialPrecision[i];
                                    max[i] = min[i] + 2 * initialPrecision[i];
                                }
                            }
                            var finalMin = min;
                            var finalMax = max;
                            var err = initialPrecision;
                            var threshold = resolved.getFromKeyWithDefault(GaussianMixtureNode.THRESHOLD, GaussianMixtureNode.THRESHOLD_DEF);
                            var deepTraverseTask = org.mwg.task.Actions.setTime(this.time() + "").setWorld(this.world() + "");
                            var parentLevel = this.getLevel();
                            deepTraverseTask.inject([this]);
                            var _loop_2 = function(i) {
                                deepTraverseTask.traverseOrKeep(GaussianMixtureNode.INTERNAL_SUBGAUSSIAN);
                                var finalI = i;
                                deepTraverseTask.select(function (node) {
                                    {
                                        var res = node.checkInside(finalMin, finalMax, err, threshold, parentLevel - finalI);
                                        return res;
                                    }
                                });
                            };
                            for (var i = 0; i < this.getLevel() - level; i++) {
                                _loop_2(i);
                            }
                            deepTraverseTask.execute(this.graph(), function (result) {
                                {
                                    var covBackup = new org.mwg.ml.common.matrix.Matrix(null, nbfeature, nbfeature);
                                    for (var i = 0; i < nbfeature; i++) {
                                        covBackup.set(i, i, err[i]);
                                    }
                                    var mvnBackup = new org.mwg.ml.common.matrix.operation.MultivariateNormalDistribution(null, covBackup, false);
                                    var totals = new Int32Array(result.size());
                                    var globalTotal = 0;
                                    var distributions = new Array(result.size());
                                    for (var i = 0; i < result.size(); i++) {
                                        var temp = result.get(i);
                                        totals[i] = temp.getTotal();
                                        globalTotal += totals[i];
                                        var avg = temp.getAvg();
                                        if (totals[i] > 2) {
                                            distributions[i] = new org.mwg.ml.common.matrix.operation.MultivariateNormalDistribution(avg, temp.getCovariance(avg, err), false);
                                            distributions[i].setMin(temp.getMin());
                                            distributions[i].setMax(temp.getMax());
                                        }
                                        else {
                                            distributions[i] = mvnBackup.clone(avg);
                                        }
                                    }
                                    result.free();
                                    callback(new org.mwg.ml.algorithm.profiling.ProbaDistribution(totals, distributions, globalTotal));
                                }
                            });
                        };
                        GaussianMixtureNode.prototype.generateDistributions = function (level, callback) {
                            var nbfeature = this.getNumberOfFeatures();
                            if (nbfeature == 0) {
                                callback(null);
                                return;
                            }
                            var resolved = this._resolver.resolveState(this);
                            var initialPrecision = resolved.getFromKey(GaussianMixtureNode.PRECISION);
                            if (initialPrecision == null) {
                                initialPrecision = new Float64Array(nbfeature);
                                for (var i = 0; i < nbfeature; i++) {
                                    initialPrecision[i] = 1;
                                }
                            }
                            var err = initialPrecision;
                            var deepTraverseTask = org.mwg.task.Actions.setTime(this.time() + "").setWorld(this.world() + "");
                            deepTraverseTask.inject([this]);
                            for (var i = 0; i < this.getLevel() - level; i++) {
                                deepTraverseTask.traverseOrKeep(GaussianMixtureNode.INTERNAL_SUBGAUSSIAN);
                            }
                            deepTraverseTask.then(function (context) {
                                {
                                    var leaves = context.resultAsNodes();
                                    var covBackup = new org.mwg.ml.common.matrix.Matrix(null, nbfeature, nbfeature);
                                    for (var i = 0; i < nbfeature; i++) {
                                        covBackup.set(i, i, err[i]);
                                    }
                                    var mvnBackup = new org.mwg.ml.common.matrix.operation.MultivariateNormalDistribution(null, covBackup, false);
                                    var totals = new Int32Array(leaves.size());
                                    var globalTotal = 0;
                                    var distributions = new Array(leaves.size());
                                    for (var i = 0; i < leaves.size(); i++) {
                                        var temp = leaves.get(i);
                                        totals[i] = temp.getTotal();
                                        globalTotal += totals[i];
                                        var avg = temp.getAvg();
                                        if (totals[i] > 2) {
                                            distributions[i] = new org.mwg.ml.common.matrix.operation.MultivariateNormalDistribution(avg, temp.getCovariance(avg, err), false);
                                            distributions[i].setMin(temp.getMin());
                                            distributions[i].setMax(temp.getMax());
                                        }
                                        else {
                                            distributions[i] = mvnBackup.clone(avg);
                                        }
                                    }
                                    context.continueTask();
                                    callback(new org.mwg.ml.algorithm.profiling.ProbaDistribution(totals, distributions, globalTotal));
                                }
                            });
                            deepTraverseTask.execute(this.graph(), null);
                        };
                        GaussianMixtureNode.prototype.toString = function () {
                            return GaussianMixtureNode.NAME;
                        };
                        GaussianMixtureNode.prototype.internallearn = function (values, width, compressionFactor, compressionIter, precisions, threshold, createNode) {
                            var features = values.length;
                            var reccursive = false;
                            var total = this.getTotal();
                            var level = this.getLevel();
                            if (total == 0) {
                                var sum = new Float64Array(features);
                                java.lang.System.arraycopy(values, 0, sum, 0, features);
                                total = 1;
                                this.set(GaussianMixtureNode.INTERNAL_TOTAL_KEY, total);
                                this.set(GaussianMixtureNode.INTERNAL_SUM_KEY, sum);
                            }
                            else {
                                var sum = void 0;
                                var min = void 0;
                                var max = void 0;
                                var sumsquares = void 0;
                                if (total == 1) {
                                    sum = _super.prototype.get.call(this, GaussianMixtureNode.INTERNAL_SUM_KEY);
                                    min = new Float64Array(features);
                                    max = new Float64Array(features);
                                    java.lang.System.arraycopy(sum, 0, min, 0, features);
                                    java.lang.System.arraycopy(sum, 0, max, 0, features);
                                    sumsquares = new Float64Array(features * (features + 1) / 2);
                                    var count_1 = 0;
                                    for (var i = 0; i < features; i++) {
                                        for (var j = i; j < features; j++) {
                                            sumsquares[count_1] = sum[i] * sum[j];
                                            count_1++;
                                        }
                                    }
                                    if (createNode && level > 0) {
                                        var newLev = this.createLevel(sum, level - 1, width, compressionFactor, compressionIter, precisions, threshold);
                                        var d = org.mwg.ml.algorithm.profiling.GaussianMixtureNode.distance(values, sum, precisions);
                                        if (d < threshold) {
                                            reccursive = true;
                                            newLev.internallearn(values, width, compressionFactor, compressionIter, precisions, threshold, createNode);
                                        }
                                        newLev.free();
                                    }
                                }
                                else {
                                    sum = _super.prototype.get.call(this, GaussianMixtureNode.INTERNAL_SUM_KEY);
                                    min = _super.prototype.get.call(this, GaussianMixtureNode.INTERNAL_MIN_KEY);
                                    max = _super.prototype.get.call(this, GaussianMixtureNode.INTERNAL_MAX_KEY);
                                    sumsquares = _super.prototype.get.call(this, GaussianMixtureNode.INTERNAL_SUMSQUARE_KEY);
                                }
                                for (var i = 0; i < features; i++) {
                                    if (values[i] < min[i]) {
                                        min[i] = values[i];
                                    }
                                    if (values[i] > max[i]) {
                                        max[i] = values[i];
                                    }
                                    sum[i] += values[i];
                                }
                                var count = 0;
                                for (var i = 0; i < features; i++) {
                                    for (var j = i; j < features; j++) {
                                        sumsquares[count] += values[i] * values[j];
                                        count++;
                                    }
                                }
                                total++;
                                if (createNode && level > 0 && !reccursive) {
                                    var newLev = this.createLevel(values, level - 1, width, compressionFactor, compressionIter, precisions, threshold);
                                    newLev.free();
                                    this.checkAndCompress(width, compressionFactor, compressionIter, precisions, threshold);
                                }
                                this.set(GaussianMixtureNode.INTERNAL_TOTAL_KEY, total);
                                this.set(GaussianMixtureNode.INTERNAL_SUM_KEY, sum);
                                this.set(GaussianMixtureNode.INTERNAL_MIN_KEY, min);
                                this.set(GaussianMixtureNode.INTERNAL_MAX_KEY, max);
                                this.set(GaussianMixtureNode.INTERNAL_SUMSQUARE_KEY, sumsquares);
                            }
                        };
                        GaussianMixtureNode.prototype.getNumberOfFeatures = function () {
                            var total = this.getTotal();
                            if (total == 0) {
                                return 0;
                            }
                            else {
                                var sum = _super.prototype.get.call(this, GaussianMixtureNode.INTERNAL_SUM_KEY);
                                return sum.length;
                            }
                        };
                        GaussianMixtureNode.prototype.getSum = function () {
                            var total = this.getTotal();
                            if (total == 0) {
                                return null;
                            }
                            else {
                                return _super.prototype.get.call(this, GaussianMixtureNode.INTERNAL_SUM_KEY);
                            }
                        };
                        GaussianMixtureNode.prototype.getSumSquares = function () {
                            var total = this.getTotal();
                            if (total == 0) {
                                return null;
                            }
                            if (total == 1) {
                                var sum = _super.prototype.get.call(this, GaussianMixtureNode.INTERNAL_SUM_KEY);
                                var features = sum.length;
                                var sumsquares = new Float64Array(features * (features + 1) / 2);
                                var count = 0;
                                for (var i = 0; i < features; i++) {
                                    for (var j = i; j < features; j++) {
                                        sumsquares[count] = sum[i] * sum[j];
                                        count++;
                                    }
                                }
                                return sumsquares;
                            }
                            else {
                                return _super.prototype.get.call(this, GaussianMixtureNode.INTERNAL_SUMSQUARE_KEY);
                            }
                        };
                        GaussianMixtureNode.prototype.getProbability = function (featArray, err, normalizeOnAvg) {
                            var sum = _super.prototype.get.call(this, GaussianMixtureNode.INTERNAL_SUM_KEY);
                            var sumsquares = _super.prototype.get.call(this, GaussianMixtureNode.INTERNAL_SUMSQUARE_KEY);
                            var mnd = org.mwg.ml.common.matrix.operation.MultivariateNormalDistribution.getDistribution(sum, sumsquares, this.getTotal(), false);
                            if (mnd == null) {
                                return 0;
                            }
                            else {
                                return mnd.density(featArray, normalizeOnAvg);
                            }
                        };
                        GaussianMixtureNode.prototype.getProbabilityArray = function (featArray, err, normalizeOnAvg) {
                            var res = new Float64Array(featArray.length);
                            var sum = _super.prototype.get.call(this, GaussianMixtureNode.INTERNAL_SUM_KEY);
                            var sumsquares = _super.prototype.get.call(this, GaussianMixtureNode.INTERNAL_SUMSQUARE_KEY);
                            var mnd = org.mwg.ml.common.matrix.operation.MultivariateNormalDistribution.getDistribution(sum, sumsquares, this.getTotal(), false);
                            if (mnd == null) {
                                return res;
                            }
                            else {
                                for (var i = 0; i < res.length; i++) {
                                    res[i] = mnd.density(featArray[i], normalizeOnAvg);
                                }
                                return res;
                            }
                        };
                        GaussianMixtureNode.prototype.getTotal = function () {
                            var x = _super.prototype.get.call(this, GaussianMixtureNode.INTERNAL_TOTAL_KEY);
                            if (x == null) {
                                return 0;
                            }
                            else {
                                return x;
                            }
                        };
                        GaussianMixtureNode.prototype.getAvg = function () {
                            var total = this.getTotal();
                            if (total == 0) {
                                return null;
                            }
                            if (total == 1) {
                                return _super.prototype.get.call(this, GaussianMixtureNode.INTERNAL_SUM_KEY);
                            }
                            else {
                                var avg = _super.prototype.get.call(this, GaussianMixtureNode.INTERNAL_SUM_KEY);
                                for (var i = 0; i < avg.length; i++) {
                                    avg[i] = avg[i] / total;
                                }
                                return avg;
                            }
                        };
                        GaussianMixtureNode.prototype.getCovarianceArray = function (avg, err) {
                            if (avg == null) {
                                var errClone = new Float64Array(err.length);
                                java.lang.System.arraycopy(err, 0, errClone, 0, err.length);
                                return errClone;
                            }
                            if (err == null) {
                                err = new Float64Array(avg.length);
                            }
                            var features = avg.length;
                            var total = this.getTotal();
                            if (total == 0) {
                                return null;
                            }
                            if (total > 1) {
                                var covariances = new Float64Array(features);
                                var sumsquares = _super.prototype.get.call(this, GaussianMixtureNode.INTERNAL_SUMSQUARE_KEY);
                                var correction = total;
                                correction = correction / (total - 1);
                                var count = 0;
                                for (var i = 0; i < features; i++) {
                                    covariances[i] = (sumsquares[count] / total - avg[i] * avg[i]) * correction;
                                    if (covariances[i] < err[i]) {
                                        covariances[i] = err[i];
                                    }
                                    count += features - i;
                                }
                                return covariances;
                            }
                            else {
                                var errClone = new Float64Array(err.length);
                                java.lang.System.arraycopy(err, 0, errClone, 0, err.length);
                                return errClone;
                            }
                        };
                        GaussianMixtureNode.prototype.getCovariance = function (avg, err) {
                            var features = avg.length;
                            var total = this.getTotal();
                            if (total == 0) {
                                return null;
                            }
                            if (err == null) {
                                err = new Float64Array(avg.length);
                            }
                            if (total > 1) {
                                var covariances = new Float64Array(features * features);
                                var sumsquares = _super.prototype.get.call(this, GaussianMixtureNode.INTERNAL_SUMSQUARE_KEY);
                                var correction = total;
                                correction = correction / (total - 1);
                                var count = 0;
                                for (var i = 0; i < features; i++) {
                                    for (var j = i; j < features; j++) {
                                        covariances[i * features + j] = (sumsquares[count] / total - avg[i] * avg[j]) * correction;
                                        covariances[j * features + i] = covariances[i * features + j];
                                        count++;
                                        if (covariances[i * features + i] < err[i]) {
                                            covariances[i * features + i] = err[i];
                                        }
                                    }
                                }
                                return new org.mwg.ml.common.matrix.Matrix(covariances, features, features);
                            }
                            else {
                                return null;
                            }
                        };
                        GaussianMixtureNode.prototype.getMin = function () {
                            var total = this.getTotal();
                            if (total == 0) {
                                return null;
                            }
                            if (total == 1) {
                                var min = _super.prototype.get.call(this, GaussianMixtureNode.INTERNAL_SUM_KEY);
                                return min;
                            }
                            else {
                                var min = _super.prototype.get.call(this, GaussianMixtureNode.INTERNAL_MIN_KEY);
                                return min;
                            }
                        };
                        GaussianMixtureNode.prototype.getMax = function () {
                            var total = this.getTotal();
                            if (total == 0) {
                                return null;
                            }
                            if (total == 1) {
                                var max = _super.prototype.get.call(this, GaussianMixtureNode.INTERNAL_SUM_KEY);
                                return max;
                            }
                            else {
                                var max = _super.prototype.get.call(this, GaussianMixtureNode.INTERNAL_MAX_KEY);
                                return max;
                            }
                        };
                        GaussianMixtureNode.prototype.getSubGraph = function () {
                            var res = _super.prototype.get.call(this, GaussianMixtureNode.INTERNAL_SUBGAUSSIAN);
                            if (res == null) {
                                return null;
                            }
                            var reslong = new Float64Array(res.size());
                            for (var i = 0; i < res.size(); i++) {
                                reslong[i] = res.get(i);
                            }
                            return reslong;
                        };
                        GaussianMixtureNode.distance = function (features, avg, precisions) {
                            var max = 0;
                            var temp;
                            for (var i = 0; i < features.length; i++) {
                                temp = (features[i] - avg[i]) * (features[i] - avg[i]) / precisions[i];
                                if (temp > max) {
                                    max = temp;
                                }
                            }
                            return Math.sqrt(max);
                        };
                        GaussianMixtureNode.NAME = "GaussianMixtureNode";
                        GaussianMixtureNode.MIN = "min";
                        GaussianMixtureNode.MAX = "max";
                        GaussianMixtureNode.AVG = "avg";
                        GaussianMixtureNode.COV = "cov";
                        GaussianMixtureNode.LEVEL = "_level";
                        GaussianMixtureNode.LEVEL_DEF = 0;
                        GaussianMixtureNode.WIDTH = "_width";
                        GaussianMixtureNode.WIDTH_DEF = 10;
                        GaussianMixtureNode.COMPRESSION_FACTOR = "_compression";
                        GaussianMixtureNode.COMPRESSION_FACTOR_DEF = 2;
                        GaussianMixtureNode.COMPRESSION_ITER = "_compressioniter";
                        GaussianMixtureNode.COMPRESSION_ITER_DEF = 10;
                        GaussianMixtureNode.THRESHOLD = "_threshold";
                        GaussianMixtureNode.THRESHOLD_DEF = 3;
                        GaussianMixtureNode.PRECISION = "_precision";
                        GaussianMixtureNode.INTERNAL_SUBGAUSSIAN = "_subGaussian";
                        GaussianMixtureNode.INTERNAL_SUM_KEY = "_sum";
                        GaussianMixtureNode.INTERNAL_SUMSQUARE_KEY = "_sumSquare";
                        GaussianMixtureNode.INTERNAL_TOTAL_KEY = "_total";
                        GaussianMixtureNode.INTERNAL_MIN_KEY = "_min";
                        GaussianMixtureNode.INTERNAL_MAX_KEY = "_max";
                        GaussianMixtureNode.enforcer = new org.mwg.utility.Enforcer().asIntWithin(GaussianMixtureNode.LEVEL, 0, 1000).asIntWithin(GaussianMixtureNode.WIDTH, 1, 1000).asPositiveDouble(GaussianMixtureNode.COMPRESSION_FACTOR).asPositiveDouble(GaussianMixtureNode.THRESHOLD).asDoubleArray(GaussianMixtureNode.PRECISION);
                        return GaussianMixtureNode;
                    }(org.mwg.ml.AbstractMLNode));
                    profiling.GaussianMixtureNode = GaussianMixtureNode;
                    var GaussianNode = (function (_super) {
                        __extends(GaussianNode, _super);
                        function GaussianNode(p_world, p_time, p_id, p_graph) {
                            _super.call(this, p_world, p_time, p_id, p_graph);
                        }
                        GaussianNode.prototype.setProperty = function (propertyName, propertyType, propertyValue) {
                            _super.prototype.setProperty.call(this, propertyName, propertyType, propertyValue);
                        };
                        GaussianNode.prototype.type = function (attributeName) {
                            if (attributeName === GaussianNode.AVG) {
                                return org.mwg.Type.DOUBLE_ARRAY;
                            }
                            else if (attributeName === GaussianNode.MIN) {
                                return org.mwg.Type.DOUBLE_ARRAY;
                            }
                            else if (attributeName === GaussianNode.MAX) {
                                return org.mwg.Type.DOUBLE_ARRAY;
                            }
                            else if (attributeName === GaussianNode.COV) {
                                return org.mwg.Type.DOUBLE_ARRAY;
                            }
                            else {
                                return _super.prototype.type.call(this, attributeName);
                            }
                        };
                        GaussianNode.prototype.get = function (attributeName) {
                            if (attributeName === GaussianNode.AVG) {
                                return this.getAvg();
                            }
                            else if (attributeName === GaussianNode.MIN) {
                                return this.getMin();
                            }
                            else if (attributeName === GaussianNode.MAX) {
                                return this.getMax();
                            }
                            else if (attributeName === GaussianNode.MAX) {
                                return this.getMax();
                            }
                            else if (attributeName === GaussianNode.COV) {
                                var resolved = this._resolver.resolveState(this);
                                var initialPrecision = resolved.getFromKey(GaussianNode.PRECISION);
                                var nbfeature = this.getNumberOfFeatures();
                                if (initialPrecision == null) {
                                    initialPrecision = new Float64Array(nbfeature);
                                    for (var i = 0; i < nbfeature; i++) {
                                        initialPrecision[i] = 1;
                                    }
                                }
                                return this.getCovariance(this.getAvg(), initialPrecision);
                            }
                            else {
                                return _super.prototype.get.call(this, attributeName);
                            }
                        };
                        GaussianNode.prototype.learn = function (callback) {
                            var _this = this;
                            this.extractFeatures(function (values) {
                                {
                                    _this.learnVector(values, callback);
                                }
                            });
                        };
                        GaussianNode.prototype.learnVector = function (values, callback) {
                            var resolved = this._resolver.alignState(this);
                            var features = values.length;
                            var total = this.getTotal();
                            if (total == 0) {
                                var sum = new Float64Array(features);
                                java.lang.System.arraycopy(values, 0, sum, 0, features);
                                total = 1;
                                this.set(GaussianNode.INTERNAL_TOTAL_KEY, total);
                                this.set(GaussianNode.INTERNAL_SUM_KEY, sum);
                            }
                            else {
                                var sum = void 0;
                                var min = void 0;
                                var max = void 0;
                                var sumsquares = void 0;
                                if (total == 1) {
                                    sum = _super.prototype.get.call(this, GaussianNode.INTERNAL_SUM_KEY);
                                    min = new Float64Array(features);
                                    max = new Float64Array(features);
                                    java.lang.System.arraycopy(sum, 0, min, 0, features);
                                    java.lang.System.arraycopy(sum, 0, max, 0, features);
                                    sumsquares = new Float64Array(features * (features + 1) / 2);
                                    var count_2 = 0;
                                    for (var i = 0; i < features; i++) {
                                        for (var j = i; j < features; j++) {
                                            sumsquares[count_2] = sum[i] * sum[j];
                                            count_2++;
                                        }
                                    }
                                }
                                else {
                                    sum = _super.prototype.get.call(this, GaussianNode.INTERNAL_SUM_KEY);
                                    min = _super.prototype.get.call(this, GaussianNode.INTERNAL_MIN_KEY);
                                    max = _super.prototype.get.call(this, GaussianNode.INTERNAL_MAX_KEY);
                                    sumsquares = _super.prototype.get.call(this, GaussianNode.INTERNAL_SUMSQUARE_KEY);
                                }
                                for (var i = 0; i < features; i++) {
                                    if (values[i] < min[i]) {
                                        min[i] = values[i];
                                    }
                                    if (values[i] > max[i]) {
                                        max[i] = values[i];
                                    }
                                    sum[i] += values[i];
                                }
                                var count = 0;
                                for (var i = 0; i < features; i++) {
                                    for (var j = i; j < features; j++) {
                                        sumsquares[count] += values[i] * values[j];
                                        count++;
                                    }
                                }
                                total++;
                                this.set(GaussianNode.INTERNAL_TOTAL_KEY, total);
                                this.set(GaussianNode.INTERNAL_SUM_KEY, sum);
                                this.set(GaussianNode.INTERNAL_MIN_KEY, min);
                                this.set(GaussianNode.INTERNAL_MAX_KEY, max);
                                this.set(GaussianNode.INTERNAL_SUMSQUARE_KEY, sumsquares);
                            }
                            if (callback != null) {
                                callback(true);
                            }
                        };
                        GaussianNode.prototype.predict = function (callback) { };
                        GaussianNode.prototype.toString = function () {
                            return GaussianNode.NAME;
                        };
                        GaussianNode.prototype.getNumberOfFeatures = function () {
                            var total = this.getTotal();
                            if (total == 0) {
                                return 0;
                            }
                            else {
                                var sum = _super.prototype.get.call(this, GaussianNode.INTERNAL_SUM_KEY);
                                return sum.length;
                            }
                        };
                        GaussianNode.prototype.getSum = function () {
                            var total = this.getTotal();
                            if (total == 0) {
                                return null;
                            }
                            else {
                                return _super.prototype.get.call(this, GaussianNode.INTERNAL_SUM_KEY);
                            }
                        };
                        GaussianNode.prototype.getSumSquares = function () {
                            var total = this.getTotal();
                            if (total == 0) {
                                return null;
                            }
                            if (total == 1) {
                                var sum = _super.prototype.get.call(this, GaussianNode.INTERNAL_SUM_KEY);
                                var features = sum.length;
                                var sumsquares = new Float64Array(features * (features + 1) / 2);
                                var count = 0;
                                for (var i = 0; i < features; i++) {
                                    for (var j = i; j < features; j++) {
                                        sumsquares[count] = sum[i] * sum[j];
                                        count++;
                                    }
                                }
                                return sumsquares;
                            }
                            else {
                                return _super.prototype.get.call(this, GaussianNode.INTERNAL_SUMSQUARE_KEY);
                            }
                        };
                        GaussianNode.prototype.getProbability = function (featArray, err, normalizeOnAvg) {
                            var sum = _super.prototype.get.call(this, GaussianNode.INTERNAL_SUM_KEY);
                            var sumsquares = _super.prototype.get.call(this, GaussianNode.INTERNAL_SUMSQUARE_KEY);
                            var mnd = org.mwg.ml.common.matrix.operation.MultivariateNormalDistribution.getDistribution(sum, sumsquares, this.getTotal(), false);
                            if (mnd == null) {
                                return 0;
                            }
                            else {
                                return mnd.density(featArray, normalizeOnAvg);
                            }
                        };
                        GaussianNode.prototype.getProbabilityArray = function (featArray, err, normalizeOnAvg) {
                            var res = new Float64Array(featArray.length);
                            var sum = _super.prototype.get.call(this, GaussianNode.INTERNAL_SUM_KEY);
                            var sumsquares = _super.prototype.get.call(this, GaussianNode.INTERNAL_SUMSQUARE_KEY);
                            var mnd = org.mwg.ml.common.matrix.operation.MultivariateNormalDistribution.getDistribution(sum, sumsquares, this.getTotal(), false);
                            if (mnd == null) {
                                return res;
                            }
                            else {
                                for (var i = 0; i < res.length; i++) {
                                    res[i] = mnd.density(featArray[i], normalizeOnAvg);
                                }
                                return res;
                            }
                        };
                        GaussianNode.prototype.getTotal = function () {
                            var x = _super.prototype.get.call(this, GaussianNode.INTERNAL_TOTAL_KEY);
                            if (x == null) {
                                return 0;
                            }
                            else {
                                return x;
                            }
                        };
                        GaussianNode.prototype.getAvg = function () {
                            var total = this.getTotal();
                            if (total == 0) {
                                return null;
                            }
                            if (total == 1) {
                                return _super.prototype.get.call(this, GaussianNode.INTERNAL_SUM_KEY);
                            }
                            else {
                                var avg = _super.prototype.get.call(this, GaussianNode.INTERNAL_SUM_KEY);
                                for (var i = 0; i < avg.length; i++) {
                                    avg[i] = avg[i] / total;
                                }
                                return avg;
                            }
                        };
                        GaussianNode.prototype.getCovarianceArray = function (avg, err) {
                            if (avg == null) {
                                var errClone = new Float64Array(err.length);
                                java.lang.System.arraycopy(err, 0, errClone, 0, err.length);
                                return errClone;
                            }
                            if (err == null) {
                                err = new Float64Array(avg.length);
                            }
                            var features = avg.length;
                            var total = this.getTotal();
                            if (total == 0) {
                                return null;
                            }
                            if (total > 1) {
                                var covariances = new Float64Array(features);
                                var sumsquares = _super.prototype.get.call(this, GaussianNode.INTERNAL_SUMSQUARE_KEY);
                                var correction = total;
                                correction = correction / (total - 1);
                                var count = 0;
                                for (var i = 0; i < features; i++) {
                                    covariances[i] = (sumsquares[count] / total - avg[i] * avg[i]) * correction;
                                    if (covariances[i] < err[i]) {
                                        covariances[i] = err[i];
                                    }
                                    count += features - i;
                                }
                                return covariances;
                            }
                            else {
                                var errClone = new Float64Array(err.length);
                                java.lang.System.arraycopy(err, 0, errClone, 0, err.length);
                                return errClone;
                            }
                        };
                        GaussianNode.prototype.getCovariance = function (avg, err) {
                            var features = avg.length;
                            var total = this.getTotal();
                            if (total == 0) {
                                return null;
                            }
                            if (err == null) {
                                err = new Float64Array(avg.length);
                            }
                            if (total > 1) {
                                var covariances = new Float64Array(features * features);
                                var sumsquares = _super.prototype.get.call(this, GaussianNode.INTERNAL_SUMSQUARE_KEY);
                                var correction = total;
                                correction = correction / (total - 1);
                                var count = 0;
                                for (var i = 0; i < features; i++) {
                                    for (var j = i; j < features; j++) {
                                        covariances[i * features + j] = (sumsquares[count] / total - avg[i] * avg[j]) * correction;
                                        covariances[j * features + i] = covariances[i * features + j];
                                        count++;
                                        if (covariances[i * features + i] < err[i]) {
                                            covariances[i * features + i] = err[i];
                                        }
                                    }
                                }
                                return new org.mwg.ml.common.matrix.Matrix(covariances, features, features);
                            }
                            else {
                                return null;
                            }
                        };
                        GaussianNode.prototype.getMin = function () {
                            var total = this.getTotal();
                            if (total == 0) {
                                return null;
                            }
                            if (total == 1) {
                                var min = _super.prototype.get.call(this, GaussianNode.INTERNAL_SUM_KEY);
                                return min;
                            }
                            else {
                                var min = _super.prototype.get.call(this, GaussianNode.INTERNAL_MIN_KEY);
                                return min;
                            }
                        };
                        GaussianNode.prototype.getMax = function () {
                            var total = this.getTotal();
                            if (total == 0) {
                                return null;
                            }
                            if (total == 1) {
                                var max = _super.prototype.get.call(this, GaussianNode.INTERNAL_SUM_KEY);
                                return max;
                            }
                            else {
                                var max = _super.prototype.get.call(this, GaussianNode.INTERNAL_MAX_KEY);
                                return max;
                            }
                        };
                        GaussianNode.distance = function (features, avg, precisions) {
                            var max = 0;
                            var temp;
                            for (var i = 0; i < features.length; i++) {
                                temp = (features[i] - avg[i]) * (features[i] - avg[i]) / precisions[i];
                                if (temp > max) {
                                    max = temp;
                                }
                            }
                            return Math.sqrt(max);
                        };
                        GaussianNode.NAME = "GaussianNode";
                        GaussianNode.MIN = "min";
                        GaussianNode.MAX = "max";
                        GaussianNode.AVG = "avg";
                        GaussianNode.COV = "cov";
                        GaussianNode.PRECISION = "_precision";
                        GaussianNode.INTERNAL_SUM_KEY = "_sum";
                        GaussianNode.INTERNAL_SUMSQUARE_KEY = "_sumSquare";
                        GaussianNode.INTERNAL_TOTAL_KEY = "_total";
                        GaussianNode.INTERNAL_MIN_KEY = "_min";
                        GaussianNode.INTERNAL_MAX_KEY = "_max";
                        return GaussianNode;
                    }(org.mwg.ml.AbstractMLNode));
                    profiling.GaussianNode = GaussianNode;
                    var GaussianSlotNode = (function (_super) {
                        __extends(GaussianSlotNode, _super);
                        function GaussianSlotNode(p_world, p_time, p_id, p_graph) {
                            _super.call(this, p_world, p_time, p_id, p_graph);
                        }
                        GaussianSlotNode.prototype.learn = function (callback) {
                            var _this = this;
                            this.extractFeatures(function (values) {
                                {
                                    _this.learnArray(values);
                                    callback(true);
                                }
                            });
                        };
                        GaussianSlotNode.timeSensitivity = function (currentTime, sensitivity) {
                            return Math.floor(currentTime / sensitivity) * sensitivity;
                        };
                        GaussianSlotNode.prototype.learnArray = function (values) {
                            var _this = this;
                            var insTime = this.time();
                            var periodSize = this.get(GaussianSlotNode.PERIOD_SIZE);
                            var newTime = new Float64Array([org.mwg.ml.algorithm.profiling.GaussianSlotNode.timeSensitivity(insTime, periodSize)]);
                            this.timepoints(org.mwg.Constants.BEGINNING_OF_TIME, org.mwg.Constants.END_OF_TIME, function (result) {
                                if (newTime[0] < result[0]) {
                                    newTime[0] = result[0];
                                }
                            });
                            this.jump(newTime[0], function (result) {
                                {
                                    var resolved = result.graph().resolver().resolveState(result);
                                    var numOfSlot = resolved.getFromKeyWithDefault(org.mwg.ml.algorithm.profiling.GaussianSlotNode.SLOTS_NUMBER, org.mwg.ml.algorithm.profiling.GaussianSlotNode.SLOTS_NUMBER_DEF);
                                    var total = void 0;
                                    var min = void 0;
                                    var max = void 0;
                                    var sum = void 0;
                                    var sumSquare = void 0;
                                    var features = values.length;
                                    total = resolved.getFromKey(org.mwg.ml.algorithm.profiling.GaussianSlotNode.INTERNAL_TOTAL_KEY);
                                    if (numOfSlot == 1 || numOfSlot == 0) {
                                        if (total == null) {
                                            resolved.setFromKey(org.mwg.ml.algorithm.profiling.GaussianSlotNode.INTERNAL_FEATURES_NUMBER, org.mwg.Type.INT, features);
                                            total = new Int32Array(1);
                                            min = new Float64Array(features);
                                            max = new Float64Array(features);
                                            sum = new Float64Array(features);
                                            sumSquare = new Float64Array(features * (features + 1) / 2);
                                        }
                                        else {
                                            min = resolved.getFromKey(org.mwg.ml.algorithm.profiling.GaussianSlotNode.INTERNAL_MIN_KEY);
                                            max = resolved.getFromKey(org.mwg.ml.algorithm.profiling.GaussianSlotNode.INTERNAL_MAX_KEY);
                                            sum = resolved.getFromKey(org.mwg.ml.algorithm.profiling.GaussianSlotNode.INTERNAL_SUM_KEY);
                                            sumSquare = resolved.getFromKey(org.mwg.ml.algorithm.profiling.GaussianSlotNode.INTERNAL_SUMSQUARE_KEY);
                                        }
                                        _this.update(total, min, max, sum, sumSquare, values, 0, features, 0, 0);
                                        return;
                                    }
                                    else {
                                        if (total == null) {
                                            resolved.setFromKey(org.mwg.ml.algorithm.profiling.GaussianSlotNode.INTERNAL_FEATURES_NUMBER, org.mwg.Type.INT, features);
                                            total = new Int32Array(numOfSlot + 1);
                                            min = new Float64Array((numOfSlot + 1) * features);
                                            max = new Float64Array((numOfSlot + 1) * features);
                                            sum = new Float64Array((numOfSlot + 1) * features);
                                            sumSquare = new Float64Array((numOfSlot + 1) * features * (features + 1) / 2);
                                        }
                                        else {
                                            min = resolved.getFromKey(org.mwg.ml.algorithm.profiling.GaussianSlotNode.INTERNAL_MIN_KEY);
                                            max = resolved.getFromKey(org.mwg.ml.algorithm.profiling.GaussianSlotNode.INTERNAL_MAX_KEY);
                                            sum = resolved.getFromKey(org.mwg.ml.algorithm.profiling.GaussianSlotNode.INTERNAL_SUM_KEY);
                                            sumSquare = resolved.getFromKey(org.mwg.ml.algorithm.profiling.GaussianSlotNode.INTERNAL_SUMSQUARE_KEY);
                                        }
                                        var periodSize_1 = resolved.getFromKeyWithDefault(org.mwg.ml.algorithm.profiling.GaussianSlotNode.PERIOD_SIZE, org.mwg.ml.algorithm.profiling.GaussianSlotNode.PERIOD_SIZE_DEF);
                                        var slot = org.mwg.ml.algorithm.profiling.GaussianSlotNode.getIntTime(insTime, numOfSlot, periodSize_1);
                                        var index = slot * features;
                                        var indexSquare = slot * features * (features + 1) / 2;
                                        var indexTot = numOfSlot * features;
                                        var indexSquareTot = numOfSlot * features * (features + 1) / 2;
                                        _this.update(total, min, max, sum, sumSquare, values, slot, features, index, indexSquare);
                                        _this.update(total, min, max, sum, sumSquare, values, numOfSlot, features, indexTot, indexSquareTot);
                                    }
                                    resolved.setFromKey(org.mwg.ml.algorithm.profiling.GaussianSlotNode.INTERNAL_FEATURES_NUMBER, org.mwg.Type.INT, features);
                                    resolved.setFromKey(org.mwg.ml.algorithm.profiling.GaussianSlotNode.INTERNAL_TOTAL_KEY, org.mwg.Type.INT_ARRAY, total);
                                    resolved.setFromKey(org.mwg.ml.algorithm.profiling.GaussianSlotNode.INTERNAL_MIN_KEY, org.mwg.Type.DOUBLE_ARRAY, min);
                                    resolved.setFromKey(org.mwg.ml.algorithm.profiling.GaussianSlotNode.INTERNAL_MAX_KEY, org.mwg.Type.DOUBLE_ARRAY, max);
                                    resolved.setFromKey(org.mwg.ml.algorithm.profiling.GaussianSlotNode.INTERNAL_SUM_KEY, org.mwg.Type.DOUBLE_ARRAY, sum);
                                    resolved.setFromKey(org.mwg.ml.algorithm.profiling.GaussianSlotNode.INTERNAL_SUMSQUARE_KEY, org.mwg.Type.DOUBLE_ARRAY, sumSquare);
                                }
                            });
                        };
                        GaussianSlotNode.prototype.predict = function (callback) {
                            var resolved = this.unphasedState();
                            var features = resolved.getFromKeyWithDefault(GaussianSlotNode.INTERNAL_FEATURES_NUMBER, 0);
                            if (features == 0) {
                                callback(null);
                                return;
                            }
                            var numOfSlot = resolved.getFromKeyWithDefault(GaussianSlotNode.SLOTS_NUMBER, GaussianSlotNode.SLOTS_NUMBER_DEF);
                            var periodSize = resolved.getFromKeyWithDefault(GaussianSlotNode.PERIOD_SIZE, GaussianSlotNode.PERIOD_SIZE_DEF);
                            var slot = org.mwg.ml.algorithm.profiling.GaussianSlotNode.getIntTime(this.time(), numOfSlot, periodSize);
                            var index = slot * features;
                            var total = resolved.getFromKey(GaussianSlotNode.INTERNAL_TOTAL_KEY);
                            var sum = resolved.getFromKey(GaussianSlotNode.INTERNAL_SUM_KEY);
                            var result = new Float64Array(features);
                            if (total != null) {
                                if (total[slot] != 0) {
                                    for (var j = 0; j < features; j++) {
                                        result[j] = sum[j + index] / total[slot];
                                    }
                                }
                            }
                            callback(result);
                        };
                        GaussianSlotNode.prototype.setProperty = function (propertyName, propertyType, propertyValue) {
                            GaussianSlotNode.enforcer.check(propertyName, propertyType, propertyValue);
                            _super.prototype.setProperty.call(this, propertyName, propertyType, propertyValue);
                        };
                        GaussianSlotNode.prototype.get = function (attributeName) {
                            var state = this._resolver.resolveState(this);
                            if (attributeName === GaussianSlotNode.SLOTS_NUMBER) {
                                return state.getFromKeyWithDefault(GaussianSlotNode.SLOTS_NUMBER, GaussianSlotNode.SLOTS_NUMBER_DEF);
                            }
                            else if (attributeName === GaussianSlotNode.PERIOD_SIZE) {
                                return state.getFromKeyWithDefault(GaussianSlotNode.PERIOD_SIZE, GaussianSlotNode.PERIOD_SIZE_DEF);
                            }
                            else {
                                return _super.prototype.get.call(this, attributeName);
                            }
                        };
                        GaussianSlotNode.getIntTime = function (time, numOfSlot, periodSize) {
                            if (numOfSlot <= 1) {
                                return 0;
                            }
                            var res = time % periodSize;
                            res = res / (periodSize / numOfSlot);
                            return res;
                        };
                        GaussianSlotNode.prototype.update = function (total, min, max, sum, sumSquare, values, slot, features, index, indexSquare) {
                            if (total[slot] == 1) {
                                var count = 0;
                                for (var i = 0; i < features; i++) {
                                    min[index + i] = values[i];
                                    max[index + i] = values[i];
                                    sum[index + i] = values[i];
                                    for (var j = i; j < features; j++) {
                                        sumSquare[indexSquare + count] += values[i] * values[j];
                                        count++;
                                    }
                                }
                            }
                            else {
                                var count = 0;
                                for (var i = 0; i < features; i++) {
                                    if (values[i] < min[index + i]) {
                                        min[index + i] = values[i];
                                    }
                                    if (values[i] > max[index + i]) {
                                        max[index + i] = values[i];
                                    }
                                    sum[index + i] += values[i];
                                    for (var j = i; j < features; j++) {
                                        sumSquare[indexSquare + count] += values[i] * values[j];
                                        count++;
                                    }
                                }
                            }
                            total[slot] += 1;
                        };
                        GaussianSlotNode.prototype.getMin = function () {
                            return this.unphasedState().getFromKey(GaussianSlotNode.INTERNAL_MIN_KEY);
                        };
                        GaussianSlotNode.prototype.getMax = function () {
                            return this.unphasedState().getFromKey(GaussianSlotNode.INTERNAL_MAX_KEY);
                        };
                        GaussianSlotNode.prototype.getSum = function () {
                            return this.unphasedState().getFromKey(GaussianSlotNode.INTERNAL_SUM_KEY);
                        };
                        GaussianSlotNode.prototype.getSumSquare = function () {
                            return this.unphasedState().getFromKey(GaussianSlotNode.INTERNAL_SUMSQUARE_KEY);
                        };
                        GaussianSlotNode.prototype.getTotal = function () {
                            return this.unphasedState().getFromKey(GaussianSlotNode.INTERNAL_TOTAL_KEY);
                        };
                        GaussianSlotNode.prototype.getAvg = function () {
                            var resolved = this.unphasedState();
                            var numOfSlot = resolved.getFromKeyWithDefault(GaussianSlotNode.SLOTS_NUMBER, GaussianSlotNode.SLOTS_NUMBER_DEF);
                            var features = resolved.getFromKeyWithDefault(GaussianSlotNode.INTERNAL_FEATURES_NUMBER, 0);
                            if (features == 0) {
                                return null;
                            }
                            var total = resolved.getFromKey(GaussianSlotNode.INTERNAL_TOTAL_KEY);
                            var sum = resolved.getFromKey(GaussianSlotNode.INTERNAL_SUM_KEY);
                            var result = new Float64Array(sum.length);
                            if (total != null) {
                                if (numOfSlot > 1) {
                                    var count = 0;
                                    for (var i = 0; i < (numOfSlot + 1); i++) {
                                        if (total[i] != 0) {
                                            for (var j = 0; j < features; j++) {
                                                result[count] = sum[count] / total[i];
                                                count++;
                                            }
                                        }
                                        else {
                                            count += features;
                                        }
                                    }
                                }
                                else {
                                    if (total[0] != 0) {
                                        for (var j = 0; j < features; j++) {
                                            result[j] = sum[j] / total[0];
                                        }
                                    }
                                }
                            }
                            return result;
                        };
                        GaussianSlotNode.NAME = "GaussianSlotProfiling";
                        GaussianSlotNode.SLOTS_NUMBER = "SLOTS_NUMBER";
                        GaussianSlotNode.SLOTS_NUMBER_DEF = 1;
                        GaussianSlotNode.PERIOD_SIZE = "PERIOD_SIZE";
                        GaussianSlotNode.PERIOD_SIZE_DEF = 24 * 3600 * 1000;
                        GaussianSlotNode.INTERNAL_FEATURES_NUMBER = "_featuresNb";
                        GaussianSlotNode.INTERNAL_TOTAL_KEY = "_total";
                        GaussianSlotNode.INTERNAL_MIN_KEY = "_min";
                        GaussianSlotNode.INTERNAL_MAX_KEY = "_max";
                        GaussianSlotNode.INTERNAL_SUM_KEY = "_sum";
                        GaussianSlotNode.INTERNAL_SUMSQUARE_KEY = "_sumSquare";
                        GaussianSlotNode.enforcer = new org.mwg.utility.Enforcer().asPositiveInt(GaussianSlotNode.SLOTS_NUMBER).asPositiveLong(GaussianSlotNode.PERIOD_SIZE);
                        return GaussianSlotNode;
                    }(org.mwg.ml.AbstractMLNode));
                    profiling.GaussianSlotNode = GaussianSlotNode;
                    var GaussianTreeNode = (function (_super) {
                        __extends(GaussianTreeNode, _super);
                        function GaussianTreeNode(p_world, p_time, p_id, p_graph) {
                            _super.call(this, p_world, p_time, p_id, p_graph);
                        }
                        GaussianTreeNode.prototype.learn = function (callback) {
                            var _this = this;
                            this.extractFeatures(function (values) {
                                {
                                    var features = new Float64Array(values.length - 1);
                                    java.lang.System.arraycopy(values, 0, features, 0, values.length - 1);
                                    _this.internalLearn(values, features, callback);
                                }
                            });
                        };
                        GaussianTreeNode.prototype.internalLearn = function (values, features, callback) {
                            var _this = this;
                            var resolved = this._resolver.alignState(this);
                            _super.prototype.learnVector.call(this, values, function (result) {
                                {
                                    var threshold_1 = resolved.getFromKeyWithDefault(org.mwg.ml.algorithm.profiling.GaussianTreeNode.THRESHOLD, org.mwg.ml.algorithm.profiling.GaussianTreeNode.THRESHOLD_DEF);
                                    var precisions = resolved.getFromKey(org.mwg.ml.algorithm.profiling.GaussianNode.PRECISION);
                                    if (resolved.getFromKey(org.mwg.ml.algorithm.profiling.GaussianTreeNode.INTERNAL_KDROOT) == null) {
                                        var root_1 = _this.graph().newTypedNode(_this.world(), _this.time(), org.mwg.structure.tree.KDTree.NAME);
                                        root_1.setProperty(org.mwg.structure.tree.KDTree.DISTANCE_THRESHOLD, org.mwg.Type.DOUBLE, threshold_1);
                                        _this.add(org.mwg.ml.algorithm.profiling.GaussianTreeNode.INTERNAL_KDROOT, root_1);
                                        var profile_1 = _this.graph().newTypedNode(_this.world(), _this.time(), org.mwg.ml.algorithm.profiling.GaussianNode.NAME);
                                        profile_1.learnVector(values, function (result) {
                                            {
                                                root_1.insertWith(features, profile_1, function (result) {
                                                    {
                                                        root_1.free();
                                                        profile_1.free();
                                                        if (callback != null) {
                                                            callback(true);
                                                        }
                                                    }
                                                });
                                            }
                                        });
                                    }
                                    else {
                                        _this.rel(org.mwg.ml.algorithm.profiling.GaussianTreeNode.INTERNAL_KDROOT, function (result) {
                                            {
                                                var root_2 = result[0];
                                                root_2.nearestNWithinRadius(features, 1, threshold_1, function (result) {
                                                    {
                                                        if (result != null && result.length > 0) {
                                                            var profile_2 = result[0];
                                                            profile_2.learnVector(values, function (result) {
                                                                {
                                                                    root_2.free();
                                                                    profile_2.free();
                                                                    if (callback != null) {
                                                                        callback(true);
                                                                    }
                                                                }
                                                            });
                                                        }
                                                        else {
                                                            var profile_3 = _this.graph().newTypedNode(_this.world(), _this.time(), org.mwg.ml.algorithm.profiling.GaussianNode.NAME);
                                                            profile_3.learnVector(values, function (result) {
                                                                {
                                                                    root_2.insertWith(features, profile_3, function (result) {
                                                                        {
                                                                            root_2.free();
                                                                            profile_3.free();
                                                                            if (callback != null) {
                                                                                callback(true);
                                                                            }
                                                                        }
                                                                    });
                                                                }
                                                            });
                                                        }
                                                    }
                                                });
                                            }
                                        });
                                    }
                                }
                            });
                        };
                        GaussianTreeNode.prototype.getNumNodes = function () {
                            var res = new Int32Array(1);
                            this.rel(GaussianTreeNode.INTERNAL_KDROOT, function (result) {
                                {
                                    if (result == null || result.length == 0) {
                                        res[0] = 0;
                                    }
                                    else {
                                        var root = result[0];
                                        res[0] = root.get(org.mwg.structure.tree.KDTree.SIZE);
                                    }
                                }
                            });
                            return res[0];
                        };
                        GaussianTreeNode.prototype.predict = function (callback) { };
                        GaussianTreeNode.prototype.predictValue = function (values, callback) {
                            var _this = this;
                            if (callback == null) {
                                return;
                            }
                            var features = new Float64Array(values.length - 1);
                            java.lang.System.arraycopy(values, 0, features, 0, values.length - 1);
                            var resolved = this._resolver.resolveState(this);
                            if (resolved.getFromKey(GaussianTreeNode.INTERNAL_KDROOT) == null) {
                                callback(null);
                            }
                            var threshold = resolved.getFromKeyWithDefault(GaussianTreeNode.THRESHOLD, GaussianTreeNode.THRESHOLD_DEF);
                            this.rel(GaussianTreeNode.INTERNAL_KDROOT, function (result) {
                                {
                                    var root_3 = result[0];
                                    root_3.nearestNWithinRadius(features, 1, threshold, function (result) {
                                        {
                                            if (result != null && result.length > 0) {
                                                var profile = result[0];
                                                var avg = profile.getAvg();
                                                var res = avg[avg.length - 1];
                                                profile.free();
                                                root_3.free();
                                                callback(res);
                                            }
                                            else {
                                                var avg = _this.getAvg();
                                                var res = avg[avg.length - 1];
                                                root_3.free();
                                                callback(res);
                                            }
                                        }
                                    });
                                }
                            });
                        };
                        GaussianTreeNode.NAME = "GaussianTreeNode";
                        GaussianTreeNode.THRESHOLD = "_threshold";
                        GaussianTreeNode.THRESHOLD_DEF = 1.01;
                        GaussianTreeNode.INTERNAL_KDROOT = "kdroot";
                        return GaussianTreeNode;
                    }(org.mwg.ml.algorithm.profiling.GaussianNode));
                    profiling.GaussianTreeNode = GaussianTreeNode;
                    var KMeans = (function () {
                        function KMeans() {
                        }
                        KMeans.prototype.getClusterIds = function (data, numOfCluster, numOfIterations, div) {
                            var result = new Array(numOfCluster);
                            var features = data[0].length;
                            var totals = new Int32Array(numOfCluster);
                            var centroids = new Array(numOfCluster);
                            for (var i = 0; i < numOfCluster; i++) {
                                centroids[i] = new Float64Array(features);
                            }
                            var categories = new Int32Array(data.length);
                            for (var i = 0; i < numOfCluster; i++) {
                                java.lang.System.arraycopy(data[i], 0, centroids[i], 0, features);
                            }
                            for (var iter = 0; iter < numOfIterations; iter++) {
                                for (var i = 0; i < totals.length; i++) {
                                    totals[i] = 0;
                                }
                                for (var i = 0; i < data.length; i++) {
                                    categories[i] = this.calculateCategory(data[i], centroids, div);
                                    totals[categories[i]]++;
                                }
                                for (var i = 0; i < centroids.length; i++) {
                                    for (var j = 0; j < features; j++) {
                                        centroids[i][j] = 0;
                                    }
                                }
                                for (var i = 0; i < data.length; i++) {
                                    for (var j = 0; j < features; j++) {
                                        centroids[categories[i]][j] += data[i][j];
                                    }
                                }
                                for (var i = 0; i < centroids.length; i++) {
                                    if (totals[i] != 0) {
                                        for (var j = 0; j < features; j++) {
                                            centroids[i][j] = centroids[i][j] / totals[i];
                                        }
                                    }
                                    else {
                                        var rand = new java.util.Random();
                                        var avg = data[rand.nextInt(data.length)];
                                        java.lang.System.arraycopy(avg, 0, centroids[i], 0, features);
                                    }
                                }
                            }
                            for (var i = 0; i < numOfCluster; i++) {
                                result[i] = new Int32Array(totals[i]);
                                var k = 0;
                                for (var j = 0; j < data.length; j++) {
                                    if (categories[j] == i) {
                                        result[i][k] = j;
                                        k++;
                                    }
                                }
                            }
                            return result;
                        };
                        KMeans.prototype.calculateCategory = function (values, centroids, div) {
                            var min = java.lang.Double.MAX_VALUE;
                            var pos = 0;
                            for (var i = 0; i < centroids.length; i++) {
                                var d = org.mwg.ml.algorithm.profiling.KMeans.distance(values, centroids[i], div);
                                if (d < min) {
                                    min = d;
                                    pos = i;
                                }
                            }
                            return pos;
                        };
                        KMeans.distance = function (features, avg, precisions) {
                            var max = 0;
                            var temp;
                            for (var i = 0; i < features.length; i++) {
                                temp = (features[i] - avg[i]) * (features[i] - avg[i]) / precisions[i];
                                if (temp > max) {
                                    max = temp;
                                }
                            }
                            return Math.sqrt(max);
                        };
                        return KMeans;
                    }());
                    profiling.KMeans = KMeans;
                    var ProbaDistribution = (function () {
                        function ProbaDistribution(total, distributions, global) {
                            this.total = total;
                            this.distributions = distributions;
                            this.global = global;
                        }
                        ProbaDistribution.prototype.calculate = function (features) {
                            var result = 0;
                            if (this.total != null) {
                                for (var j = 0; j < this.distributions.length; j++) {
                                    if (org.mwg.ml.algorithm.profiling.KMeans.distance(features, this.distributions[j].getAvg(), this.distributions[j].getCovDiag()) < 5) {
                                        result += this.distributions[j].density(features, false) * this.total[j] / this.global;
                                    }
                                }
                            }
                            else {
                                for (var j = 0; j < this.distributions.length; j++) {
                                    if (org.mwg.ml.algorithm.profiling.KMeans.distance(features, this.distributions[j].getAvg(), this.distributions[j].getCovDiag()) < 5) {
                                        result += this.distributions[j].density(features, false) / this.global;
                                    }
                                }
                            }
                            if (result > 1) {
                                result = 1;
                            }
                            return result;
                        };
                        ProbaDistribution.prototype.calculateArray = function (features, reporter) {
                            if (reporter != null) {
                                reporter.updateInformation("Number of distributions: " + this.distributions.length + " , values: " + this.global);
                            }
                            var result = new Float64Array(features.length);
                            var calibration = 0;
                            for (var i = 0; i < features.length; i++) {
                                result[i] = this.calculate(features[i]);
                                calibration += result[i];
                                if (reporter != null) {
                                    var progress = i * (1.0 / (features.length));
                                    progress = progress * 50 + 50;
                                    reporter.updateProgress(progress);
                                    if (reporter.isCancelled()) {
                                        return null;
                                    }
                                }
                            }
                            if (calibration != 0) {
                                for (var i = 0; i < features.length; i++) {
                                    result[i] = result[i] / calibration;
                                }
                            }
                            return result;
                        };
                        ProbaDistribution.prototype.addUpProbabilities = function (features) {
                            var res = 0;
                            for (var i = 0; i < features.length; i++) {
                                res += this.calculate(features[i]);
                            }
                            return res;
                        };
                        ProbaDistribution.prototype.compareProbaDistribution = function (other, features) {
                            var error = new Float64Array(2);
                            var res1 = this.calculateArray(features, null);
                            var res2 = other.calculateArray(features, null);
                            var temp = 0;
                            for (var i = 0; i < res1.length; i++) {
                                temp = Math.abs(res1[i] - res2[i]);
                                error[0] += temp;
                                if (temp > error[1]) {
                                    error[1] = temp;
                                }
                            }
                            error[0] = error[0] / res1.length;
                            return error;
                        };
                        return ProbaDistribution;
                    }());
                    profiling.ProbaDistribution = ProbaDistribution;
                })(profiling = algorithm.profiling || (algorithm.profiling = {}));
                var regression;
                (function (regression) {
                    var LiveLinearRegressionNode = (function (_super) {
                        __extends(LiveLinearRegressionNode, _super);
                        function LiveLinearRegressionNode(p_world, p_time, p_id, p_graph) {
                            _super.call(this, p_world, p_time, p_id, p_graph);
                        }
                        LiveLinearRegressionNode.prototype.learn = function (output, callback) {
                            var _this = this;
                            this.extractFeatures(function (input) {
                                {
                                    _this.internalLearn(input, output, callback);
                                }
                            });
                        };
                        LiveLinearRegressionNode.prototype.internalLearn = function (input, output, callback) {
                            var state = this._resolver.alignState(this);
                            var iterations = state.getFromKeyWithDefault(LiveLinearRegressionNode.ITERATION_KEY, LiveLinearRegressionNode.ITERATION_DEF);
                            var alpha = state.getFromKeyWithDefault(LiveLinearRegressionNode.ALPHA_KEY, LiveLinearRegressionNode.ALPHA_DEF);
                            var lambda = state.getFromKeyWithDefault(LiveLinearRegressionNode.LAMBDA_KEY, LiveLinearRegressionNode.LAMBDA_DEF);
                            var weights = state.getFromKey(LiveLinearRegressionNode.WEIGHT_KEY);
                            if (weights == null) {
                                weights = new Float64Array(input.length + 1);
                                var random = new java.util.Random();
                                for (var i = 0; i < weights.length; i++) {
                                    weights[i] = random.nextDouble() * 0.001;
                                }
                            }
                            var prevErr = state.getFromKeyWithDefault(LiveLinearRegressionNode.LAST_ERR_KEY, 0.0);
                            var currErr = this.calculate(weights, input) - output;
                            state.setFromKey(LiveLinearRegressionNode.LAST_ERR_KEY, org.mwg.Type.DOUBLE, currErr);
                            if (input == null || weights.length != (input.length + 1)) {
                                throw new Error(LiveLinearRegressionNode.MISMATCH_MSG);
                            }
                            var featuresize = input.length;
                            for (var j = 0; j < iterations; j++) {
                                var h = this.calculate(weights, input) - output;
                                for (var i = 0; i < featuresize; i++) {
                                    weights[i] = weights[i] - alpha * (h * input[i] + lambda * weights[i]);
                                }
                                weights[featuresize] = weights[featuresize] - alpha * h;
                            }
                            var bckupWeight = state.getFromKey(LiveLinearRegressionNode.INTERNAL_WEIGHT_BACKUP_KEY);
                            if (bckupWeight == null) {
                                state.setFromKey(LiveLinearRegressionNode.WEIGHT_KEY, org.mwg.Type.DOUBLE_ARRAY, weights);
                                state.setFromKey(LiveLinearRegressionNode.INTERNAL_WEIGHT_BACKUP_KEY, org.mwg.Type.DOUBLE_ARRAY, weights);
                                state.setFromKey(LiveLinearRegressionNode.INTERNAL_TOTAL_KEY, org.mwg.Type.INT, 1);
                            }
                            else {
                                var diff = 0;
                                for (var i = 0; i < weights.length; i++) {
                                    diff = Math.max(diff, Math.abs(weights[i] - bckupWeight[i]));
                                }
                                var deviation = state.getFromKeyWithDefault(LiveLinearRegressionNode.THRESHOLD_KEY, LiveLinearRegressionNode.THRESHOLD_DEF);
                                if (diff > deviation) {
                                    state = this.phasedState();
                                    state.setFromKey(LiveLinearRegressionNode.WEIGHT_KEY, org.mwg.Type.DOUBLE_ARRAY, weights);
                                    state.setFromKey(LiveLinearRegressionNode.INTERNAL_WEIGHT_BACKUP_KEY, org.mwg.Type.DOUBLE_ARRAY, weights);
                                    state.setFromKey(LiveLinearRegressionNode.INTERNAL_TOTAL_KEY, org.mwg.Type.INT, 1);
                                }
                                else {
                                    state.setFromKey(LiveLinearRegressionNode.WEIGHT_KEY, org.mwg.Type.DOUBLE_ARRAY, weights);
                                    state.setFromKey(LiveLinearRegressionNode.INTERNAL_TOTAL_KEY, org.mwg.Type.INT, state.getFromKey(LiveLinearRegressionNode.INTERNAL_TOTAL_KEY) + 1);
                                }
                            }
                            if (callback != null) {
                                callback(true);
                            }
                        };
                        LiveLinearRegressionNode.prototype.setProperty = function (propertyName, propertyType, propertyValue) {
                            LiveLinearRegressionNode.enforcer.check(propertyName, propertyType, propertyValue);
                            _super.prototype.setProperty.call(this, propertyName, propertyType, propertyValue);
                        };
                        LiveLinearRegressionNode.prototype.calculate = function (weights, input) {
                            var h = 0;
                            for (var j = 0; j < input.length; j++) {
                                h += weights[j] * input[j];
                            }
                            h += weights[input.length];
                            return h;
                        };
                        LiveLinearRegressionNode.prototype.extrapolate = function (callback) {
                            var _this = this;
                            var state = this._resolver.resolveState(this);
                            var weights = state.getFromKey(LiveLinearRegressionNode.WEIGHT_KEY);
                            if (weights == null) {
                                if (callback != null) {
                                    callback(0.0);
                                }
                            }
                            else {
                                this.extractFeatures(function (input) {
                                    {
                                        if (input.length != weights.length - 1) {
                                            throw new Error(org.mwg.ml.algorithm.regression.LiveLinearRegressionNode.MISMATCH_MSG);
                                        }
                                        else if (callback != null) {
                                            callback(_this.calculate(weights, input));
                                        }
                                    }
                                });
                            }
                        };
                        LiveLinearRegressionNode.ALPHA_KEY = "ALPHA";
                        LiveLinearRegressionNode.ALPHA_DEF = 0.0001;
                        LiveLinearRegressionNode.LAMBDA_KEY = "LAMBDA";
                        LiveLinearRegressionNode.LAMBDA_DEF = 0.00001;
                        LiveLinearRegressionNode.ITERATION_KEY = "ITERATION";
                        LiveLinearRegressionNode.ITERATION_DEF = 5;
                        LiveLinearRegressionNode.THRESHOLD_KEY = "THRESHOLD";
                        LiveLinearRegressionNode.THRESHOLD_DEF = 0.01;
                        LiveLinearRegressionNode.LAST_ERR_KEY = "_ERR";
                        LiveLinearRegressionNode.WEIGHT_KEY = "_WEIGHT";
                        LiveLinearRegressionNode.INTERNAL_TOTAL_KEY = "_TOTAL_KEY";
                        LiveLinearRegressionNode.INTERNAL_WEIGHT_BACKUP_KEY = "_WEIGHTBACKUP";
                        LiveLinearRegressionNode.MISMATCH_MSG = "Different Imput lengths are not supported";
                        LiveLinearRegressionNode.NAME = "LiveLinearRegression";
                        LiveLinearRegressionNode.enforcer = new org.mwg.utility.Enforcer().asDouble(LiveLinearRegressionNode.ALPHA_KEY).asDouble(LiveLinearRegressionNode.LAMBDA_KEY).asInt(LiveLinearRegressionNode.ITERATION_KEY);
                        return LiveLinearRegressionNode;
                    }(org.mwg.ml.AbstractMLNode));
                    regression.LiveLinearRegressionNode = LiveLinearRegressionNode;
                    var PolynomialNode = (function (_super) {
                        __extends(PolynomialNode, _super);
                        function PolynomialNode(p_world, p_time, p_id, p_graph) {
                            _super.call(this, p_world, p_time, p_id, p_graph);
                        }
                        PolynomialNode.prototype.setProperty = function (propertyName, propertyType, propertyValue) {
                            if (propertyName === PolynomialNode.VALUE) {
                                this.learn(parseFloat(propertyValue.toString()), null);
                            }
                            else if (propertyName === PolynomialNode.PRECISION) {
                                PolynomialNode.enforcer.check(propertyName, propertyType, propertyValue);
                                _super.prototype.setProperty.call(this, propertyName, propertyType, propertyValue);
                            }
                            else {
                                throw new Error(PolynomialNode.NOT_MANAGED_ATT_ERROR);
                            }
                        };
                        PolynomialNode.prototype.get = function (propertyName) {
                            if (propertyName === PolynomialNode.VALUE) {
                                var res_1 = [null];
                                this.extrapolate(function (result) {
                                    {
                                        res_1[0] = result;
                                    }
                                });
                                return res_1[0];
                            }
                            else {
                                return _super.prototype.get.call(this, propertyName);
                            }
                        };
                        PolynomialNode.prototype.learn = function (value, callback) {
                            var previousState = this.unphasedState();
                            var timeOrigin = previousState.time();
                            var nodeTime = this.time();
                            var precision = previousState.getFromKeyWithDefault(PolynomialNode.PRECISION, PolynomialNode.PRECISION_DEF);
                            var weight = previousState.getFromKey(PolynomialNode.INTERNAL_WEIGHT_KEY);
                            if (weight == null) {
                                weight = new Float64Array(1);
                                weight[0] = value;
                                previousState.setFromKey(PolynomialNode.INTERNAL_WEIGHT_KEY, org.mwg.Type.DOUBLE_ARRAY, weight);
                                previousState.setFromKey(PolynomialNode.INTERNAL_NB_PAST_KEY, org.mwg.Type.INT, 1);
                                previousState.setFromKey(PolynomialNode.INTERNAL_STEP_KEY, org.mwg.Type.LONG, 0);
                                previousState.setFromKey(PolynomialNode.INTERNAL_LAST_TIME_KEY, org.mwg.Type.LONG, 0);
                                previousState.setFromKey(PolynomialNode.INTERNAL_TIME_BUFFER, org.mwg.Type.DOUBLE_ARRAY, new Float64Array([0]));
                                previousState.setFromKey(PolynomialNode.INTERNAL_VALUES_BUFFER, org.mwg.Type.DOUBLE_ARRAY, new Float64Array([value]));
                                if (callback != null) {
                                    callback(true);
                                }
                                return;
                            }
                            var previousTime = timeOrigin + previousState.getFromKey(PolynomialNode.INTERNAL_LAST_TIME_KEY);
                            if (nodeTime > previousTime) {
                                var stp = previousState.getFromKey(PolynomialNode.INTERNAL_STEP_KEY);
                                var lastTime = nodeTime - timeOrigin;
                                if (stp == null || stp == 0) {
                                    if (lastTime == 0) {
                                        weight = new Float64Array(1);
                                        weight[0] = value;
                                        previousState.setFromKey(PolynomialNode.INTERNAL_WEIGHT_KEY, org.mwg.Type.DOUBLE_ARRAY, weight);
                                        previousState.setFromKey(PolynomialNode.INTERNAL_TIME_BUFFER, org.mwg.Type.DOUBLE_ARRAY, new Float64Array([0]));
                                        previousState.setFromKey(PolynomialNode.INTERNAL_VALUES_BUFFER, org.mwg.Type.DOUBLE_ARRAY, new Float64Array([value]));
                                        if (callback != null) {
                                            callback(true);
                                        }
                                        return;
                                    }
                                    else {
                                        stp = lastTime;
                                        previousState.setFromKey(PolynomialNode.INTERNAL_STEP_KEY, org.mwg.Type.LONG, stp);
                                    }
                                }
                                var deg = weight.length - 1;
                                var num = previousState.getFromKey(PolynomialNode.INTERNAL_NB_PAST_KEY);
                                var t = (nodeTime - timeOrigin);
                                t = t / stp;
                                var maxError = this.maxErr(precision, deg);
                                var maxd = previousState.getFromKeyWithDefault(PolynomialNode.MAX_DEGREE, PolynomialNode.MAX_DEGREE_DEF);
                                var times = org.mwg.ml.algorithm.regression.PolynomialNode.updateBuffer(previousState, t, maxd, PolynomialNode.INTERNAL_TIME_BUFFER);
                                var values = org.mwg.ml.algorithm.regression.PolynomialNode.updateBuffer(previousState, value, maxd, PolynomialNode.INTERNAL_VALUES_BUFFER);
                                if (Math.abs(org.mwg.ml.common.matrix.operation.PolynomialFit.extrapolate(t, weight) - value) <= maxError) {
                                    previousState.setFromKey(PolynomialNode.INTERNAL_NB_PAST_KEY, org.mwg.Type.INT, num + 1);
                                    previousState.setFromKey(PolynomialNode.INTERNAL_LAST_TIME_KEY, org.mwg.Type.LONG, lastTime);
                                    if (callback != null) {
                                        callback(true);
                                    }
                                    return;
                                }
                                var newdeg = Math.min(times.length, maxd);
                                while (deg < newdeg && times.length < maxd * 4) {
                                    maxError = this.maxErr(precision, deg);
                                    var pf = new org.mwg.ml.common.matrix.operation.PolynomialFit(deg);
                                    pf.fit(times, values);
                                    if (this.tempError(pf.getCoef(), times, values) <= maxError) {
                                        weight = pf.getCoef();
                                        previousState.setFromKey(PolynomialNode.INTERNAL_NB_PAST_KEY, org.mwg.Type.INT, num + 1);
                                        previousState.setFromKey(PolynomialNode.INTERNAL_WEIGHT_KEY, org.mwg.Type.DOUBLE_ARRAY, weight);
                                        previousState.setFromKey(PolynomialNode.INTERNAL_LAST_TIME_KEY, org.mwg.Type.LONG, lastTime);
                                        if (callback != null) {
                                            callback(true);
                                        }
                                        return;
                                    }
                                    deg++;
                                }
                                var newstep = nodeTime - previousTime;
                                var phasedState = this.newState(previousTime);
                                var nvalues = new Float64Array(2);
                                var ntimes = new Float64Array(2);
                                ntimes[0] = 0;
                                ntimes[1] = 1;
                                nvalues[0] = values[values.length - 2];
                                nvalues[1] = value;
                                maxError = this.maxErr(precision, 0);
                                if (Math.abs(nvalues[1] - nvalues[0]) <= maxError) {
                                    weight = new Float64Array(1);
                                    weight[0] = nvalues[0];
                                }
                                else {
                                    weight = new Float64Array(2);
                                    weight[0] = nvalues[0];
                                    weight[1] = nvalues[1] - nvalues[0];
                                }
                                previousState.setFromKey(PolynomialNode.INTERNAL_TIME_BUFFER, org.mwg.Type.DOUBLE_ARRAY, null);
                                previousState.setFromKey(PolynomialNode.INTERNAL_VALUES_BUFFER, org.mwg.Type.DOUBLE_ARRAY, null);
                                phasedState.setFromKey(PolynomialNode.INTERNAL_TIME_BUFFER, org.mwg.Type.DOUBLE_ARRAY, ntimes);
                                phasedState.setFromKey(PolynomialNode.INTERNAL_VALUES_BUFFER, org.mwg.Type.DOUBLE_ARRAY, nvalues);
                                phasedState.setFromKey(PolynomialNode.PRECISION, org.mwg.Type.DOUBLE, precision);
                                phasedState.setFromKey(PolynomialNode.MAX_DEGREE, org.mwg.Type.INT, maxd);
                                phasedState.setFromKey(PolynomialNode.INTERNAL_WEIGHT_KEY, org.mwg.Type.DOUBLE_ARRAY, weight);
                                phasedState.setFromKey(PolynomialNode.INTERNAL_NB_PAST_KEY, org.mwg.Type.INT, 2);
                                phasedState.setFromKey(PolynomialNode.INTERNAL_STEP_KEY, org.mwg.Type.LONG, newstep);
                                phasedState.setFromKey(PolynomialNode.INTERNAL_LAST_TIME_KEY, org.mwg.Type.LONG, newstep);
                                if (callback != null) {
                                    callback(true);
                                }
                                return;
                            }
                            else {
                            }
                            if (callback != null) {
                                callback(false);
                            }
                        };
                        PolynomialNode.updateBuffer = function (state, t, maxdeg, key) {
                            var ts = state.getFromKey(key);
                            if (ts == null) {
                                ts = new Float64Array(1);
                                ts[0] = t;
                                state.setFromKey(key, org.mwg.Type.DOUBLE_ARRAY, ts);
                                return ts;
                            }
                            else if (ts.length < maxdeg * 4) {
                                var nts = new Float64Array(ts.length + 1);
                                java.lang.System.arraycopy(ts, 0, nts, 0, ts.length);
                                nts[ts.length] = t;
                                state.setFromKey(key, org.mwg.Type.DOUBLE_ARRAY, nts);
                                return nts;
                            }
                            else {
                                var nts = new Float64Array(ts.length);
                                java.lang.System.arraycopy(ts, 1, nts, 0, ts.length - 1);
                                nts[ts.length - 1] = t;
                                state.setFromKey(key, org.mwg.Type.DOUBLE_ARRAY, nts);
                                return nts;
                            }
                        };
                        PolynomialNode.prototype.extrapolate = function (callback) {
                            var time = this.time();
                            var state = this.unphasedState();
                            var timeOrigin = state.time();
                            var weight = state.getFromKey(PolynomialNode.INTERNAL_WEIGHT_KEY);
                            if (weight == null) {
                                if (callback != null) {
                                    callback(0.0);
                                }
                                return;
                            }
                            var inferSTEP = state.getFromKey(PolynomialNode.INTERNAL_STEP_KEY);
                            if (inferSTEP == null || inferSTEP == 0) {
                                if (callback != null) {
                                    callback(weight[0]);
                                }
                                return;
                            }
                            var t = (time - timeOrigin);
                            var lastTime = state.getFromKey(PolynomialNode.INTERNAL_LAST_TIME_KEY);
                            if (t > lastTime) {
                                t = lastTime;
                            }
                            t = t / inferSTEP;
                            if (callback != null) {
                                callback(org.mwg.ml.common.matrix.operation.PolynomialFit.extrapolate(t, weight));
                            }
                        };
                        PolynomialNode.prototype.maxErr = function (precision, degree) {
                            return precision / Math.pow(2, degree + 1);
                        };
                        PolynomialNode.prototype.tempError = function (computedWeights, times, values) {
                            var maxErr = 0;
                            var temp;
                            for (var i = 0; i < times.length; i++) {
                                temp = Math.abs(values[i] - org.mwg.ml.common.matrix.operation.PolynomialFit.extrapolate(times[i], computedWeights));
                                if (temp > maxErr) {
                                    maxErr = temp;
                                }
                            }
                            return maxErr;
                        };
                        PolynomialNode.prototype.toString = function () {
                            var builder = new java.lang.StringBuilder();
                            builder.append("{\"world\":");
                            builder.append(this.world());
                            builder.append(",\"time\":");
                            builder.append(this.time());
                            builder.append(",\"id\":");
                            builder.append(this.id());
                            var state = this._resolver.resolveState(this);
                            if (state != null) {
                                var weight = state.getFromKey(PolynomialNode.INTERNAL_WEIGHT_KEY);
                                if (weight != null) {
                                    builder.append("\"polynomial\":\"");
                                    for (var i = 0; i < weight.length; i++) {
                                        if (i != 0) {
                                            builder.append("+(");
                                        }
                                        builder.append(weight[i]);
                                        if (i == 1) {
                                            builder.append("*t");
                                        }
                                        else if (i > 1) {
                                            builder.append("*t^");
                                            builder.append(i);
                                        }
                                        if (i != 0) {
                                            builder.append(")");
                                        }
                                    }
                                    builder.append("\"");
                                }
                                builder.append("}");
                            }
                            return builder.toString();
                        };
                        PolynomialNode.PRECISION = "precision";
                        PolynomialNode.PRECISION_DEF = 1;
                        PolynomialNode.VALUE = "value";
                        PolynomialNode.NAME = "PolynomialNode";
                        PolynomialNode.INTERNAL_WEIGHT_KEY = "weight";
                        PolynomialNode.INTERNAL_STEP_KEY = "step";
                        PolynomialNode.INTERNAL_TIME_BUFFER = "times";
                        PolynomialNode.INTERNAL_VALUES_BUFFER = "values";
                        PolynomialNode.INTERNAL_NB_PAST_KEY = "nb";
                        PolynomialNode.INTERNAL_LAST_TIME_KEY = "lastTime";
                        PolynomialNode.MAX_DEGREE = "maxdegree";
                        PolynomialNode.MAX_DEGREE_DEF = 20;
                        PolynomialNode.NOT_MANAGED_ATT_ERROR = "Polynomial node can only handle value attribute, please use a super node to store other data";
                        PolynomialNode.enforcer = new org.mwg.utility.Enforcer().asPositiveDouble(PolynomialNode.PRECISION);
                        return PolynomialNode;
                    }(org.mwg.ml.AbstractMLNode));
                    regression.PolynomialNode = PolynomialNode;
                })(regression = algorithm.regression || (algorithm.regression = {}));
            })(algorithm = ml.algorithm || (ml.algorithm = {}));
            var common;
            (function (common) {
                var DecisionTreeNode = (function () {
                    function DecisionTreeNode() {
                    }
                    DecisionTreeNode.deserializeFromDoubleArray = function (decisionTreeArray) {
                        return org.mwg.ml.common.DecisionTreeNode.deserializeFromDoubleArrayWithRoot(decisionTreeArray, 0);
                    };
                    DecisionTreeNode.deserializeFromDoubleArrayWithRoot = function (decisionTreeArray, rootIndex) {
                        var dtr = new org.mwg.ml.common.DecisionTreeNode();
                        dtr.boundary = decisionTreeArray[rootIndex * DecisionTreeNode.ELEMENTS_PER_NODE];
                        dtr.classNum = decisionTreeArray[rootIndex * DecisionTreeNode.ELEMENTS_PER_NODE + 1];
                        var leftNum = decisionTreeArray[rootIndex * DecisionTreeNode.ELEMENTS_PER_NODE + 2];
                        dtr.left = (leftNum > 0) ? org.mwg.ml.common.DecisionTreeNode.deserializeFromDoubleArrayWithRoot(decisionTreeArray, leftNum) : null;
                        var rightNum = decisionTreeArray[rootIndex * DecisionTreeNode.ELEMENTS_PER_NODE + 3];
                        dtr.right = (rightNum > 0) ? org.mwg.ml.common.DecisionTreeNode.deserializeFromDoubleArrayWithRoot(decisionTreeArray, rightNum) : null;
                        dtr.featureNum = decisionTreeArray[rootIndex * DecisionTreeNode.ELEMENTS_PER_NODE + 4];
                        return dtr;
                    };
                    DecisionTreeNode.prototype.serializeToDoubleArray = function () {
                        var resultObjects = this.serializeToDoubleObjectArray();
                        var result = new Float64Array(resultObjects.size());
                        for (var i = 0; i < result.length; i++) {
                            result[i] = resultObjects.get(i);
                        }
                        return result;
                    };
                    DecisionTreeNode.prototype.serializeToDoubleObjectArray = function () {
                        var result = new java.util.ArrayList();
                        var frontier = new java.util.ArrayList();
                        frontier.add(this);
                        var currentNumberToAdd = 0;
                        while (frontier.size() > 0) {
                            var currentNode = frontier.get(0);
                            frontier.remove(0);
                            result.add(currentNode.boundary);
                            result.add(currentNode.classNum);
                            if (currentNode.left != null) {
                                currentNumberToAdd++;
                                result.add(currentNumberToAdd);
                                frontier.add(currentNode.left);
                            }
                            else {
                                result.add(-1.0);
                            }
                            if (currentNode.right != null) {
                                currentNumberToAdd++;
                                result.add(currentNumberToAdd);
                                frontier.add(currentNode.right);
                            }
                            else {
                                result.add(-1.0);
                            }
                            result.add(currentNode.featureNum);
                        }
                        return result;
                    };
                    DecisionTreeNode.ELEMENTS_PER_NODE = 5;
                    return DecisionTreeNode;
                }());
                common.DecisionTreeNode = DecisionTreeNode;
                var distance;
                (function (distance) {
                    var GaussianDistance = (function () {
                        function GaussianDistance(covariance) {
                            this.err = covariance;
                        }
                        GaussianDistance.prototype.measure = function (x, y) {
                            var max = 0;
                            var temp;
                            for (var i = 0; i < x.length; i++) {
                                temp = (x[i] - y[i]) * (x[i] - y[i]) / this.err[i];
                                if (temp > max) {
                                    max = temp;
                                }
                            }
                            return Math.sqrt(max);
                        };
                        GaussianDistance.prototype.compare = function (x, y) {
                            return x < y;
                        };
                        GaussianDistance.prototype.getMinValue = function () {
                            return 0;
                        };
                        GaussianDistance.prototype.getMaxValue = function () {
                            return java.lang.Double.MAX_VALUE;
                        };
                        return GaussianDistance;
                    }());
                    distance.GaussianDistance = GaussianDistance;
                })(distance = common.distance || (common.distance = {}));
                var matrix;
                (function (matrix) {
                    var HybridMatrixEngine = (function () {
                        function HybridMatrixEngine() {
                            this.blas = new org.mwg.ml.common.matrix.blassolver.BlasMatrixEngine();
                            this.jama = new org.mwg.ml.common.matrix.jamasolver.JamaMatrixEngine();
                        }
                        HybridMatrixEngine.prototype.multiplyTransposeAlphaBeta = function (transA, alpha, matA, transB, matB, beta, matC) {
                            if (matA.leadingDimension() < HybridMatrixEngine.MULT_LIMIT && matB.leadingDimension() < HybridMatrixEngine.MULT_LIMIT) {
                                return this.jama.multiplyTransposeAlphaBeta(transA, alpha, matA, transB, matB, beta, matC);
                            }
                            else {
                                return this.blas.multiplyTransposeAlphaBeta(transA, alpha, matA, transB, matB, beta, matC);
                            }
                        };
                        HybridMatrixEngine.prototype.invert = function (mat, invertInPlace) {
                            if (mat.rows() < HybridMatrixEngine.INVERT_LIMIT) {
                                return this.jama.invert(mat, invertInPlace);
                            }
                            else {
                                return this.blas.invert(mat, invertInPlace);
                            }
                        };
                        HybridMatrixEngine.prototype.pinv = function (mat, invertInPlace) {
                            var res = new org.mwg.ml.common.matrix.operation.PInvSVD();
                            res.factor(mat, invertInPlace);
                            return res.getPInv();
                        };
                        HybridMatrixEngine.prototype.solveLU = function (matA, matB, workInPlace, transB) {
                            if (matA.leadingDimension() < HybridMatrixEngine.SOLVELU_LIMIT && matB.leadingDimension() < HybridMatrixEngine.SOLVELU_LIMIT) {
                                return this.jama.solveLU(matA, matB, workInPlace, transB);
                            }
                            else {
                                return this.blas.solveLU(matA, matB, workInPlace, transB);
                            }
                        };
                        HybridMatrixEngine.prototype.solveQR = function (matA, matB, workInPlace, transB) {
                            return this.blas.solveQR(matA, matB, workInPlace, transB);
                        };
                        HybridMatrixEngine.prototype.decomposeSVD = function (matA, workInPlace) {
                            return this.jama.decomposeSVD(matA, workInPlace);
                        };
                        HybridMatrixEngine.MULT_LIMIT = 12;
                        HybridMatrixEngine.INVERT_LIMIT = 6;
                        HybridMatrixEngine.PINV_LIMIT = 5;
                        HybridMatrixEngine.SOLVELU_LIMIT = 6;
                        HybridMatrixEngine.SOLVEQR_LIMIT = 10;
                        HybridMatrixEngine.SOLVESVD_LIMIT = 8;
                        return HybridMatrixEngine;
                    }());
                    matrix.HybridMatrixEngine = HybridMatrixEngine;
                    var Matrix = (function () {
                        function Matrix(backend, p_nbRows, p_nbColumns) {
                            this._nbRows = p_nbRows;
                            this._nbColumns = p_nbColumns;
                            if (backend != null) {
                                this._data = backend;
                            }
                            else {
                                this._data = new Float64Array(this._nbRows * this._nbColumns);
                            }
                        }
                        Matrix.compare = function (a, b, eps) {
                            if (a == null || b == null) {
                                return false;
                            }
                            for (var i = 0; i < a.length; i++) {
                                if (Math.abs(a[i] - b[i]) > eps) {
                                    return false;
                                }
                            }
                            return true;
                        };
                        Matrix.compareArray = function (a, b, eps) {
                            if (a == null || b == null) {
                                return false;
                            }
                            for (var i = 0; i < a.length; i++) {
                                if (!org.mwg.ml.common.matrix.Matrix.compare(a[i], b[i], eps)) {
                                    return false;
                                }
                            }
                            return true;
                        };
                        Matrix.prototype.data = function () {
                            return this._data;
                        };
                        Matrix.prototype.exportRowMatrix = function () {
                            var res = new Float64Array(this._data.length);
                            var k = 0;
                            for (var i = 0; i < this._nbRows; i++) {
                                for (var j = 0; j < this._nbColumns; j++) {
                                    res[k] = this.get(i, j);
                                    k++;
                                }
                            }
                            return res;
                        };
                        Matrix.prototype.importRowMatrix = function (rowdata, rows, columns) {
                            var res = new org.mwg.ml.common.matrix.Matrix(null, rows, columns);
                            var k = 0;
                            for (var i = 0; i < this._nbRows; i++) {
                                for (var j = 0; j < this._nbColumns; j++) {
                                    res.set(i, j, rowdata[k]);
                                    k++;
                                }
                            }
                            return res;
                        };
                        Matrix.prototype.setData = function (data) {
                            java.lang.System.arraycopy(data, 0, this._data, 0, data.length);
                        };
                        Matrix.prototype.rows = function () {
                            return this._nbRows;
                        };
                        Matrix.prototype.columns = function () {
                            return this._nbColumns;
                        };
                        Matrix.prototype.get = function (rowIndex, columnIndex) {
                            return this._data[rowIndex + columnIndex * this._nbRows];
                        };
                        Matrix.prototype.set = function (rowIndex, columnIndex, value) {
                            this._data[rowIndex + columnIndex * this._nbRows] = value;
                            return value;
                        };
                        Matrix.prototype.add = function (rowIndex, columnIndex, value) {
                            return this.set(rowIndex, columnIndex, this.get(rowIndex, columnIndex) + value);
                        };
                        Matrix.prototype.setAll = function (value) {
                            for (var i = 0; i < this._nbColumns * this._nbRows; i++) {
                                this._data[i] = value;
                            }
                        };
                        Matrix.prototype.getAtIndex = function (index) {
                            return this._data[index];
                        };
                        Matrix.prototype.setAtIndex = function (index, value) {
                            this._data[index] = value;
                            return value;
                        };
                        Matrix.prototype.addAtIndex = function (index, value) {
                            this._data[index] += value;
                            return this._data[index];
                        };
                        Matrix.prototype.clone = function () {
                            var newback = new Float64Array(this._data.length);
                            java.lang.System.arraycopy(this._data, 0, newback, 0, this._data.length);
                            var res = new org.mwg.ml.common.matrix.Matrix(newback, this._nbRows, this._nbColumns);
                            return res;
                        };
                        Matrix.defaultEngine = function () {
                            if (Matrix._defaultEngine == null) {
                                Matrix._defaultEngine = new org.mwg.ml.common.matrix.HybridMatrixEngine();
                            }
                            return Matrix._defaultEngine;
                        };
                        Matrix.setDefaultEngine = function (matrixEngine) {
                            Matrix._defaultEngine = matrixEngine;
                        };
                        Matrix.multiply = function (matA, matB) {
                            return org.mwg.ml.common.matrix.Matrix.defaultEngine().multiplyTransposeAlphaBeta(org.mwg.ml.common.matrix.TransposeType.NOTRANSPOSE, 1, matA, org.mwg.ml.common.matrix.TransposeType.NOTRANSPOSE, matB, 0, null);
                        };
                        Matrix.multiplyTranspose = function (transA, matA, transB, matB) {
                            return org.mwg.ml.common.matrix.Matrix.defaultEngine().multiplyTransposeAlphaBeta(transA, 1.0, matA, transB, matB, 0, null);
                        };
                        Matrix.multiplyTransposeAlpha = function (transA, alpha, matA, transB, matB) {
                            return org.mwg.ml.common.matrix.Matrix.defaultEngine().multiplyTransposeAlphaBeta(transA, alpha, matA, transB, matB, 0, null);
                        };
                        Matrix.multiplyTransposeAlphaBeta = function (transA, alpha, matA, transB, matB, beta, matC) {
                            return org.mwg.ml.common.matrix.Matrix.defaultEngine().multiplyTransposeAlphaBeta(transA, alpha, matA, transB, matB, beta, matC);
                        };
                        Matrix.invert = function (mat, invertInPlace) {
                            return org.mwg.ml.common.matrix.Matrix.defaultEngine().invert(mat, invertInPlace);
                        };
                        Matrix.pinv = function (mat, invertInPlace) {
                            return org.mwg.ml.common.matrix.Matrix.defaultEngine().pinv(mat, invertInPlace);
                        };
                        Matrix.prototype.leadingDimension = function () {
                            return Math.max(this._nbColumns, this._nbRows);
                        };
                        Matrix.random = function (rows, columns, min, max) {
                            var res = new org.mwg.ml.common.matrix.Matrix(null, rows, columns);
                            var rand = new java.util.Random();
                            for (var i = 0; i < rows * columns; i++) {
                                res.setAtIndex(i, rand.nextDouble() * (max - min) + min);
                            }
                            return res;
                        };
                        Matrix.scale = function (alpha, matA) {
                            if (alpha == 0) {
                                matA.setAll(0);
                                return;
                            }
                            for (var i = 0; i < matA.rows() * matA.columns(); i++) {
                                matA.setAtIndex(i, alpha * matA.getAtIndex(i));
                            }
                        };
                        Matrix.transpose = function (matA) {
                            var result = new org.mwg.ml.common.matrix.Matrix(null, matA.columns(), matA.rows());
                            var TRANSPOSE_SWITCH = 375;
                            if (matA.columns() == matA.rows()) {
                                org.mwg.ml.common.matrix.Matrix.transposeSquare(matA, result);
                            }
                            else if (matA.columns() > TRANSPOSE_SWITCH && matA.rows() > TRANSPOSE_SWITCH) {
                                org.mwg.ml.common.matrix.Matrix.transposeBlock(matA, result);
                            }
                            else {
                                org.mwg.ml.common.matrix.Matrix.transposeStandard(matA, result);
                            }
                            return result;
                        };
                        Matrix.transposeSquare = function (matA, result) {
                            var index = 1;
                            var indexEnd = matA.columns();
                            for (var i = 0; i < matA.rows(); i++) {
                                var indexOther = (i + 1) * matA.columns() + i;
                                var n = i * (matA.columns() + 1);
                                result.setAtIndex(n, matA.getAtIndex(n));
                                for (; index < indexEnd; index++) {
                                    result.setAtIndex(index, matA.getAtIndex(indexOther));
                                    result.setAtIndex(indexOther, matA.getAtIndex(index));
                                    indexOther += matA.columns();
                                }
                                index += i + 2;
                                indexEnd += matA.columns();
                            }
                        };
                        Matrix.transposeStandard = function (matA, result) {
                            var index = 0;
                            for (var i = 0; i < result.columns(); i++) {
                                var index2 = i;
                                var end = index + result.rows();
                                while (index < end) {
                                    result.setAtIndex(index++, matA.getAtIndex(index2));
                                    index2 += matA.rows();
                                }
                            }
                        };
                        Matrix.transposeBlock = function (matA, result) {
                            var BLOCK_WIDTH = 60;
                            for (var j = 0; j < matA.columns(); j += BLOCK_WIDTH) {
                                var blockWidth = Math.min(BLOCK_WIDTH, matA.columns() - j);
                                var indexSrc = j * matA.rows();
                                var indexDst = j;
                                for (var i = 0; i < matA.rows(); i += BLOCK_WIDTH) {
                                    var blockHeight = Math.min(BLOCK_WIDTH, matA.rows() - i);
                                    var indexSrcEnd = indexSrc + blockHeight;
                                    for (; indexSrc < indexSrcEnd; indexSrc++) {
                                        var colSrc = indexSrc;
                                        var colDst = indexDst;
                                        var end = colDst + blockWidth;
                                        for (; colDst < end; colDst++) {
                                            result.setAtIndex(colDst, matA.getAtIndex(colSrc));
                                            colSrc += matA.rows();
                                        }
                                        indexDst += result.rows();
                                    }
                                }
                            }
                        };
                        Matrix.prototype.saveToState = function () {
                            var res = new Float64Array(this._data.length + 2);
                            res[0] = this._nbRows;
                            res[1] = this._nbColumns;
                            java.lang.System.arraycopy(this._data, 0, res, 2, this._data.length);
                            return res;
                        };
                        Matrix.loadFromState = function (o) {
                            var res = o;
                            var data = new Float64Array(res.length - 2);
                            java.lang.System.arraycopy(res, 2, data, 0, data.length);
                            return new org.mwg.ml.common.matrix.Matrix(data, res[0], res[1]);
                        };
                        Matrix.createIdentity = function (rows, columns) {
                            var ret = new org.mwg.ml.common.matrix.Matrix(null, rows, columns);
                            var width = Math.min(rows, columns);
                            for (var i = 0; i < width; i++) {
                                ret.set(i, i, 1);
                            }
                            return ret;
                        };
                        Matrix.compareMatrix = function (matA, matB) {
                            var err = 0;
                            for (var i = 0; i < matA.rows(); i++) {
                                for (var j = 0; j < matA.columns(); j++) {
                                    if (err < Math.abs(matA.get(i, j) - matB.get(i, j))) {
                                        err = Math.abs(matA.get(i, j) - matB.get(i, j));
                                    }
                                }
                            }
                            return err;
                        };
                        Matrix.testDimensionsAB = function (transA, transB, matA, matB) {
                            if (transA.equals(org.mwg.ml.common.matrix.TransposeType.NOTRANSPOSE)) {
                                if (transB.equals(org.mwg.ml.common.matrix.TransposeType.NOTRANSPOSE)) {
                                    return (matA.columns() == matB.rows());
                                }
                                else {
                                    return (matA.columns() == matB.columns());
                                }
                            }
                            else {
                                if (transB.equals(org.mwg.ml.common.matrix.TransposeType.NOTRANSPOSE)) {
                                    return (matA.rows() == matB.rows());
                                }
                                else {
                                    return (matA.rows() == matB.columns());
                                }
                            }
                        };
                        Matrix.identity = function (rows, columns) {
                            var res = new org.mwg.ml.common.matrix.Matrix(null, rows, columns);
                            for (var i = 0; i < Math.max(rows, columns); i++) {
                                res.set(i, i, 1.0);
                            }
                            return res;
                        };
                        Matrix._defaultEngine = null;
                        return Matrix;
                    }());
                    matrix.Matrix = Matrix;
                    var TransposeType = (function () {
                        function TransposeType() {
                        }
                        TransposeType.prototype.equals = function (other) {
                            return this == other;
                        };
                        TransposeType.values = function () {
                            return TransposeType._TransposeTypeVALUES;
                        };
                        TransposeType.NOTRANSPOSE = new TransposeType();
                        TransposeType.TRANSPOSE = new TransposeType();
                        TransposeType._TransposeTypeVALUES = [
                            TransposeType.NOTRANSPOSE,
                            TransposeType.TRANSPOSE
                        ];
                        return TransposeType;
                    }());
                    matrix.TransposeType = TransposeType;
                    var blassolver;
                    (function (blassolver) {
                        var BlasMatrixEngine = (function () {
                            function BlasMatrixEngine() {
                                this._blas = new org.mwg.ml.common.matrix.blassolver.blas.JSBlas();
                            }
                            BlasMatrixEngine.prototype.setBlas = function (p_blas) {
                                this._blas = p_blas;
                            };
                            BlasMatrixEngine.prototype.getBlas = function () {
                                return this._blas;
                            };
                            BlasMatrixEngine.prototype.multiplyTransposeAlphaBeta = function (transA, alpha, matA, transB, matB, beta, matC) {
                                if (org.mwg.ml.common.matrix.Matrix.testDimensionsAB(transA, transB, matA, matB)) {
                                    var k = 0;
                                    var dimC = new Int32Array(2);
                                    if (transA.equals(org.mwg.ml.common.matrix.TransposeType.NOTRANSPOSE)) {
                                        k = matA.columns();
                                        if (transB.equals(org.mwg.ml.common.matrix.TransposeType.NOTRANSPOSE)) {
                                            dimC[0] = matA.rows();
                                            dimC[1] = matB.columns();
                                        }
                                        else {
                                            dimC[0] = matA.rows();
                                            dimC[1] = matB.rows();
                                        }
                                    }
                                    else {
                                        k = matA.rows();
                                        if (transB.equals(org.mwg.ml.common.matrix.TransposeType.NOTRANSPOSE)) {
                                            dimC[0] = matA.columns();
                                            dimC[1] = matB.columns();
                                        }
                                        else {
                                            dimC[0] = matA.columns();
                                            dimC[1] = matB.rows();
                                        }
                                    }
                                    if (beta == 0 || matC == null) {
                                        matC = new org.mwg.ml.common.matrix.Matrix(null, dimC[0], dimC[1]);
                                    }
                                    this._blas.dgemm(transA, transB, matC.rows(), matC.columns(), k, alpha, matA.data(), 0, matA.rows(), matB.data(), 0, matB.rows(), beta, matC.data(), 0, matC.rows());
                                    return matC;
                                }
                                else {
                                    throw new Error("Dimensions mismatch between A,B and C");
                                }
                            };
                            BlasMatrixEngine.prototype.invert = function (mat, invertInPlace) {
                                if (mat.rows() != mat.columns()) {
                                    return null;
                                }
                                if (invertInPlace) {
                                    var dlu = new org.mwg.ml.common.matrix.blassolver.LU(mat.rows(), mat.columns(), this._blas);
                                    if (dlu.invert(mat)) {
                                        return mat;
                                    }
                                    else {
                                        return null;
                                    }
                                }
                                else {
                                    var result = new org.mwg.ml.common.matrix.Matrix(null, mat.rows(), mat.columns());
                                    var A_temp = new org.mwg.ml.common.matrix.Matrix(null, mat.rows(), mat.columns());
                                    java.lang.System.arraycopy(mat.data(), 0, A_temp.data(), 0, mat.columns() * mat.rows());
                                    var dlu = new org.mwg.ml.common.matrix.blassolver.LU(A_temp.rows(), A_temp.columns(), this._blas);
                                    if (dlu.invert(A_temp)) {
                                        result.setData(A_temp.data());
                                        return result;
                                    }
                                    else {
                                        return null;
                                    }
                                }
                            };
                            BlasMatrixEngine.prototype.pinv = function (mat, invertInPlace) {
                                return this.solve(mat, org.mwg.ml.common.matrix.Matrix.identity(mat.rows(), mat.rows()));
                            };
                            BlasMatrixEngine.prototype.solveQR = function (matA, matB, workInPlace, transB) {
                                var solver = org.mwg.ml.common.matrix.blassolver.QR.factorize(matA, workInPlace, this._blas);
                                var coef = new org.mwg.ml.common.matrix.Matrix(null, matA.columns(), matB.columns());
                                if (transB != org.mwg.ml.common.matrix.TransposeType.NOTRANSPOSE) {
                                    matB = org.mwg.ml.common.matrix.Matrix.transpose(matB);
                                }
                                solver.solve(matB, coef);
                                return coef;
                            };
                            BlasMatrixEngine.prototype.decomposeSVD = function (matA, workInPlace) {
                                var svd = new org.mwg.ml.common.matrix.blassolver.SVD(matA.rows(), matA.columns(), this._blas);
                                svd.factor(matA, workInPlace);
                                return svd;
                            };
                            BlasMatrixEngine.prototype.solveLU = function (matA, matB, workInPlace, transB) {
                                if (!workInPlace) {
                                    var A_temp = new org.mwg.ml.common.matrix.Matrix(null, matA.rows(), matA.columns());
                                    java.lang.System.arraycopy(matA.data(), 0, A_temp.data(), 0, matA.columns() * matA.rows());
                                    var dlu = new org.mwg.ml.common.matrix.blassolver.LU(A_temp.rows(), A_temp.columns(), this._blas);
                                    dlu.factor(A_temp, true);
                                    if (dlu.isSingular()) {
                                        return null;
                                    }
                                    var B_temp = new org.mwg.ml.common.matrix.Matrix(null, matB.rows(), matB.columns());
                                    java.lang.System.arraycopy(matB.data(), 0, B_temp.data(), 0, matB.columns() * matB.rows());
                                    dlu.transSolve(B_temp, transB);
                                    return B_temp;
                                }
                                else {
                                    var dlu = new org.mwg.ml.common.matrix.blassolver.LU(matA.rows(), matA.columns(), this._blas);
                                    dlu.factor(matA, true);
                                    if (dlu.isSingular()) {
                                        return null;
                                    }
                                    dlu.transSolve(matB, transB);
                                    return matB;
                                }
                            };
                            BlasMatrixEngine.prototype.solve = function (A, B) {
                                return (A.rows() == A.columns() ? (new org.mwg.ml.common.matrix.blassolver.LU(A.rows(), A.columns(), this._blas).factor(A, false)).solve(B) : this.solveQR(A, B, false, org.mwg.ml.common.matrix.TransposeType.NOTRANSPOSE));
                            };
                            return BlasMatrixEngine;
                        }());
                        blassolver.BlasMatrixEngine = BlasMatrixEngine;
                        var JobSVD = (function () {
                            function JobSVD() {
                            }
                            JobSVD.prototype.netlib = function () {
                                switch (this) {
                                    case JobSVD.All:
                                        return "A";
                                    case JobSVD.Part:
                                        return "S";
                                    case JobSVD.Overwrite:
                                        return "O";
                                    default:
                                        return "N";
                                }
                            };
                            JobSVD.prototype.equals = function (other) {
                                return this == other;
                            };
                            JobSVD.values = function () {
                                return JobSVD._JobSVDVALUES;
                            };
                            JobSVD.All = new JobSVD();
                            JobSVD.None = new JobSVD();
                            JobSVD.Overwrite = new JobSVD();
                            JobSVD.Part = new JobSVD();
                            JobSVD._JobSVDVALUES = [
                                JobSVD.All,
                                JobSVD.None,
                                JobSVD.Overwrite,
                                JobSVD.Part
                            ];
                            return JobSVD;
                        }());
                        blassolver.JobSVD = JobSVD;
                        var LU = (function () {
                            function LU(m, n, blas) {
                                this._blas = blas;
                                this.LU = new org.mwg.ml.common.matrix.Matrix(null, m, n);
                                this.piv = new Int32Array(Math.min(m, n));
                            }
                            LU.prototype.getLU = function () {
                                return this.LU;
                            };
                            LU.factorize = function (A, blas) {
                                return new org.mwg.ml.common.matrix.blassolver.LU(A.rows(), A.columns(), blas).factor(A, false);
                            };
                            LU.prototype.factor = function (A, factorInPlace) {
                                if (factorInPlace) {
                                    this.singular = false;
                                    var info = new Int32Array(1);
                                    info[0] = 0;
                                    this._blas.dgetrf(A.rows(), A.columns(), A.data(), 0, A.rows(), this.piv, 0, info);
                                    if (info[0] > 0)
                                        this.singular = true;
                                    else if (info[0] < 0)
                                        throw new Error();
                                    this.LU.setData(A.data());
                                    return this;
                                }
                                else {
                                    this.singular = false;
                                    var B = A.clone();
                                    var info = new Int32Array(1);
                                    info[0] = 0;
                                    this._blas.dgetrf(B.rows(), B.columns(), B.data(), 0, B.rows(), this.piv, 0, info);
                                    if (info[0] > 0)
                                        this.singular = true;
                                    else if (info[0] < 0)
                                        throw new Error();
                                    this.LU.setData(B.data());
                                    return this;
                                }
                            };
                            LU.prototype.getL = function () {
                                var numRows = this.LU.rows();
                                var numCols = this.LU.rows() < this.LU.columns() ? this.LU.rows() : this.LU.columns();
                                var lower = new org.mwg.ml.common.matrix.Matrix(null, numRows, numCols);
                                for (var i = 0; i < numCols; i++) {
                                    lower.set(i, i, 1.0);
                                    for (var j = 0; j < i; j++) {
                                        lower.set(i, j, this.LU.get(i, j));
                                    }
                                }
                                if (numRows > numCols) {
                                    for (var i = numCols; i < numRows; i++) {
                                        for (var j = 0; j < numCols; j++) {
                                            lower.set(i, j, this.LU.get(i, j));
                                        }
                                    }
                                }
                                return lower;
                            };
                            LU.prototype.getU = function () {
                                var numRows = this.LU.rows() < this.LU.columns() ? this.LU.rows() : this.LU.columns();
                                var numCols = this.LU.columns();
                                var upper = new org.mwg.ml.common.matrix.Matrix(null, numRows, numCols);
                                for (var i = 0; i < numRows; i++) {
                                    for (var j = i; j < numCols; j++) {
                                        upper.set(i, j, this.LU.get(i, j));
                                    }
                                }
                                return upper;
                            };
                            LU.prototype.getPivots = function () {
                                return this.piv;
                            };
                            LU.prototype.isSingular = function () {
                                return this.singular;
                            };
                            LU.prototype.solve = function (B) {
                                return this.transSolve(B, org.mwg.ml.common.matrix.TransposeType.NOTRANSPOSE);
                            };
                            LU.prototype.transSolve = function (B, trans) {
                                if (B.rows() != this.LU.rows())
                                    throw new Error("B.numRows() != LU.numRows()");
                                var info = new Int32Array(1);
                                this._blas.dgetrs(trans, this.LU.rows(), B.columns(), this.LU.data(), 0, this.LU.rows(), this.piv, 0, B.data(), 0, B.rows(), info);
                                if (info[0] < 0)
                                    throw new Error();
                                return B;
                            };
                            LU.prototype.invert = function (A) {
                                var info = new Int32Array(1);
                                info[0] = 0;
                                this._blas.dgetrf(A.rows(), A.columns(), A.data(), 0, A.rows(), this.piv, 0, info);
                                if (info[0] > 0) {
                                    this.singular = true;
                                    return false;
                                }
                                else if (info[0] < 0)
                                    throw new Error();
                                var lwork = A.rows() * A.rows();
                                var work = new Float64Array(lwork);
                                for (var i = 0; i < lwork; i++) {
                                    work[i] = 0;
                                }
                                this._blas.dgetri(A.rows(), A.data(), 0, A.rows(), this.piv, 0, work, 0, lwork, info);
                                if (info[0] != 0) {
                                    return false;
                                }
                                else {
                                    return true;
                                }
                            };
                            return LU;
                        }());
                        blassolver.LU = LU;
                        var QR = (function () {
                            function QR(rows, columns, blas) {
                                this._blas = blas;
                                if (columns > rows)
                                    throw new Error("n > m");
                                this.m = rows;
                                this.n = columns;
                                this.k = Math.min(this.m, this.n);
                                this.tau = new Float64Array(this.k);
                                this.R = new org.mwg.ml.common.matrix.Matrix(null, this.n, this.n);
                            }
                            QR.factorize = function (A, workInPlace, blas) {
                                return new org.mwg.ml.common.matrix.blassolver.QR(A.rows(), A.columns(), blas).factor(A, workInPlace);
                            };
                            QR.prototype.factor = function (matA, workInPlace) {
                                var A;
                                if (!workInPlace) {
                                    A = matA.clone();
                                }
                                else {
                                    A = matA;
                                }
                                var lwork;
                                this.work = new Float64Array(1);
                                var info = new Int32Array(1);
                                info[0] = 0;
                                this._blas.dgeqrf(this.m, this.n, new Float64Array(0), 0, this.m, new Float64Array(0), 0, this.work, 0, -1, info);
                                if (info[0] != 0)
                                    lwork = this.n;
                                else
                                    lwork = this.work[0];
                                lwork = Math.max(1, lwork);
                                this.work = new Float64Array(lwork);
                                this.workGen = new Float64Array(1);
                                info[0] = 0;
                                this._blas.dorgqr(this.m, this.n, this.k, new Float64Array(0), 0, this.m, new Float64Array(0), 0, this.workGen, 0, -1, info);
                                if (info[0] != 0)
                                    lwork = this.n;
                                else
                                    lwork = this.workGen[0];
                                lwork = Math.max(1, lwork);
                                this.workGen = new Float64Array(lwork);
                                info[0] = 0;
                                this._blas.dgeqrf(this.m, this.n, A.data(), 0, this.m, this.tau, 0, this.work, 0, this.work.length, info);
                                if (info[0] < 0)
                                    throw new Error("" + info[0]);
                                for (var col = 0; col < A.columns(); col++) {
                                    for (var row = 0; row <= col; row++) {
                                        this.R.set(row, col, A.get(row, col));
                                    }
                                }
                                info[0] = 0;
                                this._blas.dorgqr(this.m, this.n, this.k, A.data(), 0, this.m, this.tau, 0, this.workGen, 0, this.workGen.length, info);
                                if (info[0] < 0)
                                    throw new Error();
                                this.Q = A;
                                return this;
                            };
                            QR.prototype.solve = function (B, X) {
                                var BnumCols = B.columns();
                                var Y = new org.mwg.ml.common.matrix.Matrix(null, this.m, 1);
                                var Z;
                                for (var colB = 0; colB < BnumCols; colB++) {
                                    for (var i = 0; i < this.m; i++) {
                                        Y.setAtIndex(i, B.get(i, colB));
                                    }
                                    Z = org.mwg.ml.common.matrix.Matrix.multiplyTranspose(org.mwg.ml.common.matrix.TransposeType.TRANSPOSE, this.Q, org.mwg.ml.common.matrix.TransposeType.NOTRANSPOSE, Y);
                                    this.solveU(this.R, Z.data(), this.n, this.m);
                                    for (var i = 0; i < this.n; i++) {
                                        X.set(i, colB, Z.getAtIndex(i));
                                    }
                                }
                            };
                            QR.prototype.solveU = function (U, b, n, m) {
                                for (var i = n - 1; i >= 0; i--) {
                                    var sum = b[i];
                                    for (var j = i + 1; j < n; j++) {
                                        sum -= U.get(i, j) * b[j];
                                    }
                                    b[i] = sum / U.get(i, i);
                                }
                            };
                            QR.prototype.getR = function () {
                                return this.R;
                            };
                            QR.prototype.getQ = function () {
                                return this.Q;
                            };
                            return QR;
                        }());
                        blassolver.QR = QR;
                        var SVD = (function () {
                            function SVD(m, n, blas) {
                                this.m = m;
                                this.n = n;
                                this._blas = blas;
                                this.vectors = true;
                                this.S = new Float64Array(Math.min(m, n));
                                if (this.vectors) {
                                    this.U = new org.mwg.ml.common.matrix.Matrix(null, m, m);
                                    this.Vt = new org.mwg.ml.common.matrix.Matrix(null, n, n);
                                }
                                else
                                    this.U = this.Vt = null;
                                this.job = this.vectors ? org.mwg.ml.common.matrix.blassolver.JobSVD.All : org.mwg.ml.common.matrix.blassolver.JobSVD.None;
                                this.iwork = new Int32Array(8 * Math.min(m, n));
                                var worksize = new Float64Array(1);
                                var info = new Int32Array(1);
                                this._blas.dgesdd(this.job.netlib(), m, n, new Float64Array(0), Math.max(1, m), new Float64Array(0), new Float64Array(0), Math.max(1, m), new Float64Array(0), Math.max(1, n), worksize, -1, this.iwork, info);
                                var lwork = -1;
                                if (info[0] != 0) {
                                    if (this.vectors)
                                        lwork = 3 * Math.min(m, n) * Math.min(m, n) + Math.max(Math.max(m, n), 4 * Math.min(m, n) * Math.min(m, n) + 4 * Math.min(m, n));
                                    else
                                        lwork = 3 * Math.min(m, n) * Math.min(m, n) + Math.max(Math.max(m, n), 5 * Math.min(m, n) * Math.min(m, n) + 4 * Math.min(m, n));
                                }
                                else
                                    lwork = worksize[0];
                                lwork = Math.max(lwork, 1);
                                this.work = new Float64Array(lwork);
                            }
                            SVD.prototype.factor = function (A, workInPlace) {
                                if (A.rows() != this.m)
                                    throw new Error("A.numRows() != m");
                                else if (A.columns() != this.n)
                                    throw new Error("A.numColumns() != n");
                                var info = new Int32Array(1);
                                info[0] = 0;
                                if (workInPlace) {
                                    this._blas.dgesdd(this.job.netlib(), this.m, this.n, A.data(), Math.max(1, this.m), this.S, this.vectors ? this.U.data() : new Float64Array(0), Math.max(1, this.m), this.vectors ? this.Vt.data() : new Float64Array(0), Math.max(1, this.n), this.work, this.work.length, this.iwork, info);
                                }
                                else {
                                    var Adata = A.data();
                                    var cloned = new Float64Array(Adata.length);
                                    java.lang.System.arraycopy(Adata, 0, cloned, 0, Adata.length);
                                    this._blas.dgesdd(this.job.netlib(), this.m, this.n, cloned, Math.max(1, this.m), this.S, this.vectors ? this.U.data() : new Float64Array(0), Math.max(1, this.m), this.vectors ? this.Vt.data() : new Float64Array(0), Math.max(1, this.n), this.work, this.work.length, this.iwork, info);
                                }
                                if (info[0] > 0)
                                    throw new Error("NotConvergedException.Reason.Iterations");
                                else if (info[0] < 0)
                                    throw new Error();
                                return this;
                            };
                            SVD.prototype.hasSingularVectors = function () {
                                return this.U != null;
                            };
                            SVD.prototype.getU = function () {
                                return this.U;
                            };
                            SVD.prototype.getVt = function () {
                                return this.Vt;
                            };
                            SVD.prototype.getS = function () {
                                return this.S;
                            };
                            SVD.prototype.getSMatrix = function () {
                                var matS = new org.mwg.ml.common.matrix.Matrix(null, this.m, this.n);
                                for (var i = 0; i < this.S.length; i++) {
                                    matS.set(i, i, this.S[i]);
                                }
                                return matS;
                            };
                            return SVD;
                        }());
                        blassolver.SVD = SVD;
                        var blas;
                        (function (blas) {
                            var BlasHelper = (function () {
                                function BlasHelper() {
                                }
                                BlasHelper.transTypeToChar = function (type) {
                                    if (type.equals(org.mwg.ml.common.matrix.TransposeType.NOTRANSPOSE)) {
                                        return BlasHelper.TRANSPOSE_TYPE_NOTRANSPOSE;
                                    }
                                    else if (type.equals(org.mwg.ml.common.matrix.TransposeType.TRANSPOSE)) {
                                        return BlasHelper.TRANSPOSE_TYPE_TRANSPOSE;
                                    }
                                    return null;
                                };
                                BlasHelper.TRANSPOSE_TYPE_CONJUCATE = "c";
                                BlasHelper.TRANSPOSE_TYPE_NOTRANSPOSE = "n";
                                BlasHelper.TRANSPOSE_TYPE_TRANSPOSE = "t";
                                return BlasHelper;
                            }());
                            blas.BlasHelper = BlasHelper;
                        })(blas = blassolver.blas || (blassolver.blas = {}));
                    })(blassolver = matrix.blassolver || (matrix.blassolver = {}));
                    var jamasolver;
                    (function (jamasolver) {
                        var JamaMatrixEngine = (function () {
                            function JamaMatrixEngine() {
                            }
                            JamaMatrixEngine.prototype.multiplyTransposeAlphaBeta = function (transA, alpha, matA, transB, matB, beta, matC) {
                                if (org.mwg.ml.common.matrix.Matrix.testDimensionsAB(transA, transB, matA, matB)) {
                                    var dimC = new Int32Array(3);
                                    if (transA.equals(org.mwg.ml.common.matrix.TransposeType.NOTRANSPOSE)) {
                                        if (transB.equals(org.mwg.ml.common.matrix.TransposeType.NOTRANSPOSE)) {
                                            dimC[0] = matA.rows();
                                            dimC[1] = matB.columns();
                                            dimC[2] = matA.columns();
                                        }
                                        else {
                                            dimC[0] = matA.rows();
                                            dimC[1] = matB.rows();
                                            dimC[2] = matA.columns();
                                        }
                                    }
                                    else {
                                        if (transB.equals(org.mwg.ml.common.matrix.TransposeType.NOTRANSPOSE)) {
                                            dimC[0] = matA.columns();
                                            dimC[1] = matB.columns();
                                            dimC[2] = matA.rows();
                                        }
                                        else {
                                            dimC[0] = matA.columns();
                                            dimC[1] = matB.rows();
                                            dimC[2] = matA.rows();
                                        }
                                    }
                                    if (beta == 0 || matC == null) {
                                        matC = new org.mwg.ml.common.matrix.Matrix(null, dimC[0], dimC[1]);
                                    }
                                    var temp = 0;
                                    if (transA == org.mwg.ml.common.matrix.TransposeType.NOTRANSPOSE && transB == org.mwg.ml.common.matrix.TransposeType.NOTRANSPOSE) {
                                        for (var i = 0; i < dimC[0]; i++) {
                                            for (var j = 0; j < dimC[1]; j++) {
                                                temp = 0;
                                                for (var k = 0; k < dimC[2]; k++) {
                                                    temp += alpha * matA.get(i, k) * matB.get(k, j);
                                                }
                                                if (beta != 0) {
                                                    temp = temp + beta * matC.get(i, j);
                                                }
                                                matC.set(i, j, temp);
                                            }
                                        }
                                    }
                                    else if (transA == org.mwg.ml.common.matrix.TransposeType.NOTRANSPOSE && transB == org.mwg.ml.common.matrix.TransposeType.TRANSPOSE) {
                                        for (var i = 0; i < dimC[0]; i++) {
                                            for (var j = 0; j < dimC[1]; j++) {
                                                temp = 0;
                                                for (var k = 0; k < dimC[2]; k++) {
                                                    temp += alpha * matA.get(i, k) * matB.get(j, k);
                                                }
                                                if (beta != 0) {
                                                    temp = temp + beta * matC.get(i, j);
                                                }
                                                matC.set(i, j, temp);
                                            }
                                        }
                                    }
                                    else if (transA == org.mwg.ml.common.matrix.TransposeType.TRANSPOSE && transB == org.mwg.ml.common.matrix.TransposeType.NOTRANSPOSE) {
                                        for (var i = 0; i < dimC[0]; i++) {
                                            for (var j = 0; j < dimC[1]; j++) {
                                                temp = 0;
                                                for (var k = 0; k < dimC[2]; k++) {
                                                    temp += alpha * matA.get(k, i) * matB.get(k, j);
                                                }
                                                if (beta != 0) {
                                                    temp = temp + beta * matC.get(i, j);
                                                }
                                                matC.set(i, j, temp);
                                            }
                                        }
                                    }
                                    else if (transA == org.mwg.ml.common.matrix.TransposeType.TRANSPOSE && transB == org.mwg.ml.common.matrix.TransposeType.TRANSPOSE) {
                                        for (var i = 0; i < dimC[0]; i++) {
                                            for (var j = 0; j < dimC[1]; j++) {
                                                temp = 0;
                                                for (var k = 0; k < dimC[2]; k++) {
                                                    temp += alpha * matA.get(k, i) * matB.get(j, k);
                                                }
                                                if (beta != 0) {
                                                    temp = temp + beta * matC.get(i, j);
                                                }
                                                matC.set(i, j, temp);
                                            }
                                        }
                                    }
                                    return matC;
                                }
                                else {
                                    throw new Error("Dimensions mismatch between A,B and C");
                                }
                            };
                            JamaMatrixEngine.prototype.invert = function (mat, invertInPlace) {
                                return org.mwg.ml.common.matrix.jamasolver.JamaMatrixEngine.solve(mat, org.mwg.ml.common.matrix.Matrix.identity(mat.rows(), mat.rows()));
                            };
                            JamaMatrixEngine.prototype.pinv = function (mat, invertInPlace) {
                                return org.mwg.ml.common.matrix.jamasolver.JamaMatrixEngine.solve(mat, org.mwg.ml.common.matrix.Matrix.identity(mat.rows(), mat.rows()));
                            };
                            JamaMatrixEngine.prototype.solveLU = function (matA, matB, workInPlace, transB) {
                                var btem;
                                if (transB == org.mwg.ml.common.matrix.TransposeType.TRANSPOSE) {
                                    btem = org.mwg.ml.common.matrix.Matrix.transpose(matB);
                                }
                                else {
                                    btem = matB;
                                }
                                return (new org.mwg.ml.common.matrix.jamasolver.LU(matA)).solve(btem);
                            };
                            JamaMatrixEngine.prototype.solveQR = function (matA, matB, workInPlace, transB) {
                                var btem;
                                if (transB == org.mwg.ml.common.matrix.TransposeType.TRANSPOSE) {
                                    btem = org.mwg.ml.common.matrix.Matrix.transpose(matB);
                                }
                                else {
                                    btem = matB;
                                }
                                return (new org.mwg.ml.common.matrix.jamasolver.QR(matA)).solve(btem);
                            };
                            JamaMatrixEngine.prototype.decomposeSVD = function (matA, workInPlace) {
                                return new org.mwg.ml.common.matrix.jamasolver.SVD(matA);
                            };
                            JamaMatrixEngine.solve = function (A, B) {
                                return (A.rows() == A.columns() ? (new org.mwg.ml.common.matrix.jamasolver.LU(A)).solve(B) : (new org.mwg.ml.common.matrix.jamasolver.QR(A)).solve(B));
                            };
                            return JamaMatrixEngine;
                        }());
                        jamasolver.JamaMatrixEngine = JamaMatrixEngine;
                        var LU = (function () {
                            function LU(A) {
                                this.LU = A.clone();
                                this.m = A.rows();
                                this.n = A.columns();
                                this.piv = new Int32Array(this.m);
                                for (var i = 0; i < this.m; i++) {
                                    this.piv[i] = i;
                                }
                                this.pivsign = 1;
                                var LUcolj = new Float64Array(this.m);
                                for (var j = 0; j < this.n; j++) {
                                    for (var i = 0; i < this.m; i++) {
                                        LUcolj[i] = this.LU.get(i, j);
                                    }
                                    for (var i = 0; i < this.m; i++) {
                                        var kmax = Math.min(i, j);
                                        var s = 0.0;
                                        for (var k = 0; k < kmax; k++) {
                                            s += this.LU.get(i, k) * LUcolj[k];
                                        }
                                        LUcolj[i] -= s;
                                        this.LU.set(i, j, LUcolj[i]);
                                    }
                                    var p = j;
                                    for (var i = j + 1; i < this.m; i++) {
                                        if (Math.abs(LUcolj[i]) > Math.abs(LUcolj[p])) {
                                            p = i;
                                        }
                                    }
                                    if (p != j) {
                                        for (var k_1 = 0; k_1 < this.n; k_1++) {
                                            var t = this.LU.get(p, k_1);
                                            this.LU.set(p, k_1, this.LU.get(j, k_1));
                                            this.LU.set(j, k_1, t);
                                        }
                                        var k = this.piv[p];
                                        this.piv[p] = this.piv[j];
                                        this.piv[j] = k;
                                        this.pivsign = -this.pivsign;
                                    }
                                    if (j < this.m && this.LU.get(j, j) != 0.0) {
                                        for (var i = j + 1; i < this.m; i++) {
                                            this.LU.set(i, j, this.LU.get(i, j) / this.LU.get(j, j));
                                        }
                                    }
                                }
                            }
                            LU.prototype.isNonsingular = function () {
                                for (var j = 0; j < this.n; j++) {
                                    if (this.LU.get(j, j) == 0)
                                        return false;
                                }
                                return true;
                            };
                            LU.prototype.getL = function () {
                                var L = new org.mwg.ml.common.matrix.Matrix(null, this.m, this.n);
                                for (var i = 0; i < this.m; i++) {
                                    for (var j = 0; j < this.n; j++) {
                                        if (i > j) {
                                            L.set(i, j, this.LU.get(i, j));
                                        }
                                        else if (i == j) {
                                            L.set(i, j, 1.0);
                                        }
                                        else {
                                            L.set(i, j, 0.0);
                                        }
                                    }
                                }
                                return L;
                            };
                            LU.prototype.getU = function () {
                                var U = new org.mwg.ml.common.matrix.Matrix(null, this.n, this.n);
                                for (var i = 0; i < this.n; i++) {
                                    for (var j = 0; j < this.n; j++) {
                                        if (i <= j) {
                                            U.set(i, j, this.LU.get(i, j));
                                        }
                                        else {
                                            U.set(i, j, 0.0);
                                        }
                                    }
                                }
                                return U;
                            };
                            LU.prototype.getPivot = function () {
                                var p = new Int32Array(this.m);
                                for (var i = 0; i < this.m; i++) {
                                    p[i] = this.piv[i];
                                }
                                return p;
                            };
                            LU.prototype.getDoublePivot = function () {
                                var vals = new Float64Array(this.m);
                                for (var i = 0; i < this.m; i++) {
                                    vals[i] = this.piv[i];
                                }
                                return vals;
                            };
                            LU.prototype.det = function () {
                                if (this.m != this.n) {
                                    throw new Error("Matrix must be square.");
                                }
                                var d = this.pivsign;
                                for (var j = 0; j < this.n; j++) {
                                    d *= this.LU.get(j, j);
                                }
                                return d;
                            };
                            LU.prototype.solve = function (B) {
                                if (B.rows() != this.m) {
                                    throw new Error("Matrix row dimensions must agree.");
                                }
                                if (!this.isNonsingular()) {
                                    throw new Error("Matrix is singular.");
                                }
                                var nx = B.columns();
                                var X = this.getMatrix(B, this.piv, 0, nx - 1);
                                for (var k = 0; k < this.n; k++) {
                                    for (var i = k + 1; i < this.n; i++) {
                                        for (var j = 0; j < nx; j++) {
                                            X.add(i, j, -X.get(k, j) * this.LU.get(i, k));
                                        }
                                    }
                                }
                                for (var k = this.n - 1; k >= 0; k--) {
                                    for (var j = 0; j < nx; j++) {
                                        X.set(k, j, X.get(k, j) / this.LU.get(k, k));
                                    }
                                    for (var i = 0; i < k; i++) {
                                        for (var j = 0; j < nx; j++) {
                                            X.add(i, j, -X.get(k, j) * this.LU.get(i, k));
                                        }
                                    }
                                }
                                return X;
                            };
                            LU.prototype.getMatrix = function (A, r, j0, j1) {
                                var B = new org.mwg.ml.common.matrix.Matrix(null, r.length, j1 - j0 + 1);
                                try {
                                    for (var i = 0; i < r.length; i++) {
                                        for (var j = j0; j <= j1; j++) {
                                            B.set(i, j - j0, A.get(r[i], j));
                                        }
                                    }
                                }
                                catch ($ex$) {
                                    if ($ex$ instanceof Error) {
                                        var e = $ex$;
                                        {
                                            throw new Error("Submatrix indices");
                                        }
                                    }
                                    else {
                                        throw $ex$;
                                    }
                                }
                                return B;
                            };
                            return LU;
                        }());
                        jamasolver.LU = LU;
                        var QR = (function () {
                            function QR(A) {
                                this.QR = A.clone();
                                this.m = A.rows();
                                this.n = A.columns();
                                this.Rdiag = new Float64Array(this.n);
                                for (var k = 0; k < this.n; k++) {
                                    var nrm = 0;
                                    for (var i = k; i < this.m; i++) {
                                        nrm = org.mwg.ml.common.matrix.jamasolver.Utils.hypot(nrm, this.QR.get(i, k));
                                    }
                                    if (nrm != 0.0) {
                                        if (this.QR.get(k, k) < 0) {
                                            nrm = -nrm;
                                        }
                                        for (var i = k; i < this.m; i++) {
                                            this.QR.set(i, k, this.QR.get(i, k) / nrm);
                                        }
                                        this.QR.add(k, k, 1.0);
                                        for (var j = k + 1; j < this.n; j++) {
                                            var s = 0.0;
                                            for (var i = k; i < this.m; i++) {
                                                s += this.QR.get(i, k) * this.QR.get(i, j);
                                            }
                                            s = -s / this.QR.get(k, k);
                                            for (var i = k; i < this.m; i++) {
                                                this.QR.add(i, j, s * this.QR.get(i, k));
                                            }
                                        }
                                    }
                                    this.Rdiag[k] = -nrm;
                                }
                            }
                            QR.prototype.isFullRank = function () {
                                for (var j = 0; j < this.n; j++) {
                                    if (this.Rdiag[j] == 0)
                                        return false;
                                }
                                return true;
                            };
                            QR.prototype.getH = function () {
                                var H = new org.mwg.ml.common.matrix.Matrix(null, this.m, this.n);
                                for (var i = 0; i < this.m; i++) {
                                    for (var j = 0; j < this.n; j++) {
                                        if (i >= j) {
                                            H.set(i, j, this.QR.get(i, j));
                                        }
                                        else {
                                            H.set(i, j, 0.0);
                                        }
                                    }
                                }
                                return H;
                            };
                            QR.prototype.getR = function () {
                                var R = new org.mwg.ml.common.matrix.Matrix(null, this.n, this.n);
                                for (var i = 0; i < this.n; i++) {
                                    for (var j = 0; j < this.n; j++) {
                                        if (i < j) {
                                            R.set(i, j, this.QR.get(i, j));
                                        }
                                        else if (i == j) {
                                            R.set(i, j, this.Rdiag[i]);
                                        }
                                        else {
                                            R.set(i, j, 0.0);
                                        }
                                    }
                                }
                                return R;
                            };
                            QR.prototype.getQ = function () {
                                var Q = new org.mwg.ml.common.matrix.Matrix(null, this.m, this.n);
                                for (var k = this.n - 1; k >= 0; k--) {
                                    for (var i = 0; i < this.m; i++) {
                                        Q.set(i, k, 0.0);
                                    }
                                    Q.set(k, k, 1.0);
                                    for (var j = k; j < this.n; j++) {
                                        if (this.QR.get(k, k) != 0) {
                                            var s = 0.0;
                                            for (var i = k; i < this.m; i++) {
                                                s += this.QR.get(i, k) * Q.get(i, j);
                                            }
                                            s = -s / this.QR.get(k, k);
                                            for (var i = k; i < this.m; i++) {
                                                Q.add(i, j, s * this.QR.get(i, k));
                                            }
                                        }
                                    }
                                }
                                return Q;
                            };
                            QR.prototype.solve = function (B) {
                                if (B.rows() != this.m) {
                                    throw new Error("Matrix row dimensions must agree.");
                                }
                                if (!this.isFullRank()) {
                                    throw new Error("Matrix is rank deficient.");
                                }
                                var nx = B.columns();
                                var X = B.clone();
                                for (var k = 0; k < this.n; k++) {
                                    for (var j = 0; j < nx; j++) {
                                        var s = 0.0;
                                        for (var i = k; i < this.m; i++) {
                                            s += this.QR.get(i, k) * X.get(i, j);
                                        }
                                        s = -s / this.QR.get(k, k);
                                        for (var i = k; i < this.m; i++) {
                                            X.add(i, j, s * this.QR.get(i, k));
                                        }
                                    }
                                }
                                for (var k = this.n - 1; k >= 0; k--) {
                                    for (var j = 0; j < nx; j++) {
                                        X.set(k, j, X.get(k, j) / this.Rdiag[k]);
                                    }
                                    for (var i = 0; i < k; i++) {
                                        for (var j = 0; j < nx; j++) {
                                            X.add(i, j, -X.get(k, j) * this.QR.get(i, k));
                                        }
                                    }
                                }
                                return (org.mwg.ml.common.matrix.jamasolver.QR.getMatrix(X, 0, this.n - 1, 0, nx - 1));
                            };
                            QR.getMatrix = function (B, i0, i1, j0, j1) {
                                var X = new org.mwg.ml.common.matrix.Matrix(null, i1 - i0 + 1, j1 - j0 + 1);
                                try {
                                    for (var i = i0; i <= i1; i++) {
                                        for (var j = j0; j <= j1; j++) {
                                            X.set(i - i0, j - j0, B.get(i, j));
                                        }
                                    }
                                }
                                catch ($ex$) {
                                    if ($ex$ instanceof Error) {
                                        var e = $ex$;
                                        {
                                            throw new Error("Submatrix indices");
                                        }
                                    }
                                    else {
                                        throw $ex$;
                                    }
                                }
                                return X;
                            };
                            return QR;
                        }());
                        jamasolver.QR = QR;
                        var SVD = (function () {
                            function SVD(Arg) {
                                var A = Arg.clone();
                                this.m = Arg.rows();
                                this.n = Arg.columns();
                                var nu = Math.min(this.m, this.n);
                                this.s = new Float64Array(Math.min(this.m + 1, this.n));
                                this.U = new org.mwg.ml.common.matrix.Matrix(null, this.m, nu);
                                this.V = new org.mwg.ml.common.matrix.Matrix(null, this.n, this.n);
                                var e = new Float64Array(this.n);
                                var work = new Float64Array(this.m);
                                var wantu = true;
                                var wantv = true;
                                var nct = Math.min(this.m - 1, this.n);
                                var nrt = Math.max(0, Math.min(this.n - 2, this.m));
                                for (var k = 0; k < Math.max(nct, nrt); k++) {
                                    if (k < nct) {
                                        this.s[k] = 0;
                                        for (var i = k; i < this.m; i++) {
                                            this.s[k] = org.mwg.ml.common.matrix.jamasolver.Utils.hypot(this.s[k], A.get(i, k));
                                        }
                                        if (this.s[k] != 0.0) {
                                            if (A.get(k, k) < 0.0) {
                                                this.s[k] = -this.s[k];
                                            }
                                            for (var i = k; i < this.m; i++) {
                                                A.set(i, k, A.get(i, k) / this.s[k]);
                                            }
                                            A.add(k, k, 1.0);
                                        }
                                        this.s[k] = -this.s[k];
                                    }
                                    for (var j = k + 1; j < this.n; j++) {
                                        if ((k < nct) && (this.s[k] != 0.0)) {
                                            var t = 0;
                                            for (var i = k; i < this.m; i++) {
                                                t += A.get(i, k) * A.get(i, j);
                                            }
                                            t = -t / A.get(k, k);
                                            for (var i = k; i < this.m; i++) {
                                                A.add(i, j, +t * A.get(i, k));
                                            }
                                        }
                                        e[j] = A.get(k, j);
                                    }
                                    if (wantu && (k < nct)) {
                                        for (var i = k; i < this.m; i++) {
                                            this.U.set(i, k, A.get(i, k));
                                        }
                                    }
                                    if (k < nrt) {
                                        e[k] = 0;
                                        for (var i = k + 1; i < this.n; i++) {
                                            e[k] = org.mwg.ml.common.matrix.jamasolver.Utils.hypot(e[k], e[i]);
                                        }
                                        if (e[k] != 0.0) {
                                            if (e[k + 1] < 0.0) {
                                                e[k] = -e[k];
                                            }
                                            for (var i = k + 1; i < this.n; i++) {
                                                e[i] /= e[k];
                                            }
                                            e[k + 1] += 1.0;
                                        }
                                        e[k] = -e[k];
                                        if ((k + 1 < this.m) && (e[k] != 0.0)) {
                                            for (var i = k + 1; i < this.m; i++) {
                                                work[i] = 0.0;
                                            }
                                            for (var j = k + 1; j < this.n; j++) {
                                                for (var i = k + 1; i < this.m; i++) {
                                                    work[i] += e[j] * A.get(i, j);
                                                }
                                            }
                                            for (var j = k + 1; j < this.n; j++) {
                                                var t = -e[j] / e[k + 1];
                                                for (var i = k + 1; i < this.m; i++) {
                                                    A.add(i, j, t * work[i]);
                                                }
                                            }
                                        }
                                        if (wantv) {
                                            for (var i = k + 1; i < this.n; i++) {
                                                this.V.set(i, k, e[i]);
                                            }
                                        }
                                    }
                                }
                                var p = Math.min(this.n, this.m + 1);
                                if (nct < this.n) {
                                    this.s[nct] = A.get(nct, nct);
                                }
                                if (this.m < p) {
                                    this.s[p - 1] = 0.0;
                                }
                                if (nrt + 1 < p) {
                                    e[nrt] = A.get(nrt, p - 1);
                                }
                                e[p - 1] = 0.0;
                                if (wantu) {
                                    for (var j = nct; j < nu; j++) {
                                        for (var i = 0; i < this.m; i++) {
                                            this.U.set(i, j, 0.0);
                                        }
                                        this.U.set(j, j, 1.0);
                                    }
                                    for (var k = nct - 1; k >= 0; k--) {
                                        if (this.s[k] != 0.0) {
                                            for (var j = k + 1; j < nu; j++) {
                                                var t = 0;
                                                for (var i = k; i < this.m; i++) {
                                                    t += this.U.get(i, k) * this.U.get(i, j);
                                                }
                                                t = -t / this.U.get(k, k);
                                                for (var i = k; i < this.m; i++) {
                                                    this.U.add(i, j, t * this.U.get(i, k));
                                                }
                                            }
                                            for (var i = k; i < this.m; i++) {
                                                this.U.set(i, k, -this.U.get(i, k));
                                            }
                                            this.U.set(k, k, 1.0 + this.U.get(k, k));
                                            for (var i = 0; i < k - 1; i++) {
                                                this.U.set(i, k, 0.0);
                                            }
                                        }
                                        else {
                                            for (var i = 0; i < this.m; i++) {
                                                this.U.set(i, k, 0.0);
                                            }
                                            this.U.set(k, k, 1.0);
                                        }
                                    }
                                }
                                if (wantv) {
                                    for (var k = this.n - 1; k >= 0; k--) {
                                        if ((k < nrt) && (e[k] != 0.0)) {
                                            for (var j = k + 1; j < nu; j++) {
                                                var t = 0;
                                                for (var i = k + 1; i < this.n; i++) {
                                                    t += this.V.get(i, k) * this.V.get(i, j);
                                                }
                                                t = -t / this.V.get(k + 1, k);
                                                for (var i = k + 1; i < this.n; i++) {
                                                    this.V.add(i, j, t * this.V.get(i, k));
                                                }
                                            }
                                        }
                                        for (var i = 0; i < this.n; i++) {
                                            this.V.set(i, k, 0.0);
                                        }
                                        this.V.set(k, k, 1.0);
                                    }
                                }
                                var pp = p - 1;
                                var iter = 0;
                                var eps = Math.pow(2.0, -52.0);
                                var tiny = Math.pow(2.0, -966.0);
                                while (p > 0) {
                                    var k = void 0, kase = void 0;
                                    for (k = p - 2; k >= -1; k--) {
                                        if (k == -1) {
                                            break;
                                        }
                                        if (Math.abs(e[k]) <= tiny + eps * (Math.abs(this.s[k]) + Math.abs(this.s[k + 1]))) {
                                            e[k] = 0.0;
                                            break;
                                        }
                                    }
                                    if (k == p - 2) {
                                        kase = 4;
                                    }
                                    else {
                                        var ks = void 0;
                                        for (ks = p - 1; ks >= k; ks--) {
                                            if (ks == k) {
                                                break;
                                            }
                                            var t = (ks != p ? Math.abs(e[ks]) : 0.) + (ks != k + 1 ? Math.abs(e[ks - 1]) : 0.);
                                            if (Math.abs(this.s[ks]) <= tiny + eps * t) {
                                                this.s[ks] = 0.0;
                                                break;
                                            }
                                        }
                                        if (ks == k) {
                                            kase = 3;
                                        }
                                        else if (ks == p - 1) {
                                            kase = 1;
                                        }
                                        else {
                                            kase = 2;
                                            k = ks;
                                        }
                                    }
                                    k++;
                                    switch (kase) {
                                        case 1:
                                            {
                                                var f = e[p - 2];
                                                e[p - 2] = 0.0;
                                                for (var j = p - 2; j >= k; j--) {
                                                    var t = org.mwg.ml.common.matrix.jamasolver.Utils.hypot(this.s[j], f);
                                                    var cs = this.s[j] / t;
                                                    var sn = f / t;
                                                    this.s[j] = t;
                                                    if (j != k) {
                                                        f = -sn * e[j - 1];
                                                        e[j - 1] = cs * e[j - 1];
                                                    }
                                                    if (wantv) {
                                                        for (var i = 0; i < this.n; i++) {
                                                            t = cs * this.V.get(i, j) + sn * this.V.get(i, p - 1);
                                                            this.V.set(i, p - 1, -sn * this.V.get(i, j) + cs * this.V.get(i, p - 1));
                                                            this.V.set(i, j, t);
                                                        }
                                                    }
                                                }
                                            }
                                            break;
                                        case 2:
                                            {
                                                var f = e[k - 1];
                                                e[k - 1] = 0.0;
                                                for (var j = k; j < p; j++) {
                                                    var t = org.mwg.ml.common.matrix.jamasolver.Utils.hypot(this.s[j], f);
                                                    var cs = this.s[j] / t;
                                                    var sn = f / t;
                                                    this.s[j] = t;
                                                    f = -sn * e[j];
                                                    e[j] = cs * e[j];
                                                    if (wantu) {
                                                        for (var i = 0; i < this.m; i++) {
                                                            t = cs * this.U.get(i, j) + sn * this.U.get(i, k - 1);
                                                            this.U.set(i, k - 1, -sn * this.U.get(i, j) + cs * this.U.get(i, k - 1));
                                                            this.U.set(i, j, t);
                                                        }
                                                    }
                                                }
                                            }
                                            break;
                                        case 3:
                                            {
                                                var scale = Math.max(Math.max(Math.max(Math.max(Math.abs(this.s[p - 1]), Math.abs(this.s[p - 2])), Math.abs(e[p - 2])), Math.abs(this.s[k])), Math.abs(e[k]));
                                                var sp = this.s[p - 1] / scale;
                                                var spm1 = this.s[p - 2] / scale;
                                                var epm1 = e[p - 2] / scale;
                                                var sk = this.s[k] / scale;
                                                var ek = e[k] / scale;
                                                var b = ((spm1 + sp) * (spm1 - sp) + epm1 * epm1) / 2.0;
                                                var c = (sp * epm1) * (sp * epm1);
                                                var shift = 0.0;
                                                if ((b != 0.0) || (c != 0.0)) {
                                                    shift = Math.sqrt(b * b + c);
                                                    if (b < 0.0) {
                                                        shift = -shift;
                                                    }
                                                    shift = c / (b + shift);
                                                }
                                                var f = (sk + sp) * (sk - sp) + shift;
                                                var g = sk * ek;
                                                for (var j = k; j < p - 1; j++) {
                                                    var t = org.mwg.ml.common.matrix.jamasolver.Utils.hypot(f, g);
                                                    var cs = f / t;
                                                    var sn = g / t;
                                                    if (j != k) {
                                                        e[j - 1] = t;
                                                    }
                                                    f = cs * this.s[j] + sn * e[j];
                                                    e[j] = cs * e[j] - sn * this.s[j];
                                                    g = sn * this.s[j + 1];
                                                    this.s[j + 1] = cs * this.s[j + 1];
                                                    if (wantv) {
                                                        for (var i = 0; i < this.n; i++) {
                                                            t = cs * this.V.get(i, j) + sn * this.V.get(i, j + 1);
                                                            this.V.set(i, j + 1, -sn * this.V.get(i, j) + cs * this.V.get(i, j + 1));
                                                            this.V.set(i, j, t);
                                                        }
                                                    }
                                                    t = org.mwg.ml.common.matrix.jamasolver.Utils.hypot(f, g);
                                                    cs = f / t;
                                                    sn = g / t;
                                                    this.s[j] = t;
                                                    f = cs * e[j] + sn * this.s[j + 1];
                                                    this.s[j + 1] = -sn * e[j] + cs * this.s[j + 1];
                                                    g = sn * e[j + 1];
                                                    e[j + 1] = cs * e[j + 1];
                                                    if (wantu && (j < this.m - 1)) {
                                                        for (var i = 0; i < this.m; i++) {
                                                            t = cs * this.U.get(i, j) + sn * this.U.get(i, j + 1);
                                                            this.U.set(i, j + 1, -sn * this.U.get(i, j) + cs * this.U.get(i, j + 1));
                                                            this.U.set(i, j, t);
                                                        }
                                                    }
                                                }
                                                e[p - 2] = f;
                                                iter = iter + 1;
                                            }
                                            break;
                                        case 4:
                                            {
                                                if (this.s[k] <= 0.0) {
                                                    this.s[k] = (this.s[k] < 0.0 ? -this.s[k] : 0.0);
                                                    if (wantv) {
                                                        for (var i = 0; i <= pp; i++) {
                                                            this.V.set(i, k, -this.V.get(i, k));
                                                        }
                                                    }
                                                }
                                                while (k < pp) {
                                                    if (this.s[k] >= this.s[k + 1]) {
                                                        break;
                                                    }
                                                    var t = this.s[k];
                                                    this.s[k] = this.s[k + 1];
                                                    this.s[k + 1] = t;
                                                    if (wantv && (k < this.n - 1)) {
                                                        for (var i = 0; i < this.n; i++) {
                                                            t = this.V.get(i, k + 1);
                                                            this.V.set(i, k + 1, this.V.get(i, k));
                                                            this.V.set(i, k, t);
                                                        }
                                                    }
                                                    if (wantu && (k < this.m - 1)) {
                                                        for (var i = 0; i < this.m; i++) {
                                                            t = this.U.get(i, k + 1);
                                                            this.U.set(i, k + 1, this.U.get(i, k));
                                                            this.U.set(i, k, t);
                                                        }
                                                    }
                                                    k++;
                                                }
                                                iter = 0;
                                                p--;
                                            }
                                            break;
                                    }
                                }
                            }
                            SVD.prototype.factor = function (A, workInPlace) {
                                return new org.mwg.ml.common.matrix.jamasolver.SVD(A);
                            };
                            SVD.prototype.getU = function () {
                                return this.U;
                            };
                            SVD.prototype.getVt = function () {
                                return org.mwg.ml.common.matrix.Matrix.transpose(this.getV());
                            };
                            SVD.prototype.getV = function () {
                                return this.V;
                            };
                            SVD.prototype.getSingularValues = function () {
                                return this.s;
                            };
                            SVD.prototype.getSMatrix = function () {
                                var X = new org.mwg.ml.common.matrix.Matrix(null, Math.min(this.m, this.n), this.n);
                                for (var i = 0; i < this.s.length; i++) {
                                    if (i < this.m && i < this.n) {
                                        X.set(i, i, this.s[i]);
                                    }
                                }
                                return X;
                            };
                            SVD.prototype.getS = function () {
                                return this.s;
                            };
                            SVD.prototype.norm2 = function () {
                                return this.s[0];
                            };
                            SVD.prototype.cond = function () {
                                return this.s[0] / this.s[Math.min(this.m, this.n) - 1];
                            };
                            SVD.prototype.rank = function () {
                                var eps = Math.pow(2.0, -52.0);
                                var tol = Math.max(this.m, this.n) * this.s[0] * eps;
                                var r = 0;
                                for (var i = 0; i < this.s.length; i++) {
                                    if (this.s[i] > tol) {
                                        r++;
                                    }
                                }
                                return r;
                            };
                            SVD.serialVersionUID = 1;
                            return SVD;
                        }());
                        jamasolver.SVD = SVD;
                        var Utils = (function () {
                            function Utils() {
                            }
                            Utils.hypot = function (a, b) {
                                var r;
                                if (Math.abs(a) > Math.abs(b)) {
                                    r = b / a;
                                    r = Math.abs(a) * Math.sqrt(1 + r * r);
                                }
                                else if (b != 0) {
                                    r = a / b;
                                    r = Math.abs(b) * Math.sqrt(1 + r * r);
                                }
                                else {
                                    r = 0.0;
                                }
                                return r;
                            };
                            return Utils;
                        }());
                        jamasolver.Utils = Utils;
                    })(jamasolver = matrix.jamasolver || (matrix.jamasolver = {}));
                    var operation;
                    (function (operation) {
                        var Gaussian1D = (function () {
                            function Gaussian1D() {
                            }
                            Gaussian1D.getCovariance = function (sum, sumSq, total) {
                                return (sumSq - (sum * sum) / total) / (total - 1);
                            };
                            Gaussian1D.getDensity = function (sum, sumSq, total, feature) {
                                if (total < 2) {
                                    return 0;
                                }
                                var avg = sum / total;
                                var cov = org.mwg.ml.common.matrix.operation.Gaussian1D.getCovariance(sum, sumSq, total);
                                return 1 / Math.sqrt(2 * Math.PI * cov) * Math.exp(-(feature - avg) * (feature - avg) / (2 * cov));
                            };
                            Gaussian1D.getDensityArray = function (sum, sumSq, total, feature) {
                                if (total < 2) {
                                    return null;
                                }
                                var avg = sum / total;
                                var cov = org.mwg.ml.common.matrix.operation.Gaussian1D.getCovariance(sum, sumSq, total);
                                var exp = 1 / Math.sqrt(2 * Math.PI * cov);
                                var proba = new Float64Array(feature.length);
                                for (var i = 0; i < feature.length; i++) {
                                    proba[i] = exp * Math.exp(-(feature[i] - avg) * (feature[i] - avg) / (2 * cov));
                                }
                                return proba;
                            };
                            return Gaussian1D;
                        }());
                        operation.Gaussian1D = Gaussian1D;
                        var MultivariateNormalDistribution = (function () {
                            function MultivariateNormalDistribution(means, cov, allowSingular) {
                                this.means = means;
                                if (cov != null) {
                                    this.covariance = cov;
                                    this.covDiag = new Float64Array(cov.rows());
                                    for (var i = 0; i < this.covDiag.length; i++) {
                                        this.covDiag[i] = cov.get(i, i);
                                    }
                                    this.pinvsvd = new org.mwg.ml.common.matrix.operation.PInvSVD();
                                    this.pinvsvd.factor(this.covariance, false);
                                    this.inv = this.pinvsvd.getPInv();
                                    this.det = this.pinvsvd.getDeterminant();
                                    this.rank = this.pinvsvd.getRank();
                                    if (!allowSingular && this.rank < cov.rows()) {
                                        this.covariance = cov.clone();
                                        var temp = new Float64Array(this.covDiag.length);
                                        for (var i = 0; i < this.covDiag.length; i++) {
                                            temp[i] = Math.sqrt(this.covDiag[i]);
                                        }
                                        for (var i = 0; i < this.covDiag.length; i++) {
                                            for (var j = i + 1; j < this.covDiag.length; j++) {
                                                var d = this.covariance.get(i, j) - 0.0001 * temp[i] * temp[j];
                                                this.covariance.set(i, j, d);
                                                this.covariance.set(j, i, d);
                                            }
                                        }
                                        this.pinvsvd = new org.mwg.ml.common.matrix.operation.PInvSVD();
                                        this.pinvsvd.factor(this.covariance, false);
                                        this.inv = this.pinvsvd.getPInv();
                                        this.det = this.pinvsvd.getDeterminant();
                                        this.rank = this.pinvsvd.getRank();
                                    }
                                }
                            }
                            MultivariateNormalDistribution.prototype.getMin = function () {
                                return this.min;
                            };
                            MultivariateNormalDistribution.prototype.getMax = function () {
                                return this.max;
                            };
                            MultivariateNormalDistribution.prototype.getAvg = function () {
                                return this.means;
                            };
                            MultivariateNormalDistribution.prototype.getCovDiag = function () {
                                return this.covDiag;
                            };
                            MultivariateNormalDistribution.prototype.setMin = function (min) {
                                this.min = min;
                            };
                            MultivariateNormalDistribution.prototype.setMax = function (max) {
                                this.max = max;
                            };
                            MultivariateNormalDistribution.getCovariance = function (sum, sumsquares, total) {
                                if (total < 2) {
                                    return null;
                                }
                                var features = sum.length;
                                var avg = new Float64Array(features);
                                for (var i = 0; i < features; i++) {
                                    avg[i] = sum[i] / total;
                                }
                                var covariances = new Float64Array(features * features);
                                var correction = total;
                                correction = correction / (total - 1);
                                var count = 0;
                                for (var i = 0; i < features; i++) {
                                    for (var j = i; j < features; j++) {
                                        covariances[i * features + j] = (sumsquares[count] / total - avg[i] * avg[j]) * correction;
                                        covariances[j * features + i] = covariances[i * features + j];
                                        count++;
                                    }
                                }
                                var cov = new org.mwg.ml.common.matrix.Matrix(covariances, features, features);
                                return cov;
                            };
                            MultivariateNormalDistribution.getDistribution = function (sum, sumsquares, total, allowSingular) {
                                if (total < 2) {
                                    return null;
                                }
                                var features = sum.length;
                                var avg = new Float64Array(features);
                                for (var i = 0; i < features; i++) {
                                    avg[i] = sum[i] / total;
                                }
                                var covariances = new Float64Array(features * features);
                                var correction = total;
                                correction = correction / (total - 1);
                                var count = 0;
                                for (var i = 0; i < features; i++) {
                                    for (var j = i; j < features; j++) {
                                        covariances[i * features + j] = (sumsquares[count] / total - avg[i] * avg[j]) * correction;
                                        covariances[j * features + i] = covariances[i * features + j];
                                        count++;
                                    }
                                }
                                var cov = new org.mwg.ml.common.matrix.Matrix(covariances, features, features);
                                return new org.mwg.ml.common.matrix.operation.MultivariateNormalDistribution(avg, cov, allowSingular);
                            };
                            MultivariateNormalDistribution.prototype.density = function (features, normalizeOnAvg) {
                                if (normalizeOnAvg) {
                                    return this.getExponentTerm(features);
                                }
                                else {
                                    return Math.pow(2 * Math.PI, -0.5 * this.rank) * Math.pow(this.det, -0.5) * this.getExponentTerm(features);
                                }
                            };
                            MultivariateNormalDistribution.prototype.getExponentTerm = function (features) {
                                var f = new Float64Array(features.length);
                                java.lang.System.arraycopy(features, 0, f, 0, features.length);
                                for (var i = 0; i < features.length; i++) {
                                    f[i] = f[i] - this.means[i];
                                }
                                var ft = new org.mwg.ml.common.matrix.Matrix(f, 1, f.length);
                                var ftt = new org.mwg.ml.common.matrix.Matrix(f, f.length, 1);
                                var res = org.mwg.ml.common.matrix.Matrix.multiply(ft, this.inv);
                                var res2 = org.mwg.ml.common.matrix.Matrix.multiply(res, ftt);
                                var d = Math.exp(-0.5 * res2.get(0, 0));
                                return d;
                            };
                            MultivariateNormalDistribution.prototype.clone = function (avg) {
                                var res = new org.mwg.ml.common.matrix.operation.MultivariateNormalDistribution(avg, null, false);
                                res.pinvsvd = this.pinvsvd;
                                res.inv = this.inv;
                                res.det = this.det;
                                res.rank = this.rank;
                                res.covDiag = this.covDiag;
                                return res;
                            };
                            return MultivariateNormalDistribution;
                        }());
                        operation.MultivariateNormalDistribution = MultivariateNormalDistribution;
                        var PInvSVD = (function () {
                            function PInvSVD() {
                            }
                            PInvSVD.prototype.getRank = function () {
                                return this.rank;
                            };
                            PInvSVD.prototype.getDeterminant = function () {
                                return this.det;
                            };
                            PInvSVD.prototype.factor = function (A, invertInPlace) {
                                this._svd = org.mwg.ml.common.matrix.Matrix.defaultEngine().decomposeSVD(A, invertInPlace);
                                var svd = new Array(3);
                                svd[0] = this._svd.getU();
                                svd[1] = this._svd.getSMatrix();
                                svd[2] = this._svd.getVt();
                                var V = this._svd.getVt();
                                this.S = this._svd.getSMatrix().clone();
                                var maxSingular = 0;
                                var dim = Math.min(this.S.columns(), this.S.rows());
                                for (var i = 0; i < dim; i++) {
                                    if (this.S.get(i, i) > maxSingular)
                                        maxSingular = this.S.get(i, i);
                                }
                                var tau = Math.pow(2, -46) * Math.max(A.columns(), A.rows()) * maxSingular;
                                this.rank = 0;
                                this.det = 1;
                                if (maxSingular != 0.0) {
                                    for (var i = 0; i < dim; i++) {
                                        var s = this.S.get(i, i);
                                        if (s < tau)
                                            this.S.set(i, i, 0);
                                        else {
                                            this.S.set(i, i, 1 / s);
                                            this.det = this.det * s;
                                            this.rank++;
                                        }
                                    }
                                }
                                var temp = org.mwg.ml.common.matrix.Matrix.multiplyTranspose(org.mwg.ml.common.matrix.TransposeType.TRANSPOSE, V, org.mwg.ml.common.matrix.TransposeType.TRANSPOSE, this.S);
                                this.pinv = org.mwg.ml.common.matrix.Matrix.multiplyTranspose(org.mwg.ml.common.matrix.TransposeType.NOTRANSPOSE, temp, org.mwg.ml.common.matrix.TransposeType.TRANSPOSE, this._svd.getU());
                                return this;
                            };
                            PInvSVD.prototype.getSvd = function () {
                                return this._svd;
                            };
                            PInvSVD.prototype.getInvDeterminant = function () {
                                return this.S;
                            };
                            PInvSVD.prototype.getPInv = function () {
                                return this.pinv;
                            };
                            return PInvSVD;
                        }());
                        operation.PInvSVD = PInvSVD;
                        var PolynomialFit = (function () {
                            function PolynomialFit(degree) {
                                this.degree = 0;
                                this.degree = degree;
                            }
                            PolynomialFit.prototype.getCoef = function () {
                                return this.coef.data();
                            };
                            PolynomialFit.prototype.fit = function (samplePoints, observations) {
                                var y = new org.mwg.ml.common.matrix.Matrix(observations, observations.length, 1);
                                var a = new org.mwg.ml.common.matrix.Matrix(null, y.rows(), this.degree + 1);
                                for (var i = 0; i < observations.length; i++) {
                                    var obs = 1;
                                    for (var j = 0; j < this.degree + 1; j++) {
                                        a.set(i, j, obs);
                                        obs *= samplePoints[i];
                                    }
                                }
                                this.coef = org.mwg.ml.common.matrix.Matrix.defaultEngine().solveQR(a, y, true, org.mwg.ml.common.matrix.TransposeType.NOTRANSPOSE);
                            };
                            PolynomialFit.extrapolate = function (time, weights) {
                                var result = 0;
                                var power = 1;
                                for (var j = 0; j < weights.length; j++) {
                                    result += weights[j] * power;
                                    power = power * time;
                                }
                                return result;
                            };
                            return PolynomialFit;
                        }());
                        operation.PolynomialFit = PolynomialFit;
                    })(operation = matrix.operation || (matrix.operation = {}));
                })(matrix = common.matrix || (common.matrix = {}));
            })(common = ml.common || (ml.common = {}));
            var neuralnet;
            (function (neuralnet) {
                var Buffer = (function () {
                    function Buffer(capacity, dimension, lastWeightIsOne, clearAfterFull) {
                        this._capacityFull = 0;
                        this._index = new java.util.HashMap();
                        this._counts = new Int32Array(capacity);
                        this._values = new Array(capacity);
                        for (var _values_d1 = 0; _values_d1 < capacity; _values_d1++) {
                            this._values[_values_d1] = new Float64Array(this._dim);
                        }
                        ;
                        this._dim = dimension;
                        this._capacity = capacity;
                        this._lastWeightIsOne = lastWeightIsOne;
                        this._clearAfterFull = clearAfterFull;
                    }
                    Buffer.prototype.insertInside = function (indexpos, position, msgId, value) {
                        var v = this._values[indexpos];
                        v[position] = value;
                        this._counts[indexpos]++;
                        if (this._counts[indexpos] == this._dim) {
                            if (this._clearAfterFull) {
                                this.clearBuffer(indexpos, msgId);
                            }
                            return v;
                        }
                        else {
                            return null;
                        }
                    };
                    Buffer.prototype.removeFromBuffer = function (msgId) {
                        var indexpos = this._index.get(msgId);
                        if (indexpos != null) {
                            this.clearBuffer(indexpos, msgId);
                        }
                    };
                    Buffer.prototype.clearBuffer = function (id, msgId) {
                        this._values[id] = new Float64Array(this._dim);
                        this._counts[id] = 0;
                        this._index.remove(msgId);
                        this._capacityFull--;
                    };
                    Buffer.prototype.getArray = function (msgId, clear) {
                        var indexpos = this._index.get(msgId);
                        if (indexpos != null) {
                            var v = this._values[indexpos];
                            if (clear) {
                                this.clearBuffer(indexpos, msgId);
                                return v;
                            }
                            else {
                                return v;
                            }
                        }
                        else {
                            return null;
                        }
                    };
                    Buffer.prototype.insertArray = function (msgId, values) {
                        var indexpos = this._index.get(msgId);
                        if (indexpos != null) {
                            java.lang.System.arraycopy(values, 0, this._values[indexpos], 0, values.length);
                            this._counts[indexpos] = values.length;
                        }
                        else {
                            if (this._capacityFull == this._capacity) {
                                throw new Error("Buffer is full");
                            }
                            else {
                                var pos = -1;
                                for (var i = 0; i < this._capacity; i++) {
                                    if (this._counts[i] == 0) {
                                        pos = i;
                                        break;
                                    }
                                }
                                this._index.put(msgId, pos);
                                java.lang.System.arraycopy(values, 0, this._values[pos], 0, values.length);
                                this._counts[pos] = values.length;
                                this._capacityFull++;
                            }
                        }
                    };
                    Buffer.prototype.insert = function (msgId, position, value) {
                        var indexpos = this._index.get(msgId);
                        if (indexpos != null) {
                            return this.insertInside(indexpos, position, msgId, value);
                        }
                        else {
                            if (this._capacityFull == this._capacity) {
                                throw new Error("Buffer is full");
                            }
                            else {
                                var pos = -1;
                                for (var i = 0; i < this._capacity; i++) {
                                    if (this._counts[i] == 0) {
                                        pos = i;
                                        break;
                                    }
                                }
                                this._index.put(msgId, pos);
                                if (this._lastWeightIsOne) {
                                    this._counts[pos] = 1;
                                    this._values[pos][this._dim - 1] = 1;
                                }
                                return this.insertInside(pos, position, msgId, value);
                            }
                        }
                    };
                    return Buffer;
                }());
                neuralnet.Buffer = Buffer;
                var BufferManager = (function () {
                    function BufferManager() {
                    }
                    BufferManager.getBuffer = function (id, dimension, bufferType, lastWeightIsOne, clearAfterFull) {
                        var map = null;
                        if (bufferType == BufferManager.INPUT) {
                            map = BufferManager.inputBuffers;
                        }
                        else if (bufferType == BufferManager.OUTPUT) {
                            map = BufferManager.outputBuffers;
                        }
                        else if (bufferType == BufferManager.INTEGRATION) {
                            map = BufferManager.integrationBuffers;
                        }
                        else if (bufferType == BufferManager.ACTIVATION) {
                            map = BufferManager.activationBuffers;
                        }
                        else {
                            throw new Error("Buffer not recognizable");
                        }
                        var temp = map.get(id);
                        if (temp != null) {
                            return temp;
                        }
                        else {
                            if (lastWeightIsOne) {
                                temp = new org.mwg.ml.neuralnet.Buffer(BufferManager.CAPACITY, dimension + 1, lastWeightIsOne, clearAfterFull);
                            }
                            else {
                                temp = new org.mwg.ml.neuralnet.Buffer(BufferManager.CAPACITY, dimension, lastWeightIsOne, clearAfterFull);
                            }
                            map.put(id, temp);
                            return temp;
                        }
                    };
                    BufferManager.CAPACITY = 10;
                    BufferManager.INPUT = 0;
                    BufferManager.OUTPUT = 1;
                    BufferManager.INTEGRATION = 2;
                    BufferManager.ACTIVATION = 3;
                    BufferManager.inputBuffers = new java.util.HashMap();
                    BufferManager.outputBuffers = new java.util.HashMap();
                    BufferManager.integrationBuffers = new java.util.HashMap();
                    BufferManager.activationBuffers = new java.util.HashMap();
                    return BufferManager;
                }());
                neuralnet.BufferManager = BufferManager;
                var NeuralNode = (function (_super) {
                    __extends(NeuralNode, _super);
                    function NeuralNode(p_world, p_time, p_id, p_graph) {
                        _super.call(this, p_world, p_time, p_id, p_graph);
                    }
                    NeuralNode.prototype.configure = function (inputs, outputs, hiddenlayers, nodesPerLayer) {
                        var internalNodes = new java.util.ArrayList();
                        internalNodes.add(this);
                        var layer = 0;
                        var previousLayer = new java.util.ArrayList();
                        for (var i = 0; i < inputs; i++) {
                            var inputNode = this.createNewNode(org.mwg.ml.neuralnet.NeuralNodeType.INPUT);
                            this.forwardConnect(inputNode);
                            internalNodes.add(inputNode);
                            previousLayer.add(inputNode);
                        }
                        var nextLayer = new java.util.ArrayList();
                        layer++;
                        for (var i = 0; i < hiddenlayers; i++) {
                            for (var j = 0; j < nodesPerLayer; j++) {
                                var hidden = this.createNewNode(org.mwg.ml.neuralnet.NeuralNodeType.HIDDEN);
                                nextLayer.add(hidden);
                                internalNodes.add(hidden);
                                for (var k = 0; k < previousLayer.size(); k++) {
                                    previousLayer.get(k).forwardConnect(hidden);
                                }
                            }
                            previousLayer = nextLayer;
                            nextLayer = new java.util.ArrayList();
                            layer++;
                        }
                        for (var i = 0; i < outputs; i++) {
                            var output = this.createNewNode(org.mwg.ml.neuralnet.NeuralNodeType.OUTPUT);
                            for (var k = 0; k < previousLayer.size(); k++) {
                                previousLayer.get(k).forwardConnect(output);
                            }
                            output.forwardConnect(this);
                            internalNodes.add(output);
                        }
                        for (var i = 0; i < internalNodes.size(); i++) {
                            internalNodes.get(i).initWeightsRadomly(0.1);
                            internalNodes.get(i).free();
                        }
                        return this;
                    };
                    NeuralNode.prototype.initWeightsRadomly = function (maxValue) {
                        var state = this.unphasedState();
                        var type = state.getFromKeyWithDefault(NeuralNode.NODE_TYPE, org.mwg.ml.neuralnet.NeuralNodeType.HIDDEN);
                        if (type == org.mwg.ml.neuralnet.NeuralNodeType.HIDDEN || type == org.mwg.ml.neuralnet.NeuralNodeType.OUTPUT) {
                            var input = state.getFromKey(NeuralNode.INPUTS);
                            var weights = new Float64Array(input.size() + 1);
                            for (var i = 0; i < weights.length; i++) {
                                weights[i] = NeuralNode.random.nextDouble() * maxValue;
                            }
                            state.setFromKey(NeuralNode.WEIGHTS, org.mwg.Type.DOUBLE_ARRAY, weights);
                        }
                    };
                    NeuralNode.prototype.forwardConnect = function (inputNode) {
                        var outputs = this.getOrCreateRel(NeuralNode.OUTPUTS);
                        outputs.add(inputNode.id());
                        var pos = outputs.size() - 1;
                        var map = this.getOrCreate(NeuralNode.OUTPUTS_MAP, org.mwg.Type.LONG_TO_LONG_MAP);
                        map.put(inputNode.id(), pos);
                        var inputs = inputNode.getOrCreateRel(NeuralNode.INPUTS);
                        inputs.add(this.id());
                        var posint = inputs.size() - 1;
                        var mapin = inputNode.getOrCreate(NeuralNode.INPUTS_MAP, org.mwg.Type.LONG_TO_LONG_MAP);
                        mapin.put(this.id(), posint);
                    };
                    NeuralNode.prototype.createNewNode = function (neuralNodeType) {
                        var temp = this.graph().newTypedNode(this.world(), this.time(), NeuralNode.NAME);
                        temp.setProperty(NeuralNode.NODE_TYPE, org.mwg.Type.INT, neuralNodeType);
                        return temp;
                    };
                    NeuralNode.integrationFct = function (buffer, weights) {
                        var value = 0;
                        for (var i = 0; i < weights.length; i++) {
                            value += weights[i] * buffer[i];
                        }
                        return value;
                    };
                    NeuralNode.activationFunction = function (value, type) {
                        if (type == org.mwg.ml.neuralnet.NeuralNodeType.HIDDEN) {
                            return 1 / (1 + Math.exp(-value));
                        }
                        else {
                            return value;
                        }
                    };
                    NeuralNode.derivateActivationFunction = function (fctVal, value, type) {
                        if (type == org.mwg.ml.neuralnet.NeuralNodeType.HIDDEN) {
                            return fctVal * (1 - fctVal);
                        }
                        else {
                            return 1;
                        }
                    };
                    NeuralNode.calculateErr = function (calculated, target) {
                        return (target - calculated) * (target - calculated) / 2;
                    };
                    NeuralNode.calculateDerivativeErr = function (calculated, target) {
                        return -(target - calculated);
                    };
                    NeuralNode.prototype.propagate = function (senderId, state, msgId, msg, forwardPropagation, learn, learningRate, callback) {
                        var outputRel = state.getFromKey(NeuralNode.OUTPUTS);
                        for (var i = 0; i < outputRel.size(); i++) {
                            this.send(outputRel.get(i), msgId, msg, forwardPropagation, learn, learningRate, callback);
                        }
                    };
                    NeuralNode.prototype.receive = function (senderId, msgId, msg, forwardPropagation, learn, learningRate, callback) {
                        var state = this.unphasedState();
                        var type = state.getFromKeyWithDefault(NeuralNode.NODE_TYPE, org.mwg.ml.neuralnet.NeuralNodeType.HIDDEN);
                        if (forwardPropagation) {
                            if (type == org.mwg.ml.neuralnet.NeuralNodeType.INPUT) {
                                this.propagate(this.id(), state, msgId, msg, forwardPropagation, learn, learningRate, callback);
                            }
                            else if (type == org.mwg.ml.neuralnet.NeuralNodeType.HIDDEN || type == org.mwg.ml.neuralnet.NeuralNodeType.OUTPUT) {
                                var inputmap = state.getFromKey(NeuralNode.INPUTS_MAP);
                                var pos = inputmap.get(senderId);
                                var forwardBuffer = org.mwg.ml.neuralnet.BufferManager.getBuffer(this.id(), inputmap.size(), org.mwg.ml.neuralnet.BufferManager.INPUT, true, false);
                                var values = forwardBuffer.insert(msgId, pos, msg);
                                if (values != null) {
                                    var weights = state.getFromKey(NeuralNode.WEIGHTS);
                                    var integration = org.mwg.ml.neuralnet.NeuralNode.integrationFct(values, weights);
                                    var activation = org.mwg.ml.neuralnet.NeuralNode.activationFunction(integration, type);
                                    var integrationBuffer = org.mwg.ml.neuralnet.BufferManager.getBuffer(this.id(), 1, org.mwg.ml.neuralnet.BufferManager.INTEGRATION, false, false);
                                    var activationBuffer = org.mwg.ml.neuralnet.BufferManager.getBuffer(this.id(), 1, org.mwg.ml.neuralnet.BufferManager.ACTIVATION, false, false);
                                    integrationBuffer.insert(msgId, 0, integration);
                                    activationBuffer.insert(msgId, 0, activation);
                                    this.propagate(this.id(), state, msgId, activation, forwardPropagation, learn, learningRate, callback);
                                }
                            }
                            else if (type == org.mwg.ml.neuralnet.NeuralNodeType.ROOT) {
                                var inputMap = state.getFromKey(NeuralNode.INPUTS_MAP);
                                var pos = inputMap.get(senderId);
                                var forwardBuffer = org.mwg.ml.neuralnet.BufferManager.getBuffer(this.id(), inputMap.size(), org.mwg.ml.neuralnet.BufferManager.INPUT, false, true);
                                var values = forwardBuffer.insert(msgId, pos, msg);
                                if (learn) {
                                    var outputBuffer = org.mwg.ml.neuralnet.BufferManager.getBuffer(this.id(), inputMap.size(), org.mwg.ml.neuralnet.BufferManager.OUTPUT, false, false);
                                    var realoutputs = outputBuffer.getArray(msgId, false);
                                    var err = org.mwg.ml.neuralnet.NeuralNode.calculateErr(msg, realoutputs[pos]);
                                    var integrationBuffer = org.mwg.ml.neuralnet.BufferManager.getBuffer(this.id(), realoutputs.length, org.mwg.ml.neuralnet.BufferManager.INTEGRATION, false, true);
                                    var errors = integrationBuffer.insert(msgId, pos, err);
                                    if (errors != null) {
                                        outputBuffer.removeFromBuffer(msgId);
                                    }
                                    this.send(senderId, msgId, org.mwg.ml.neuralnet.NeuralNode.calculateDerivativeErr(msg, realoutputs[pos]), false, learn, learningRate, callback);
                                }
                                else {
                                    if (values != null) {
                                        if (callback != null) {
                                            callback(values);
                                        }
                                    }
                                }
                            }
                        }
                        else {
                            if (type == org.mwg.ml.neuralnet.NeuralNodeType.INPUT || type == org.mwg.ml.neuralnet.NeuralNodeType.ROOT) {
                                var outputMap = state.getFromKey(NeuralNode.OUTPUTS_MAP);
                                var pos = outputMap.get(senderId);
                                var backwardBuffer = org.mwg.ml.neuralnet.BufferManager.getBuffer(this.id(), outputMap.size(), org.mwg.ml.neuralnet.BufferManager.OUTPUT, false, true);
                                var values = backwardBuffer.insert(msgId, pos, msg);
                                if (values != null) {
                                    if (type == org.mwg.ml.neuralnet.NeuralNodeType.INPUT) {
                                        var inputRel = state.getFromKey(NeuralNode.INPUTS);
                                        for (var i = 0; i < inputRel.size(); i++) {
                                            this.send(inputRel.get(i), msgId, msg, forwardPropagation, learn, learningRate, callback);
                                        }
                                    }
                                    if (type == org.mwg.ml.neuralnet.NeuralNodeType.ROOT) {
                                        if (callback != null) {
                                            callback(new Float64Array([msgId]));
                                        }
                                    }
                                }
                            }
                            else if (type == org.mwg.ml.neuralnet.NeuralNodeType.OUTPUT || type == org.mwg.ml.neuralnet.NeuralNodeType.HIDDEN) {
                                var outputMap = state.getFromKey(NeuralNode.OUTPUTS_MAP);
                                var inputMap = state.getFromKey(NeuralNode.INPUTS_MAP);
                                var pos = outputMap.get(senderId);
                                var backwardBuffer = org.mwg.ml.neuralnet.BufferManager.getBuffer(this.id(), outputMap.size(), org.mwg.ml.neuralnet.BufferManager.OUTPUT, false, true);
                                var values = backwardBuffer.insert(msgId, pos, msg);
                                if (values != null) {
                                    var weights = state.getFromKey(NeuralNode.WEIGHTS);
                                    var integrationBuffer = org.mwg.ml.neuralnet.BufferManager.getBuffer(this.id(), 1, org.mwg.ml.neuralnet.BufferManager.INTEGRATION, false, false);
                                    var activationBuffer = org.mwg.ml.neuralnet.BufferManager.getBuffer(this.id(), 1, org.mwg.ml.neuralnet.BufferManager.ACTIVATION, false, false);
                                    var forwardBuffer = org.mwg.ml.neuralnet.BufferManager.getBuffer(this.id(), inputMap.size(), org.mwg.ml.neuralnet.BufferManager.INPUT, true, false);
                                    var integration = integrationBuffer.getArray(msgId, true);
                                    var activation = activationBuffer.getArray(msgId, true);
                                    var forward = forwardBuffer.getArray(msgId, true);
                                    var delta = org.mwg.ml.neuralnet.NeuralNode.integrationFct(values, weights);
                                    delta = delta * org.mwg.ml.neuralnet.NeuralNode.derivateActivationFunction(activation[0], integration[0], type);
                                    var newWeight = new Float64Array(weights.length);
                                    for (var i = 0; i < weights.length - 1; i++) {
                                        newWeight[i] = weights[i] - learningRate * delta * forward[i];
                                    }
                                    newWeight[weights.length - 1] = weights[weights.length - 1] - learningRate * delta;
                                    var inputs = state.getFromKey(NeuralNode.INPUTS);
                                    for (var i = 0; i < inputs.size(); i++) {
                                        this.send(inputs.get(i), msgId, delta * weights[i], forwardPropagation, learn, learningRate, callback);
                                    }
                                    state.setFromKey(NeuralNode.WEIGHTS, org.mwg.Type.DOUBLE_ARRAY, newWeight);
                                }
                            }
                        }
                    };
                    NeuralNode.prototype.send = function (outputid, msgId, msg, forwardPropagation, learn, learningRate, callback) {
                        var _this = this;
                        this.graph().lookup(this.world(), this.time(), outputid, function (result) {
                            {
                                var res = result;
                                res.receive(_this.id(), msgId, msg, forwardPropagation, learn, learningRate, callback);
                                res.free();
                            }
                        });
                    };
                    NeuralNode.NAME = "NeuralNode";
                    NeuralNode.INPUTS = "inputs";
                    NeuralNode.INPUTS_MAP = "inputs_map";
                    NeuralNode.OUTPUTS = "outputs";
                    NeuralNode.OUTPUTS_MAP = "outputs_map";
                    NeuralNode.WEIGHTS = "weights";
                    NeuralNode.NODE_TYPE = "node_type";
                    NeuralNode.random = new java.util.Random();
                    return NeuralNode;
                }(org.mwg.plugin.AbstractNode));
                neuralnet.NeuralNode = NeuralNode;
                var NeuralNodeType = (function () {
                    function NeuralNodeType() {
                    }
                    NeuralNodeType.HIDDEN = 0;
                    NeuralNodeType.INPUT = 1;
                    NeuralNodeType.OUTPUT = 2;
                    NeuralNodeType.ROOT = 3;
                    return NeuralNodeType;
                }());
                neuralnet.NeuralNodeType = NeuralNodeType;
            })(neuralnet = ml.neuralnet || (ml.neuralnet = {}));
        })(ml = mwg.ml || (mwg.ml = {}));
    })(mwg = org.mwg || (org.mwg = {}));
})(org || (org = {}));
//# sourceMappingURL=mwg.ml.js.map