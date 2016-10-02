var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="mwg.d.ts" />
var org;
(function (org) {
    var mwg;
    (function (mwg) {
        var structure;
        (function (structure) {
            var StructureActions = (function () {
                function StructureActions() {
                }
                StructureActions.nTreeInsertTo = function (path) {
                    return org.mwg.task.Actions.newTask().action(org.mwg.structure.action.NTreeInsertTo.NAME, path);
                };
                StructureActions.nTreeNearestN = function (pathOrVar) {
                    return org.mwg.task.Actions.newTask().action(org.mwg.structure.action.NTreeNearestN.NAME, pathOrVar);
                };
                StructureActions.nTreeNearestWithinRadius = function (pathOrVar) {
                    return org.mwg.task.Actions.newTask().action(org.mwg.structure.action.NTreeNearestWithinRadius.NAME, pathOrVar);
                };
                StructureActions.nTreeNearestNWithinRadius = function (pathOrVar) {
                    return org.mwg.task.Actions.newTask().action(org.mwg.structure.action.NTreeNearestNWithinRadius.NAME, pathOrVar);
                };
                return StructureActions;
            }());
            structure.StructureActions = StructureActions;
            var StructurePlugin = (function (_super) {
                __extends(StructurePlugin, _super);
                function StructurePlugin() {
                    _super.call(this);
                    this.declareNodeType(org.mwg.structure.tree.KDTree.NAME, function (world, time, id, graph) {
                        {
                            return new org.mwg.structure.tree.KDTree(world, time, id, graph);
                        }
                    });
                    this.declareNodeType(org.mwg.structure.tree.NDTree.NAME, function (world, time, id, graph) {
                        {
                            return new org.mwg.structure.tree.NDTree(world, time, id, graph);
                        }
                    });
                    this.declareNodeType(org.mwg.structure.tree.NDTree2.NAME, function (world, time, id, graph) {
                        {
                            return new org.mwg.structure.tree.NDTree2(world, time, id, graph);
                        }
                    });
                    this.declareTaskAction(org.mwg.structure.action.NTreeInsertTo.NAME, function (params) {
                        {
                            if (params.length != 1) {
                                throw new Error("Bad param number!");
                            }
                            return new org.mwg.structure.action.NTreeInsertTo(params[0]);
                        }
                    });
                    this.declareTaskAction(org.mwg.structure.action.TraverseById.NAME, function (params) {
                        {
                            if (params.length != 1) {
                                throw new Error("Bad param number!");
                            }
                            return new org.mwg.structure.action.TraverseById(params[0]);
                        }
                    });
                    this.declareTaskAction(org.mwg.structure.action.NTreeNearestN.NAME, function (params) {
                        {
                            if (params.length < 2) {
                                throw new Error("Bad param number!");
                            }
                            var n = java.lang.Integer.parseInt(params[params.length - 1]);
                            var key = new Float64Array(params.length - 1);
                            for (var i = 0; i < params.length - 1; i++) {
                                key[i] = parseFloat(params[i]);
                            }
                            return new org.mwg.structure.action.NTreeNearestN(key, n);
                        }
                    });
                    this.declareTaskAction(org.mwg.structure.action.NTreeNearestWithinRadius.NAME, function (params) {
                        {
                            if (params.length < 2) {
                                throw new Error("Bad param number!");
                            }
                            var radius = parseFloat(params[params.length - 1]);
                            var key = new Float64Array(params.length - 1);
                            for (var i = 0; i < params.length - 1; i++) {
                                key[i] = parseFloat(params[i]);
                            }
                            return new org.mwg.structure.action.NTreeNearestWithinRadius(key, radius);
                        }
                    });
                    this.declareTaskAction(org.mwg.structure.action.NTreeNearestNWithinRadius.NAME, function (params) {
                        {
                            if (params.length < 3) {
                                throw new Error("Bad param number!");
                            }
                            var radius = parseFloat(params[params.length - 1]);
                            var n = java.lang.Integer.parseInt(params[params.length - 2]);
                            var key = new Float64Array(params.length - 2);
                            for (var i = 0; i < params.length - 2; i++) {
                                key[i] = parseFloat(params[i]);
                            }
                            return new org.mwg.structure.action.NTreeNearestNWithinRadius(key, n, radius);
                        }
                    });
                }
                return StructurePlugin;
            }(org.mwg.plugin.AbstractPlugin));
            structure.StructurePlugin = StructurePlugin;
            var action;
            (function (action) {
                var NTreeInsertTo = (function (_super) {
                    __extends(NTreeInsertTo, _super);
                    function NTreeInsertTo(variableName) {
                        _super.call(this);
                        this._variableName = variableName;
                    }
                    NTreeInsertTo.prototype.eval = function (context) {
                        var previousResult = context.result();
                        var savedVar = context.variable(context.template(this._variableName));
                        if (previousResult != null && savedVar != null) {
                            var defer_1 = context.graph().newCounter(previousResult.size());
                            var previousResultIt = previousResult.iterator();
                            var iter = previousResultIt.next();
                            while (iter != null) {
                                if (iter instanceof org.mwg.plugin.AbstractNode) {
                                    var savedVarIt = savedVar.iterator();
                                    var toAddIter = savedVarIt.next();
                                    while (toAddIter != null) {
                                        if (toAddIter instanceof org.mwg.structure.tree.KDTree || toAddIter instanceof org.mwg.structure.tree.NDTree) {
                                            toAddIter.insert(iter, function (result) {
                                                {
                                                    defer_1.count();
                                                }
                                            });
                                        }
                                        else {
                                            defer_1.count();
                                        }
                                        toAddIter = savedVarIt.next();
                                    }
                                }
                                else {
                                    defer_1.count();
                                }
                                iter = previousResultIt.next();
                            }
                            defer_1.then(function () {
                                {
                                    context.continueTask();
                                }
                            });
                        }
                        else {
                            context.continueTask();
                        }
                    };
                    NTreeInsertTo.prototype.toString = function () {
                        return "nTreeInsertTo(\'" + this._variableName + "\')";
                    };
                    NTreeInsertTo.NAME = "nTreeInsertTo";
                    return NTreeInsertTo;
                }(org.mwg.plugin.AbstractTaskAction));
                action.NTreeInsertTo = NTreeInsertTo;
                var NTreeNearestN = (function (_super) {
                    __extends(NTreeNearestN, _super);
                    function NTreeNearestN(key, n) {
                        _super.call(this);
                        this._key = key;
                        this._n = n;
                    }
                    NTreeNearestN.prototype.eval = function (context) {
                        var previousResult = context.result();
                        var nextResult = context.newResult();
                        if (previousResult != null) {
                            var defer_2 = context.graph().newCounter(previousResult.size());
                            var previousResultIt = previousResult.iterator();
                            var iter = previousResultIt.next();
                            while (iter != null) {
                                if (iter instanceof org.mwg.structure.tree.KDTree || iter instanceof org.mwg.structure.tree.NDTree) {
                                    iter.nearestN(this._key, this._n, function (result) {
                                        {
                                            for (var i = 0; i < result.length; i++) {
                                                if (result[i] != null) {
                                                    nextResult.add(result[i]);
                                                }
                                            }
                                            defer_2.count();
                                        }
                                    });
                                }
                                else {
                                    defer_2.count();
                                }
                                iter = previousResultIt.next();
                            }
                            defer_2.then(function () {
                                {
                                    context.continueWith(nextResult);
                                }
                            });
                        }
                        else {
                            context.continueWith(nextResult);
                        }
                    };
                    NTreeNearestN.prototype.toString = function () {
                        return "nTreeNearestN(\'" + "\')";
                    };
                    NTreeNearestN.NAME = "nTreeNearestN";
                    return NTreeNearestN;
                }(org.mwg.plugin.AbstractTaskAction));
                action.NTreeNearestN = NTreeNearestN;
                var NTreeNearestNWithinRadius = (function (_super) {
                    __extends(NTreeNearestNWithinRadius, _super);
                    function NTreeNearestNWithinRadius(key, n, radius) {
                        _super.call(this);
                        this._key = key;
                        this._n = n;
                        this._radius = radius;
                    }
                    NTreeNearestNWithinRadius.prototype.eval = function (context) {
                        var previousResult = context.result();
                        var nextResult = context.newResult();
                        if (previousResult != null) {
                            var defer_3 = context.graph().newCounter(previousResult.size());
                            var previousResultIt = previousResult.iterator();
                            var iter = previousResultIt.next();
                            while (iter != null) {
                                if (iter instanceof org.mwg.structure.tree.KDTree || iter instanceof org.mwg.structure.tree.NDTree) {
                                    iter.nearestNWithinRadius(this._key, this._n, this._radius, function (result) {
                                        {
                                            for (var i = 0; i < result.length; i++) {
                                                if (result[i] != null) {
                                                    nextResult.add(result[i]);
                                                }
                                            }
                                            defer_3.count();
                                        }
                                    });
                                }
                                else {
                                    defer_3.count();
                                }
                                iter = previousResultIt.next();
                            }
                            defer_3.then(function () {
                                {
                                    context.continueWith(nextResult);
                                }
                            });
                        }
                        else {
                            context.continueWith(nextResult);
                        }
                    };
                    NTreeNearestNWithinRadius.prototype.toString = function () {
                        return "nTreeNearestNWithinRadius(\'" + "\')";
                    };
                    NTreeNearestNWithinRadius.NAME = "nTreeNearestNWithinRadius";
                    return NTreeNearestNWithinRadius;
                }(org.mwg.plugin.AbstractTaskAction));
                action.NTreeNearestNWithinRadius = NTreeNearestNWithinRadius;
                var NTreeNearestWithinRadius = (function (_super) {
                    __extends(NTreeNearestWithinRadius, _super);
                    function NTreeNearestWithinRadius(key, radius) {
                        _super.call(this);
                        this._key = key;
                        this._radius = radius;
                    }
                    NTreeNearestWithinRadius.prototype.eval = function (context) {
                        var previousResult = context.result();
                        var nextResult = context.newResult();
                        if (previousResult != null) {
                            var defer_4 = context.graph().newCounter(previousResult.size());
                            var previousResultIt = previousResult.iterator();
                            var iter = previousResultIt.next();
                            while (iter != null) {
                                if (iter instanceof org.mwg.structure.tree.KDTree || iter instanceof org.mwg.structure.tree.NDTree) {
                                    iter.nearestWithinRadius(this._key, this._radius, function (result) {
                                        {
                                            for (var i = 0; i < result.length; i++) {
                                                if (result[i] != null) {
                                                    nextResult.add(result[i]);
                                                }
                                            }
                                            defer_4.count();
                                        }
                                    });
                                }
                                else {
                                    defer_4.count();
                                }
                                iter = previousResultIt.next();
                            }
                            defer_4.then(function () {
                                {
                                    context.continueWith(nextResult);
                                }
                            });
                        }
                        else {
                            context.continueWith(nextResult);
                        }
                    };
                    NTreeNearestWithinRadius.prototype.toString = function () {
                        return "nTreeNearestWithinRadius(\'" + "\')";
                    };
                    NTreeNearestWithinRadius.NAME = "nTreeNearestWithinRadius";
                    return NTreeNearestWithinRadius;
                }(org.mwg.plugin.AbstractTaskAction));
                action.NTreeNearestWithinRadius = NTreeNearestWithinRadius;
                var TraverseById = (function (_super) {
                    __extends(TraverseById, _super);
                    function TraverseById(p_name) {
                        _super.call(this);
                        this._name = p_name;
                    }
                    TraverseById.prototype.eval = function (context) {
                        var finalResult = context.wrap(null);
                        var flatlongName = java.lang.Long.parseLong(context.template(this._name));
                        var previousResult = context.result();
                        if (previousResult != null) {
                            var previousSize = previousResult.size();
                            var defer_5 = context.graph().newCounter(previousSize);
                            var _loop_1 = function(i) {
                                var loop = previousResult.get(i);
                                if (loop instanceof org.mwg.plugin.AbstractNode) {
                                    var casted_1 = loop;
                                    casted_1.relByIndex(flatlongName, function (result) {
                                        {
                                            if (result != null) {
                                                for (var j = 0; j < result.length; j++) {
                                                    finalResult.add(result[j]);
                                                }
                                            }
                                            casted_1.free();
                                            defer_5.count();
                                        }
                                    });
                                }
                                else {
                                    finalResult.add(loop);
                                    defer_5.count();
                                }
                            };
                            for (var i = 0; i < previousSize; i++) {
                                _loop_1(i);
                            }
                            defer_5.then(function () {
                                {
                                    previousResult.clear();
                                    context.continueWith(finalResult);
                                }
                            });
                        }
                        else {
                            context.continueTask();
                        }
                    };
                    TraverseById.prototype.toString = function () {
                        return "traverseById(\'" + this._name + "\')";
                    };
                    TraverseById.NAME = "traverseById";
                    return TraverseById;
                }(org.mwg.plugin.AbstractTaskAction));
                action.TraverseById = TraverseById;
            })(action = structure.action || (structure.action = {}));
            var distance;
            (function (distance) {
                var CosineDistance = (function () {
                    function CosineDistance() {
                    }
                    CosineDistance.instance = function () {
                        if (CosineDistance.static_instance == null) {
                            CosineDistance.static_instance = new org.mwg.structure.distance.CosineDistance();
                        }
                        return CosineDistance.static_instance;
                    };
                    CosineDistance.prototype.measure = function (x, y) {
                        var sumTop = 0;
                        var sumOne = 0;
                        var sumTwo = 0;
                        for (var i = 0; i < x.length; i++) {
                            sumTop += x[i] * y[i];
                            sumOne += x[i] * x[i];
                            sumTwo += y[i] * y[i];
                        }
                        var cosSim = sumTop / (Math.sqrt(sumOne) * Math.sqrt(sumTwo));
                        if (cosSim < 0) {
                            cosSim = 0;
                        }
                        return 1 - cosSim;
                    };
                    CosineDistance.prototype.compare = function (x, y) {
                        return x < y;
                    };
                    CosineDistance.prototype.getMinValue = function () {
                        return 0;
                    };
                    CosineDistance.prototype.getMaxValue = function () {
                        return java.lang.Double.MAX_VALUE;
                    };
                    CosineDistance.static_instance = null;
                    return CosineDistance;
                }());
                distance.CosineDistance = CosineDistance;
                var Distances = (function () {
                    function Distances() {
                    }
                    Distances.EUCLIDEAN = 0;
                    Distances.GEODISTANCE = 1;
                    Distances.COSINE = 2;
                    return Distances;
                }());
                distance.Distances = Distances;
                var EuclideanDistance = (function () {
                    function EuclideanDistance() {
                    }
                    EuclideanDistance.instance = function () {
                        if (EuclideanDistance.static_instance == null) {
                            EuclideanDistance.static_instance = new org.mwg.structure.distance.EuclideanDistance();
                        }
                        return EuclideanDistance.static_instance;
                    };
                    EuclideanDistance.prototype.measure = function (x, y) {
                        var value = 0;
                        for (var i = 0; i < x.length; i++) {
                            value = value + (x[i] - y[i]) * (x[i] - y[i]);
                        }
                        return Math.sqrt(value);
                    };
                    EuclideanDistance.prototype.compare = function (x, y) {
                        return x < y;
                    };
                    EuclideanDistance.prototype.getMinValue = function () {
                        return 0;
                    };
                    EuclideanDistance.prototype.getMaxValue = function () {
                        return java.lang.Double.MAX_VALUE;
                    };
                    EuclideanDistance.static_instance = null;
                    return EuclideanDistance;
                }());
                distance.EuclideanDistance = EuclideanDistance;
                var GeoDistance = (function () {
                    function GeoDistance() {
                    }
                    GeoDistance.instance = function () {
                        if (GeoDistance.static_instance == null) {
                            GeoDistance.static_instance = new org.mwg.structure.distance.GeoDistance();
                        }
                        return GeoDistance.static_instance;
                    };
                    GeoDistance.prototype.measure = function (x, y) {
                        var earthRadius = 6371000;
                        var dLat = org.mwg.structure.distance.GeoDistance.toRadians(y[0] - x[0]);
                        var dLng = org.mwg.structure.distance.GeoDistance.toRadians(y[1] - x[1]);
                        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(org.mwg.structure.distance.GeoDistance.toRadians(x[0])) * Math.cos(org.mwg.structure.distance.GeoDistance.toRadians(y[0])) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
                        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                        return earthRadius * c;
                    };
                    GeoDistance.toRadians = function (angledeg) {
                        return angledeg * Math.PI / 180;
                    };
                    GeoDistance.prototype.compare = function (x, y) {
                        return x < y;
                    };
                    GeoDistance.prototype.getMinValue = function () {
                        return 0;
                    };
                    GeoDistance.prototype.getMaxValue = function () {
                        return java.lang.Double.MAX_VALUE;
                    };
                    GeoDistance.static_instance = null;
                    return GeoDistance;
                }());
                distance.GeoDistance = GeoDistance;
                var PearsonDistance = (function () {
                    function PearsonDistance() {
                    }
                    PearsonDistance.instance = function () {
                        if (PearsonDistance.static_instance == null) {
                            PearsonDistance.static_instance = new org.mwg.structure.distance.PearsonDistance();
                        }
                        return PearsonDistance.static_instance;
                    };
                    PearsonDistance.prototype.measure = function (a, b) {
                        var xy = 0, x = 0, x2 = 0, y = 0, y2 = 0;
                        for (var i = 0; i < a.length; i++) {
                            xy += a[i] * b[i];
                            x += a[i];
                            y += b[i];
                            x2 += a[i] * a[i];
                            y2 += b[i] * b[i];
                        }
                        var n = a.length;
                        return (xy - (x * y) / n) / Math.sqrt((x2 - (x * x) / n) * (y2 - (y * y) / n));
                    };
                    PearsonDistance.prototype.compare = function (x, y) {
                        return Math.abs(x) > Math.abs(y);
                    };
                    PearsonDistance.prototype.getMinValue = function () {
                        return 1;
                    };
                    PearsonDistance.prototype.getMaxValue = function () {
                        return 0;
                    };
                    PearsonDistance.static_instance = null;
                    return PearsonDistance;
                }());
                distance.PearsonDistance = PearsonDistance;
            })(distance = structure.distance || (structure.distance = {}));
            var tree;
            (function (tree) {
                var KDTree = (function (_super) {
                    __extends(KDTree, _super);
                    function KDTree(p_world, p_time, p_id, p_graph) {
                        _super.call(this, p_world, p_time, p_id, p_graph);
                    }
                    KDTree.initFindNear = function () {
                        var reccursiveDown = org.mwg.task.Actions.newTask();
                        reccursiveDown.then(function (context) {
                            {
                                var node = context.resultAsNodes().get(0);
                                if (node == null) {
                                    context.continueTask();
                                    return;
                                }
                                var pivot = node.get(org.mwg.structure.tree.KDTree.KEY);
                                var dim = context.variable("dim").get(0);
                                var target = context.variable("key").get(0);
                                var distance_1 = context.variable("distance").get(0);
                                var lev = context.variable("lev").get(0);
                                var hr = context.variable("hr").get(0);
                                var max_dist_sqd = context.variable("max_dist_sqd").get(0);
                                var s = lev % dim;
                                var pivot_to_target = distance_1.measure(pivot, target);
                                var left_hr = hr;
                                var right_hr = hr.clone();
                                left_hr.max[s] = pivot[s];
                                right_hr.min[s] = pivot[s];
                                var target_in_left = target[s] < pivot[s];
                                var nearer_kd = void 0;
                                var nearer_hr = void 0;
                                var further_kd = void 0;
                                var further_hr = void 0;
                                var nearer_st = void 0;
                                var farther_st = void 0;
                                if (target_in_left) {
                                    nearer_kd = node.get(org.mwg.structure.tree.KDTree.LEFT);
                                    nearer_st = org.mwg.structure.tree.KDTree.LEFT;
                                    nearer_hr = left_hr;
                                    further_kd = node.get(org.mwg.structure.tree.KDTree.RIGHT);
                                    further_hr = right_hr;
                                    farther_st = org.mwg.structure.tree.KDTree.RIGHT;
                                }
                                else {
                                    nearer_kd = node.get(org.mwg.structure.tree.KDTree.RIGHT);
                                    nearer_hr = right_hr;
                                    nearer_st = org.mwg.structure.tree.KDTree.RIGHT;
                                    further_kd = node.get(org.mwg.structure.tree.KDTree.LEFT);
                                    further_hr = left_hr;
                                    farther_st = org.mwg.structure.tree.KDTree.LEFT;
                                }
                                context.defineVariable("further_hr", further_hr);
                                context.defineVariable("pivot_to_target", pivot_to_target);
                                if (nearer_kd != null && nearer_kd.size() != 0) {
                                    context.defineVariable("near", nearer_st);
                                    context.defineVariableForSubTask("hr", nearer_hr);
                                    context.defineVariableForSubTask("max_dist_sqd", max_dist_sqd);
                                    context.defineVariableForSubTask("lev", lev + 1);
                                }
                                else {
                                    context.defineVariableForSubTask("near", context.newResult());
                                }
                                if (further_kd != null && further_kd.size() != 0) {
                                    context.defineVariableForSubTask("far", farther_st);
                                }
                                else {
                                    context.defineVariableForSubTask("far", context.newResult());
                                }
                                context.continueTask();
                            }
                        }).isolate(org.mwg.task.Actions.ifThen(function (context) {
                            {
                                return context.variable("near").size() > 0;
                            }
                        }, org.mwg.task.Actions.traverse("{{near}}").isolate(reccursiveDown))).then(function (context) {
                            {
                                var nnl = context.variable("nnl").get(0);
                                var target = context.variable("key").get(0);
                                var distance_2 = context.variable("distance").get(0);
                                var max_dist_sqd = context.variable("max_dist_sqd").get(0);
                                var further_hr = context.variable("further_hr").get(0);
                                var pivot_to_target = context.variable("pivot_to_target").get(0);
                                var lev = context.variable("lev").get(0);
                                var node = context.resultAsNodes().get(0);
                                var dist_sqd = void 0;
                                if (!nnl.isCapacityReached()) {
                                    dist_sqd = java.lang.Double.MAX_VALUE;
                                }
                                else {
                                    dist_sqd = nnl.getMaxPriority();
                                }
                                var max_dist_sqd2 = Math.min(max_dist_sqd, dist_sqd);
                                var closest = further_hr.closest(target);
                                if (distance_2.measure(closest, target) < max_dist_sqd) {
                                    if (pivot_to_target < dist_sqd) {
                                        dist_sqd = pivot_to_target;
                                        nnl.insert((node.get(org.mwg.structure.tree.KDTree.VALUE)).get(0), dist_sqd);
                                        var pivot = node.get(org.mwg.structure.tree.KDTree.KEY);
                                        if (nnl.isCapacityReached()) {
                                            max_dist_sqd2 = nnl.getMaxPriority();
                                        }
                                        else {
                                            max_dist_sqd2 = java.lang.Double.MAX_VALUE;
                                        }
                                    }
                                    context.defineVariableForSubTask("hr", further_hr);
                                    context.defineVariableForSubTask("max_dist_sqd", max_dist_sqd2);
                                    context.defineVariableForSubTask("lev", lev + 1);
                                    context.defineVariable("continueFar", true);
                                }
                                else {
                                    context.defineVariable("continueFar", false);
                                }
                                context.continueTask();
                            }
                        }).isolate(org.mwg.task.Actions.ifThen(function (context) {
                            {
                                return (context.variable("continueFar").get(0) && context.variable("far").size() > 0);
                            }
                        }, org.mwg.task.Actions.traverse("{{far}}").isolate(reccursiveDown)));
                        return reccursiveDown;
                    };
                    KDTree.initFindRadius = function () {
                        var reccursiveDown = org.mwg.task.Actions.newTask();
                        reccursiveDown.then(function (context) {
                            {
                                var node = context.resultAsNodes().get(0);
                                if (node == null) {
                                    context.continueTask();
                                    return;
                                }
                                var pivot = node.get(org.mwg.structure.tree.KDTree.KEY);
                                var dim = context.variable("dim").get(0);
                                var target = context.variable("key").get(0);
                                var distance_3 = context.variable("distance").get(0);
                                var lev = context.variable("lev").get(0);
                                var hr = context.variable("hr").get(0);
                                var max_dist_sqd = context.variable("max_dist_sqd").get(0);
                                var s = lev % dim;
                                var pivot_to_target = distance_3.measure(pivot, target);
                                var left_hr = hr;
                                var right_hr = hr.clone();
                                left_hr.max[s] = pivot[s];
                                right_hr.min[s] = pivot[s];
                                var target_in_left = target[s] < pivot[s];
                                var nearer_kd = void 0;
                                var nearer_hr = void 0;
                                var further_kd = void 0;
                                var further_hr = void 0;
                                var nearer_st = void 0;
                                var farther_st = void 0;
                                if (target_in_left) {
                                    nearer_kd = node.get(org.mwg.structure.tree.KDTree.LEFT);
                                    nearer_st = org.mwg.structure.tree.KDTree.LEFT;
                                    nearer_hr = left_hr;
                                    further_kd = node.get(org.mwg.structure.tree.KDTree.RIGHT);
                                    further_hr = right_hr;
                                    farther_st = org.mwg.structure.tree.KDTree.RIGHT;
                                }
                                else {
                                    nearer_kd = node.get(org.mwg.structure.tree.KDTree.RIGHT);
                                    nearer_hr = right_hr;
                                    nearer_st = org.mwg.structure.tree.KDTree.RIGHT;
                                    further_kd = node.get(org.mwg.structure.tree.KDTree.LEFT);
                                    further_hr = left_hr;
                                    farther_st = org.mwg.structure.tree.KDTree.LEFT;
                                }
                                context.defineVariable("further_hr", further_hr);
                                context.defineVariable("pivot_to_target", pivot_to_target);
                                if (nearer_kd != null && nearer_kd.size() != 0) {
                                    context.defineVariable("near", nearer_st);
                                    context.defineVariableForSubTask("hr", nearer_hr);
                                    context.defineVariableForSubTask("max_dist_sqd", max_dist_sqd);
                                    context.defineVariableForSubTask("lev", lev + 1);
                                }
                                else {
                                    context.defineVariableForSubTask("near", context.newResult());
                                }
                                if (further_kd != null && further_kd.size() != 0) {
                                    context.defineVariableForSubTask("far", farther_st);
                                }
                                else {
                                    context.defineVariableForSubTask("far", context.newResult());
                                }
                                context.continueTask();
                            }
                        }).isolate(org.mwg.task.Actions.ifThen(function (context) {
                            {
                                return context.variable("near").size() > 0;
                            }
                        }, org.mwg.task.Actions.traverse("{{near}}").isolate(reccursiveDown))).then(function (context) {
                            {
                                var nnl = context.variable("nnl").get(0);
                                var target = context.variable("key").get(0);
                                var distance_4 = context.variable("distance").get(0);
                                var radius = context.variable("radius").get(0);
                                var max_dist_sqd = context.variable("max_dist_sqd").get(0);
                                var further_hr = context.variable("further_hr").get(0);
                                var pivot_to_target = context.variable("pivot_to_target").get(0);
                                var lev = context.variable("lev").get(0);
                                var node = context.resultAsNodes().get(0);
                                var dist_sqd = java.lang.Double.MAX_VALUE;
                                var max_dist_sqd2 = Math.min(max_dist_sqd, dist_sqd);
                                var closest = further_hr.closest(target);
                                if (distance_4.measure(closest, target) < max_dist_sqd) {
                                    if (pivot_to_target < dist_sqd) {
                                        dist_sqd = pivot_to_target;
                                        if (dist_sqd <= radius) {
                                            nnl.insert((node.get(org.mwg.structure.tree.KDTree.VALUE)).get(0), dist_sqd);
                                        }
                                        max_dist_sqd2 = java.lang.Double.MAX_VALUE;
                                    }
                                    context.defineVariableForSubTask("hr", further_hr);
                                    context.defineVariableForSubTask("max_dist_sqd", max_dist_sqd2);
                                    context.defineVariableForSubTask("lev", lev + 1);
                                    context.defineVariable("continueFar", true);
                                }
                                else {
                                    context.defineVariable("continueFar", false);
                                }
                                context.continueTask();
                            }
                        }).isolate(org.mwg.task.Actions.ifThen(function (context) {
                            {
                                return (context.variable("continueFar").get(0) && context.variable("far").size() > 0);
                            }
                        }, org.mwg.task.Actions.traverse("{{far}}").isolate(reccursiveDown)));
                        return reccursiveDown;
                    };
                    KDTree.prototype.setProperty = function (propertyName, propertyType, propertyValue) {
                        KDTree.enforcer.check(propertyName, propertyType, propertyValue);
                        _super.prototype.setProperty.call(this, propertyName, propertyType, propertyValue);
                    };
                    KDTree.prototype.insert = function (value, callback) {
                        var _this = this;
                        this.extractFeatures(value, function (result) {
                            {
                                _this.insertWith(result, value, callback);
                            }
                        });
                    };
                    KDTree.prototype.insertWith = function (key, value, callback) {
                        var state = this.unphasedState();
                        var dim = state.getFromKeyWithDefault(KDTree.DIMENSIONS, key.length);
                        var err = state.getFromKeyWithDefault(KDTree.DISTANCE_THRESHOLD, KDTree.DISTANCE_THRESHOLD_DEF);
                        if (key.length != dim) {
                            throw new Error("Key size should always be the same");
                        }
                        if (value == null) {
                            throw new Error("To index node should not be null");
                        }
                        var distance = this.getDistance(state);
                        var tc = KDTree.insert.prepareWith(this.graph(), this, function (result) {
                            {
                                result.free();
                                if (callback != null) {
                                    callback(true);
                                }
                            }
                        });
                        var res = tc.newResult();
                        res.add(key);
                        tc.setGlobalVariable("key", res);
                        tc.setGlobalVariable("value", value);
                        tc.setGlobalVariable("root", this);
                        tc.setGlobalVariable("distance", distance);
                        tc.setGlobalVariable("dim", dim);
                        tc.setGlobalVariable("err", err);
                        tc.defineVariable("lev", 0);
                        KDTree.insert.executeUsing(tc);
                    };
                    KDTree.prototype.size = function () {
                        return this.graph().resolver().resolveState(this).getFromKeyWithDefault(KDTree.SIZE, 0);
                    };
                    KDTree.prototype.setDistance = function (distanceType) {
                        this.set(KDTree.DISTANCE, distanceType);
                    };
                    KDTree.prototype.setFrom = function (extractor) {
                        this.set(KDTree.FROM, extractor);
                    };
                    KDTree.prototype.nearestNWithinRadius = function (key, n, radius, callback) {
                        var _this = this;
                        var state = this.unphasedState();
                        var dim = state.getFromKeyWithDefault(KDTree.DIMENSIONS, key.length);
                        if (key.length != dim) {
                            throw new Error("Key size should always be the same");
                        }
                        var hr = org.mwg.structure.util.HRect.infiniteHRect(key.length);
                        var max_dist_sqd = java.lang.Double.MAX_VALUE;
                        var nnl = new org.mwg.structure.util.NearestNeighborList(n);
                        var distance = this.getDistance(state);
                        var tc = KDTree.nearestTask.prepareWith(this.graph(), this, function (result) {
                            {
                                var res_1 = nnl.getAllNodesWithin(radius);
                                if (res_1.length != 0) {
                                    var lookupall = org.mwg.task.Actions.setWorld(java.lang.String.valueOf(_this.world())).setTime(java.lang.String.valueOf(_this.time())).fromVar("res").lookupAll("{{result}}");
                                    var tc_1 = lookupall.prepareWith(_this.graph(), null, function (result) {
                                        {
                                            var finalres = new Array(result.size());
                                            for (var i = 0; i < result.size(); i++) {
                                                finalres[i] = result.get(i);
                                            }
                                            callback(finalres);
                                        }
                                    });
                                    var tr = tc_1.wrap(res_1);
                                    tc_1.addToGlobalVariable("res", tr);
                                    lookupall.executeUsing(tc_1);
                                }
                                else {
                                    callback(new Array(0));
                                }
                            }
                        });
                        var res = tc.newResult();
                        res.add(key);
                        tc.setGlobalVariable("key", res);
                        tc.setGlobalVariable("distance", distance);
                        tc.setGlobalVariable("dim", dim);
                        tc.setGlobalVariable("nnl", nnl);
                        tc.defineVariable("lev", 0);
                        tc.defineVariable("hr", hr);
                        tc.defineVariable("max_dist_sqd", max_dist_sqd);
                        KDTree.nearestTask.executeUsing(tc);
                    };
                    KDTree.prototype.nearestWithinRadius = function (key, radius, callback) {
                        var _this = this;
                        var state = this.unphasedState();
                        var dim = state.getFromKeyWithDefault(KDTree.DIMENSIONS, key.length);
                        if (key.length != dim) {
                            throw new Error("Key size should always be the same");
                        }
                        var hr = org.mwg.structure.util.HRect.infiniteHRect(key.length);
                        var max_dist_sqd = java.lang.Double.MAX_VALUE;
                        var nnl = new org.mwg.structure.util.NearestNeighborArrayList();
                        var distance = this.getDistance(state);
                        var tc = KDTree.nearestRadiusTask.prepareWith(this.graph(), this, function (result) {
                            {
                                var res_2 = nnl.distroyAndGetAllNodes();
                                if (res_2.length != 0) {
                                    var lookupall = org.mwg.task.Actions.setWorld(java.lang.String.valueOf(_this.world())).setTime(java.lang.String.valueOf(_this.time())).fromVar("res").lookupAll("{{result}}");
                                    var tc_2 = lookupall.prepareWith(_this.graph(), null, function (result) {
                                        {
                                            var finalres = new Array(result.size());
                                            for (var i = 0; i < result.size(); i++) {
                                                finalres[i] = result.get(i);
                                            }
                                            callback(finalres);
                                        }
                                    });
                                    var tr = tc_2.wrap(res_2);
                                    tc_2.addToGlobalVariable("res", tr);
                                    lookupall.executeUsing(tc_2);
                                }
                                else {
                                    callback(new Array(0));
                                }
                            }
                        });
                        var res = tc.newResult();
                        res.add(key);
                        tc.setGlobalVariable("key", res);
                        tc.setGlobalVariable("distance", distance);
                        tc.setGlobalVariable("dim", dim);
                        tc.setGlobalVariable("nnl", nnl);
                        tc.setGlobalVariable("radius", radius);
                        tc.defineVariable("lev", 0);
                        tc.defineVariable("hr", hr);
                        tc.defineVariable("max_dist_sqd", max_dist_sqd);
                        KDTree.nearestRadiusTask.executeUsing(tc);
                    };
                    KDTree.prototype.nearestN = function (key, n, callback) {
                        var _this = this;
                        var state = this.unphasedState();
                        var dim = state.getFromKeyWithDefault(KDTree.DIMENSIONS, key.length);
                        if (key.length != dim) {
                            throw new Error("Key size should always be the same");
                        }
                        var hr = org.mwg.structure.util.HRect.infiniteHRect(key.length);
                        var max_dist_sqd = java.lang.Double.MAX_VALUE;
                        var nnl = new org.mwg.structure.util.NearestNeighborList(n);
                        var distance = this.getDistance(state);
                        var tc = KDTree.nearestTask.prepareWith(this.graph(), this, function (result) {
                            {
                                var res_3 = nnl.getNodes();
                                if (res_3.length != 0) {
                                    var lookupall = org.mwg.task.Actions.setWorld(java.lang.String.valueOf(_this.world())).setTime(java.lang.String.valueOf(_this.time())).fromVar("res").lookupAll("{{result}}");
                                    var tc_3 = lookupall.prepareWith(_this.graph(), null, function (result) {
                                        {
                                            var finalres = new Array(result.size());
                                            for (var i = 0; i < result.size(); i++) {
                                                finalres[i] = result.get(i);
                                            }
                                            callback(finalres);
                                        }
                                    });
                                    var tr = tc_3.wrap(res_3);
                                    tc_3.addToGlobalVariable("res", tr);
                                    lookupall.executeUsing(tc_3);
                                }
                                else {
                                    callback(new Array(0));
                                }
                            }
                        });
                        var res = tc.newResult();
                        res.add(key);
                        tc.setGlobalVariable("key", res);
                        tc.setGlobalVariable("distance", distance);
                        tc.setGlobalVariable("dim", dim);
                        tc.setGlobalVariable("nnl", nnl);
                        tc.defineVariable("lev", 0);
                        tc.defineVariable("hr", hr);
                        tc.defineVariable("max_dist_sqd", max_dist_sqd);
                        KDTree.nearestTask.executeUsing(tc);
                    };
                    KDTree.prototype.getDistance = function (state) {
                        var d = state.getFromKeyWithDefault(KDTree.DISTANCE, KDTree.DISTANCE_TYPE_DEF);
                        var distance;
                        if (d == org.mwg.structure.distance.Distances.EUCLIDEAN) {
                            distance = org.mwg.structure.distance.EuclideanDistance.instance();
                        }
                        else if (d == org.mwg.structure.distance.Distances.GEODISTANCE) {
                            distance = org.mwg.structure.distance.GeoDistance.instance();
                        }
                        else {
                            throw new Error("Unknown distance code metric");
                        }
                        return distance;
                    };
                    KDTree.prototype.extractFeatures = function (current, callback) {
                        var _this = this;
                        var query = _super.prototype.get.call(this, KDTree.FROM);
                        if (query != null) {
                            var split = query.split(",");
                            var tasks_1 = new Array(split.length);
                            for (var i = 0; i < split.length; i++) {
                                var t = org.mwg.task.Actions.setWorld("" + this.world());
                                t.setTime(this.time() + "");
                                t.parse(split[i].trim());
                                tasks_1[i] = t;
                            }
                            var result_1 = new Float64Array(tasks_1.length);
                            var waiter_1 = this.graph().newCounter(tasks_1.length);
                            var _loop_2 = function(i) {
                                var initial = org.mwg.task.Actions.newTask().emptyResult();
                                initial.add(current);
                                var capsule = function (i) {
                                    {
                                        tasks_1[i].executeWith(_this.graph(), initial, function (currentResult) {
                                            {
                                                if (currentResult == null) {
                                                    result_1[i] = org.mwg.Constants.NULL_LONG;
                                                }
                                                else {
                                                    result_1[i] = parseFloat(currentResult.get(0).toString());
                                                    currentResult.free();
                                                }
                                                waiter_1.count();
                                            }
                                        });
                                    }
                                };
                                capsule(i);
                            };
                            for (var i = 0; i < split.length; i++) {
                                _loop_2(i);
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
                    KDTree.NAME = "KDTree";
                    KDTree.FROM = "from";
                    KDTree.LEFT = "left";
                    KDTree.RIGHT = "right";
                    KDTree.KEY = "key";
                    KDTree.VALUE = "value";
                    KDTree.SIZE = "size";
                    KDTree.DIMENSIONS = "dimensions";
                    KDTree.DISTANCE = "distance";
                    KDTree.DISTANCE_THRESHOLD = "threshold";
                    KDTree.DISTANCE_THRESHOLD_DEF = 1e-10;
                    KDTree.DISTANCE_TYPE_DEF = 0;
                    KDTree.insert = org.mwg.task.Actions.whileDo(function (context) {
                        {
                            var current = context.resultAsNodes().get(0);
                            var nodeKey = current.get(org.mwg.structure.tree.KDTree.KEY);
                            var dim = context.variable("dim").get(0);
                            var keyToInsert = context.variable("key").get(0);
                            var valueToInsert = context.variable("value").get(0);
                            var root = context.variable("root").get(0);
                            var distance_5 = context.variable("distance").get(0);
                            var err = context.variable("err").get(0);
                            var lev = context.variable("lev").get(0);
                            if (nodeKey == null) {
                                current.setProperty(org.mwg.structure.tree.KDTree.DIMENSIONS, org.mwg.Type.INT, dim);
                                current.setProperty(org.mwg.structure.tree.KDTree.KEY, org.mwg.Type.DOUBLE_ARRAY, keyToInsert);
                                current.getOrCreateRel(org.mwg.structure.tree.KDTree.VALUE).clear().add(valueToInsert.id());
                                current.setProperty(org.mwg.structure.tree.KDTree.SIZE, org.mwg.Type.INT, 1);
                                return false;
                            }
                            else if (distance_5.measure(keyToInsert, nodeKey) < err) {
                                current.getOrCreateRel(org.mwg.structure.tree.KDTree.VALUE).clear().add(valueToInsert.id());
                                return false;
                            }
                            else {
                                var child = void 0;
                                var nextRel = void 0;
                                if (keyToInsert[lev] > nodeKey[lev]) {
                                    child = current.get(org.mwg.structure.tree.KDTree.RIGHT);
                                    nextRel = org.mwg.structure.tree.KDTree.RIGHT;
                                }
                                else {
                                    child = current.get(org.mwg.structure.tree.KDTree.LEFT);
                                    nextRel = org.mwg.structure.tree.KDTree.LEFT;
                                }
                                if (child == null || child.size() == 0) {
                                    var childNode = context.graph().newTypedNode(current.world(), current.time(), org.mwg.structure.tree.KDTree.NAME);
                                    childNode.setProperty(org.mwg.structure.tree.KDTree.KEY, org.mwg.Type.DOUBLE_ARRAY, keyToInsert);
                                    childNode.getOrCreateRel(org.mwg.structure.tree.KDTree.VALUE).clear().add(valueToInsert.id());
                                    current.getOrCreateRel(nextRel).clear().add(childNode.id());
                                    root.setProperty(org.mwg.structure.tree.KDTree.SIZE, org.mwg.Type.INT, root.get(org.mwg.structure.tree.KDTree.SIZE) + 1);
                                    childNode.free();
                                    return false;
                                }
                                else {
                                    context.setGlobalVariable("next", nextRel);
                                    context.setGlobalVariable("lev", (lev + 1) % dim);
                                    return true;
                                }
                            }
                        }
                    }, org.mwg.task.Actions.traverse("{{next}}"));
                    KDTree.nearestTask = KDTree.initFindNear();
                    KDTree.nearestRadiusTask = KDTree.initFindRadius();
                    KDTree.enforcer = new org.mwg.utility.Enforcer().asPositiveDouble(KDTree.DISTANCE_THRESHOLD);
                    return KDTree;
                }(org.mwg.plugin.AbstractNode));
                tree.KDTree = KDTree;
                var NDTree = (function (_super) {
                    __extends(NDTree, _super);
                    function NDTree(p_world, p_time, p_id, p_graph) {
                        _super.call(this, p_world, p_time, p_id, p_graph);
                    }
                    NDTree.prototype.setBounds = function (min, max, precisions) {
                        var state = this.unphasedState();
                        if (state.get(NDTree._BOUNDMIN) != null) {
                            throw new Error("Bounds can't be changed!, you need to re-index");
                        }
                        if (min.length != max.length) {
                            throw new Error("Min and max bounds should be the same array length");
                        }
                        if (precisions.length != max.length) {
                            throw new Error("Max and precision should be the same array length");
                        }
                        for (var i = 0; i < min.length; i++) {
                            if (min[i] >= max[i]) {
                                throw new Error("Min should be always exclusively smaller than max");
                            }
                            if (precisions[i] > (max[i] - min[i])) {
                                throw new Error("Precision should always be smaller than max-min");
                            }
                        }
                        state.set(NDTree._DIM, org.mwg.Type.INT, min.length);
                        state.set(NDTree._BOUNDMIN, org.mwg.Type.DOUBLE_ARRAY, min);
                        state.set(NDTree._BOUNDMAX, org.mwg.Type.DOUBLE_ARRAY, max);
                        state.set(NDTree._PRECISION, org.mwg.Type.DOUBLE_ARRAY, precisions);
                    };
                    NDTree.updateCount = function (updateCount, root) {
                        if (!updateCount) {
                            return;
                        }
                        if (root.getByIndex(NDTree._NUMNODES) != null) {
                            var count = root.getByIndex(NDTree._NUMNODES);
                            count++;
                            root.setPropertyByIndex(NDTree._NUMNODES, org.mwg.Type.INT, count);
                        }
                        else {
                            root.setPropertyByIndex(NDTree._NUMNODES, org.mwg.Type.INT, 1);
                        }
                    };
                    NDTree.initNearestTask = function () {
                        var reccursiveDown = org.mwg.task.Actions.newTask();
                        reccursiveDown.defineVar("parent").then(function (context) {
                            {
                                var current = context.result().get(0);
                                var state = current.graph().resolver().resolveState(current);
                                var nnl = context.variable("nnl").get(0);
                                var values = state.get(org.mwg.structure.tree.NDTree._VALUES);
                                if (values != null) {
                                    var dim = context.variable("dim").get(0);
                                    var k = new Float64Array(dim);
                                    var keys = state.get(org.mwg.structure.tree.NDTree._KEYS);
                                    var target = context.variable("key").get(0);
                                    var distance_6 = context.variable("distance").get(0);
                                    for (var i = 0; i < values.size(); i++) {
                                        for (var j = 0; j < dim; j++) {
                                            k[j] = keys[i * dim + j];
                                        }
                                        nnl.insert(values.get(i), distance_6.measure(k, target));
                                    }
                                    context.continueWith(null);
                                }
                                else {
                                    var boundMax_1 = state.get(org.mwg.structure.tree.NDTree._BOUNDMAX);
                                    var boundMin_1 = state.get(org.mwg.structure.tree.NDTree._BOUNDMIN);
                                    var target_1 = context.variable("key").get(0);
                                    var distance_7 = context.variable("distance").get(0);
                                    var worst = nnl.getWorstDistance();
                                    if (!nnl.isCapacityReached() || org.mwg.structure.tree.NDTree.getclosestDistance(target_1, boundMin_1, boundMax_1, distance_7) <= worst) {
                                        var precision_1 = context.variable("precision").get(0);
                                        var dim_1 = boundMin_1.length;
                                        var childMin_1 = new Float64Array(dim_1);
                                        var childMax_1 = new Float64Array(dim_1);
                                        var temp_1 = new org.mwg.structure.util.NearestNeighborArrayList();
                                        state.each(function (attributeKey, elemType, elem) {
                                            {
                                                if (attributeKey >= org.mwg.structure.tree.NDTree._RELCONST) {
                                                    var binaries = org.mwg.structure.tree.NDTree.binaryFromLong(attributeKey, dim_1);
                                                    for (var i = 0; i < dim_1; i++) {
                                                        if (!binaries[i]) {
                                                            childMin_1[i] = boundMin_1[i];
                                                            childMax_1[i] = Math.max((boundMax_1[i] - boundMin_1[i]) / 2, precision_1[i]) + boundMin_1[i];
                                                        }
                                                        else {
                                                            childMin_1[i] = boundMax_1[i] - Math.max((boundMax_1[i] - boundMin_1[i]) / 2, precision_1[i]);
                                                            childMax_1[i] = boundMax_1[i];
                                                        }
                                                    }
                                                    temp_1.insert(attributeKey, org.mwg.structure.tree.NDTree.getclosestDistance(target_1, childMin_1, childMax_1, distance_7));
                                                }
                                            }
                                        });
                                        temp_1.sort();
                                        var relations = temp_1.getNodes();
                                        context.continueWith(context.wrap(relations));
                                    }
                                    else {
                                        context.continueWith(null);
                                    }
                                }
                            }
                        }).foreach(org.mwg.task.Actions.defineVar("relid").fromVar("parent").action(org.mwg.structure.action.TraverseById.NAME, "{{relid}}").subTask(reccursiveDown));
                        return reccursiveDown;
                    };
                    NDTree.initRadusTask = function () {
                        var reccursiveDown = org.mwg.task.Actions.newTask();
                        reccursiveDown.defineVar("parent").then(function (context) {
                            {
                                var current = context.result().get(0);
                                var state = current.graph().resolver().resolveState(current);
                                var nnl = context.variable("nnl").get(0);
                                var values = state.get(org.mwg.structure.tree.NDTree._VALUES);
                                if (values != null) {
                                    var dim = context.variable("dim").get(0);
                                    var k = new Float64Array(dim);
                                    var keys = state.get(org.mwg.structure.tree.NDTree._KEYS);
                                    var target = context.variable("key").get(0);
                                    var distance_8 = context.variable("distance").get(0);
                                    for (var i = 0; i < values.size(); i++) {
                                        for (var j = 0; j < dim; j++) {
                                            k[j] = keys[i * dim + j];
                                        }
                                        nnl.insert(values.get(i), distance_8.measure(k, target));
                                    }
                                    context.continueWith(null);
                                }
                                else {
                                    var boundMax_2 = state.get(org.mwg.structure.tree.NDTree._BOUNDMAX);
                                    var boundMin_2 = state.get(org.mwg.structure.tree.NDTree._BOUNDMIN);
                                    var target_2 = context.variable("key").get(0);
                                    var distance_9 = context.variable("distance").get(0);
                                    var radius = context.variable("radius").get(0);
                                    if (org.mwg.structure.tree.NDTree.getclosestDistance(target_2, boundMin_2, boundMax_2, distance_9) <= radius) {
                                        var precision_2 = context.variable("precision").get(0);
                                        var dim_2 = boundMin_2.length;
                                        var childMin_2 = new Float64Array(dim_2);
                                        var childMax_2 = new Float64Array(dim_2);
                                        var temp_2 = new org.mwg.structure.util.NearestNeighborArrayList();
                                        state.each(function (attributeKey, elemType, elem) {
                                            {
                                                if (attributeKey >= org.mwg.structure.tree.NDTree._RELCONST) {
                                                    var binaries = org.mwg.structure.tree.NDTree.binaryFromLong(attributeKey, dim_2);
                                                    for (var i = 0; i < dim_2; i++) {
                                                        if (!binaries[i]) {
                                                            childMin_2[i] = boundMin_2[i];
                                                            childMax_2[i] = Math.max((boundMax_2[i] - boundMin_2[i]) / 2, precision_2[i]) + boundMin_2[i];
                                                        }
                                                        else {
                                                            childMin_2[i] = boundMax_2[i] - Math.max((boundMax_2[i] - boundMin_2[i]) / 2, precision_2[i]);
                                                            childMax_2[i] = boundMax_2[i];
                                                        }
                                                    }
                                                    temp_2.insert(attributeKey, org.mwg.structure.tree.NDTree.getclosestDistance(target_2, childMin_2, childMax_2, distance_9));
                                                }
                                            }
                                        });
                                        temp_2.sort();
                                        var relations = temp_2.getNodes();
                                        context.continueWith(context.wrap(relations));
                                    }
                                    else {
                                        context.continueWith(null);
                                    }
                                }
                            }
                        }).foreach(org.mwg.task.Actions.defineVar("relid").fromVar("parent").action(org.mwg.structure.action.TraverseById.NAME, "{{relid}}").subTask(reccursiveDown));
                        return reccursiveDown;
                    };
                    NDTree.prototype.setUpdateStat = function (value) {
                        var state = this.unphasedState();
                        state.set(NDTree._STAT, org.mwg.Type.BOOL, value);
                    };
                    NDTree.updateGaussian = function (state, key) {
                        var total = 0;
                        var x = state.get(NDTree._TOTAL);
                        if (x != null) {
                            total = x;
                        }
                        if (total == 0) {
                            state.set(NDTree._TOTAL, org.mwg.Type.INT, 1);
                            state.set(NDTree._SUM, org.mwg.Type.DOUBLE_ARRAY, key);
                        }
                        else {
                            var features = key.length;
                            var sum = void 0;
                            var sumsquares = void 0;
                            if (total == 1) {
                                sum = state.get(NDTree._SUM);
                                sumsquares = new Float64Array(features * (features + 1) / 2);
                                var count_1 = 0;
                                for (var i = 0; i < features; i++) {
                                    for (var j = i; j < features; j++) {
                                        sumsquares[count_1] = sum[i] * sum[j];
                                        count_1++;
                                    }
                                }
                            }
                            else {
                                sum = state.get(NDTree._SUM);
                                sumsquares = state.get(NDTree._SUMSQ);
                            }
                            for (var i = 0; i < features; i++) {
                                sum[i] += key[i];
                            }
                            var count = 0;
                            for (var i = 0; i < features; i++) {
                                for (var j = i; j < features; j++) {
                                    sumsquares[count] += key[i] * key[j];
                                    count++;
                                }
                            }
                            total++;
                            state.set(NDTree._TOTAL, org.mwg.Type.INT, total);
                            state.set(NDTree._SUM, org.mwg.Type.DOUBLE_ARRAY, sum);
                            state.set(NDTree._SUMSQ, org.mwg.Type.DOUBLE_ARRAY, sumsquares);
                        }
                    };
                    NDTree.prototype.getTotal = function () {
                        var x = _super.prototype.getByIndex.call(this, NDTree._TOTAL);
                        if (x == null) {
                            return 0;
                        }
                        else {
                            return x;
                        }
                    };
                    NDTree.prototype.getAvg = function () {
                        var total = this.getTotal();
                        if (total == 0) {
                            return null;
                        }
                        if (total == 1) {
                            return _super.prototype.getByIndex.call(this, NDTree._SUM);
                        }
                        else {
                            var avg = _super.prototype.getByIndex.call(this, NDTree._SUM);
                            for (var i = 0; i < avg.length; i++) {
                                avg[i] = avg[i] / total;
                            }
                            return avg;
                        }
                    };
                    NDTree.prototype.getCovarianceArray = function (avg, err) {
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
                            var sumsquares = _super.prototype.getByIndex.call(this, NDTree._SUMSQ);
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
                    NDTree.getRelationId = function (centerKey, keyToInsert) {
                        var result = Long.UZERO;
                        for (var i = 0; i < centerKey.length; i++) {
                            if (i != 0) {
                                result = result.shiftLeft(1);
                            }
                            if (keyToInsert[i] > centerKey[i]) {
                                result = result.add(Long.ONE);
                            }
                        }
                        return result.add(Long.fromNumber(org.mwg.structure.tree.NDTree._RELCONST, true)).toNumber();
                    };
                    NDTree.binaryFromLong = function (value, dim) {
                        var tempvalue = value - NDTree._RELCONST;
                        var shiftvalue = tempvalue >> 1;
                        var res = [];
                        for (var i = 0; i < dim; i++) {
                            res[dim - i - 1] = ((tempvalue - (shiftvalue << 1)) == 1);
                            tempvalue = shiftvalue;
                            shiftvalue = tempvalue >> 1;
                        }
                        return res;
                    };
                    NDTree.prototype.getDistance = function (state) {
                        var d = state.getWithDefault(NDTree._DISTANCE, NDTree.DISTANCE_TYPE_DEF);
                        var distance;
                        if (d == org.mwg.structure.distance.Distances.EUCLIDEAN) {
                            distance = org.mwg.structure.distance.EuclideanDistance.instance();
                        }
                        else if (d == org.mwg.structure.distance.Distances.GEODISTANCE) {
                            distance = org.mwg.structure.distance.GeoDistance.instance();
                        }
                        else {
                            throw new Error("Unknown distance code metric");
                        }
                        return distance;
                    };
                    NDTree.prototype.setDistance = function (distanceType) {
                        this.setPropertyByIndex(NDTree._DISTANCE, org.mwg.Type.INT, distanceType);
                    };
                    NDTree.prototype.setFrom = function (extractor) {
                        this.setPropertyByIndex(NDTree._FROM, org.mwg.Type.STRING, extractor);
                    };
                    NDTree.prototype.nearestN = function (key, n, callback) {
                        var _this = this;
                        var state = this.unphasedState();
                        var dim = state.getWithDefault(NDTree._DIM, key.length);
                        this.checkKey(state, key, dim);
                        var nnl = new org.mwg.structure.util.NearestNeighborList(n);
                        var distance = this.getDistance(state);
                        var tc = NDTree.nearestTask.prepareWith(this.graph(), this, function (result) {
                            {
                                var res_4 = nnl.getNodes();
                                if (res_4.length != 0) {
                                    var lookupall = org.mwg.task.Actions.setWorld(java.lang.String.valueOf(_this.world())).setTime(java.lang.String.valueOf(_this.time())).fromVar("res").lookupAll("{{result}}");
                                    var tc_4 = lookupall.prepareWith(_this.graph(), null, function (result) {
                                        {
                                            var finalres = new Array(result.size());
                                            for (var i = 0; i < result.size(); i++) {
                                                finalres[i] = result.get(i);
                                            }
                                            callback(finalres);
                                        }
                                    });
                                    var tr = tc_4.wrap(res_4);
                                    tc_4.addToGlobalVariable("res", tr);
                                    lookupall.executeUsing(tc_4);
                                }
                                else {
                                    callback(new Array(0));
                                }
                            }
                        });
                        var res = tc.newResult();
                        res.add(key);
                        tc.setGlobalVariable("key", res);
                        tc.setGlobalVariable("distance", distance);
                        tc.setGlobalVariable("dim", dim);
                        var precisions = state.get(NDTree._PRECISION);
                        var resPres = tc.newResult();
                        resPres.add(precisions);
                        tc.setGlobalVariable("precision", resPres);
                        tc.setGlobalVariable("nnl", nnl);
                        NDTree.nearestTask.executeUsing(tc);
                    };
                    NDTree.prototype.nearestWithinRadius = function (key, radius, callback) {
                        var _this = this;
                        var state = this.unphasedState();
                        var dim = state.getWithDefault(NDTree._DIM, key.length);
                        this.checkKey(state, key, dim);
                        var nnl = new org.mwg.structure.util.NearestNeighborArrayList();
                        var distance = this.getDistance(state);
                        var tc = NDTree.nearestRadiusTask.prepareWith(this.graph(), this, function (result) {
                            {
                                var res_5 = nnl.getNodes();
                                if (res_5.length != 0) {
                                    var lookupall = org.mwg.task.Actions.setWorld(java.lang.String.valueOf(_this.world())).setTime(java.lang.String.valueOf(_this.time())).fromVar("res").lookupAll("{{result}}");
                                    var tc_5 = lookupall.prepareWith(_this.graph(), null, function (result) {
                                        {
                                            var finalres = new Array(result.size());
                                            for (var i = 0; i < result.size(); i++) {
                                                finalres[i] = result.get(i);
                                            }
                                            callback(finalres);
                                        }
                                    });
                                    var tr = tc_5.wrap(res_5);
                                    tc_5.addToGlobalVariable("res", tr);
                                    lookupall.executeUsing(tc_5);
                                }
                                else {
                                    callback(new Array(0));
                                }
                            }
                        });
                        var res = tc.newResult();
                        res.add(key);
                        tc.setGlobalVariable("key", res);
                        tc.setGlobalVariable("distance", distance);
                        tc.setGlobalVariable("dim", dim);
                        tc.setGlobalVariable("radius", radius);
                        var precisions = state.get(NDTree._PRECISION);
                        var resPres = tc.newResult();
                        resPres.add(precisions);
                        tc.setGlobalVariable("precision", resPres);
                        tc.setGlobalVariable("nnl", nnl);
                        NDTree.nearestRadiusTask.executeUsing(tc);
                    };
                    NDTree.prototype.nearestNWithinRadius = function (key, nbElem, radius, callback) {
                        var _this = this;
                        var state = this.unphasedState();
                        var dim = state.getWithDefault(NDTree._DIM, key.length);
                        this.checkKey(state, key, dim);
                        var nnl = new org.mwg.structure.util.NearestNeighborList(nbElem);
                        var distance = this.getDistance(state);
                        var tc = NDTree.nearestTask.prepareWith(this.graph(), this, function (result) {
                            {
                                var res_6 = nnl.getAllNodesWithin(radius);
                                if (res_6.length != 0) {
                                    var lookupall = org.mwg.task.Actions.setWorld(java.lang.String.valueOf(_this.world())).setTime(java.lang.String.valueOf(_this.time())).fromVar("res").lookupAll("{{result}}");
                                    var tc_6 = lookupall.prepareWith(_this.graph(), null, function (result) {
                                        {
                                            var finalres = new Array(result.size());
                                            for (var i = 0; i < result.size(); i++) {
                                                finalres[i] = result.get(i);
                                            }
                                            callback(finalres);
                                        }
                                    });
                                    var tr = tc_6.wrap(res_6);
                                    tc_6.addToGlobalVariable("res", tr);
                                    lookupall.executeUsing(tc_6);
                                }
                                else {
                                    callback(new Array(0));
                                }
                            }
                        });
                        var res = tc.newResult();
                        res.add(key);
                        tc.setGlobalVariable("key", res);
                        tc.setGlobalVariable("distance", distance);
                        tc.setGlobalVariable("dim", dim);
                        var precisions = state.get(NDTree._PRECISION);
                        var resPres = tc.newResult();
                        resPres.add(precisions);
                        tc.setGlobalVariable("precision", resPres);
                        tc.setGlobalVariable("nnl", nnl);
                        NDTree.nearestTask.executeUsing(tc);
                    };
                    NDTree.prototype.checkKey = function (state, key, dim) {
                        if (key.length != dim) {
                            throw new Error("Key size should always be the same");
                        }
                        var min = state.get(NDTree._BOUNDMIN);
                        var max = state.get(NDTree._BOUNDMAX);
                        if (min == null || max == null) {
                            throw new Error("Please set min and max boundary before inserting in the tree");
                        }
                        for (var i = 0; i < dim; i++) {
                            if (key[i] < min[i] || key[i] > max[i]) {
                                throw new Error("Key should be between min and max boundaries");
                            }
                        }
                        return true;
                    };
                    NDTree.prototype.insertWith = function (key, value, callback) {
                        var state = this.unphasedState();
                        if (value == null || key == null) {
                            return;
                        }
                        if (state.get(NDTree._DIM) == null) {
                            state.set(NDTree._DIM, org.mwg.Type.INT, key.length);
                        }
                        var dim = state.getWithDefault(NDTree._DIM, key.length);
                        this.checkKey(state, key, dim);
                        var tc = NDTree.insert.prepareWith(this.graph(), this, function (result) {
                            {
                                result.free();
                                if (callback != null) {
                                    callback(true);
                                }
                            }
                        });
                        var res = tc.newResult();
                        res.add(key);
                        tc.setGlobalVariable("key", res);
                        tc.setGlobalVariable("value", value);
                        var precisions = state.get(NDTree._PRECISION);
                        var updateStat = state.getWithDefault(NDTree._STAT, NDTree.STAT_DEF);
                        tc.setGlobalVariable("updatestat", updateStat);
                        tc.setGlobalVariable("root", this);
                        var resPres = tc.newResult();
                        resPres.add(precisions);
                        tc.setGlobalVariable("precision", resPres);
                        NDTree.insert.executeUsing(tc);
                    };
                    NDTree.prototype.extractFeatures = function (current, callback) {
                        var _this = this;
                        var query = _super.prototype.getByIndex.call(this, NDTree._FROM);
                        if (query != null) {
                            var split = query.split(",");
                            var tasks_2 = new Array(split.length);
                            for (var i = 0; i < split.length; i++) {
                                var t = org.mwg.task.Actions.setWorld("" + this.world());
                                t.setTime(this.time() + "");
                                t.parse(split[i].trim());
                                tasks_2[i] = t;
                            }
                            var result_2 = new Float64Array(tasks_2.length);
                            var waiter_2 = this.graph().newCounter(tasks_2.length);
                            var _loop_3 = function(i) {
                                var initial = org.mwg.task.Actions.newTask().emptyResult();
                                initial.add(current);
                                var capsule = function (i) {
                                    {
                                        tasks_2[i].executeWith(_this.graph(), initial, function (currentResult) {
                                            {
                                                if (currentResult == null) {
                                                    result_2[i] = org.mwg.Constants.NULL_LONG;
                                                }
                                                else {
                                                    result_2[i] = parseFloat(currentResult.get(0).toString());
                                                    currentResult.free();
                                                }
                                                waiter_2.count();
                                            }
                                        });
                                    }
                                };
                                capsule(i);
                            };
                            for (var i = 0; i < split.length; i++) {
                                _loop_3(i);
                            }
                            waiter_2.then(function () {
                                {
                                    callback(result_2);
                                }
                            });
                        }
                        else {
                            callback(null);
                        }
                    };
                    NDTree.prototype.insert = function (value, callback) {
                        var _this = this;
                        this.extractFeatures(value, function (result) {
                            {
                                _this.insertWith(result, value, callback);
                            }
                        });
                    };
                    NDTree.prototype.size = function () {
                        if (this.getByIndex(NDTree._NUMNODES) != null) {
                            return this.getByIndex(NDTree._NUMNODES);
                        }
                        else {
                            return 1;
                        }
                    };
                    NDTree.getclosestDistance = function (target, boundMin, boundMax, distance) {
                        var closest = new Float64Array(target.length);
                        for (var i = 0; i < target.length; i++) {
                            if (target[i] >= boundMax[i]) {
                                closest[i] = boundMax[i];
                            }
                            else if (target[i] <= boundMin[i]) {
                                closest[i] = boundMin[i];
                            }
                            else {
                                closest[i] = target[i];
                            }
                        }
                        return distance.measure(closest, target);
                    };
                    NDTree.NAME = "NDTree";
                    NDTree._STAT = 0;
                    NDTree._TOTAL = 1;
                    NDTree._SUM = 2;
                    NDTree._SUMSQ = 3;
                    NDTree._BOUNDMIN = 6;
                    NDTree._BOUNDMAX = 7;
                    NDTree._VALUES = 8;
                    NDTree._KEYS = 9;
                    NDTree._VALUES_STR = "8";
                    NDTree._KEYS_STR = "9";
                    NDTree._PRECISION = 10;
                    NDTree._NUMNODES = 11;
                    NDTree._DIM = 12;
                    NDTree._DISTANCE = 13;
                    NDTree._DISTANCETHRESHOLD = 14;
                    NDTree._FROM = 15;
                    NDTree.DISTANCE_THRESHOLD = "threshold";
                    NDTree.DISTANCE_THRESHOLD_DEF = 1e-10;
                    NDTree.DISTANCE_TYPE_DEF = 0;
                    NDTree.STAT_DEF = false;
                    NDTree._RELCONST = 16;
                    NDTree.nearestTask = NDTree.initNearestTask();
                    NDTree.nearestRadiusTask = NDTree.initRadusTask();
                    NDTree.insert = org.mwg.task.Actions.whileDo(function (context) {
                        {
                            var root = context.variable("root").get(0);
                            var current = context.resultAsNodes().get(0);
                            var state = current.graph().resolver().resolveState(current);
                            var updateStat = context.variable("updatestat").get(0);
                            var boundMax = state.get(org.mwg.structure.tree.NDTree._BOUNDMAX);
                            var boundMin = state.get(org.mwg.structure.tree.NDTree._BOUNDMIN);
                            var centerKey = new Float64Array(boundMax.length);
                            for (var i = 0; i < centerKey.length; i++) {
                                centerKey[i] = (boundMax[i] + boundMin[i]) / 2;
                            }
                            var keyToInsert = context.variable("key").get(0);
                            var precision = context.variable("precision").get(0);
                            var dim = keyToInsert.length;
                            if (updateStat) {
                                org.mwg.structure.tree.NDTree.updateGaussian(state, keyToInsert);
                            }
                            var continueNavigation = false;
                            for (var i = 0; i < dim; i++) {
                                if (boundMax[i] - boundMin[i] > precision[i]) {
                                    continueNavigation = true;
                                    break;
                                }
                            }
                            if (continueNavigation) {
                                var traverseId = org.mwg.structure.tree.NDTree.getRelationId(centerKey, keyToInsert);
                                if (state.get(traverseId) == null) {
                                    var newBoundMin = new Float64Array(dim);
                                    var newBoundMax = new Float64Array(dim);
                                    for (var i = 0; i < centerKey.length; i++) {
                                        if (keyToInsert[i] <= centerKey[i]) {
                                            newBoundMin[i] = boundMin[i];
                                            newBoundMax[i] = Math.max(centerKey[i] - boundMin[i], precision[i]) + boundMin[i];
                                        }
                                        else {
                                            newBoundMin[i] = boundMax[i] - Math.max(boundMax[i] - centerKey[i], precision[i]);
                                            newBoundMax[i] = boundMax[i];
                                        }
                                    }
                                    var newChild = current.graph().newTypedNode(current.world(), current.time(), org.mwg.structure.tree.NDTree.NAME);
                                    var newState = newChild.graph().resolver().resolveState(newChild);
                                    newState.set(org.mwg.structure.tree.NDTree._BOUNDMIN, org.mwg.Type.DOUBLE_ARRAY, newBoundMin);
                                    newState.set(org.mwg.structure.tree.NDTree._BOUNDMAX, org.mwg.Type.DOUBLE_ARRAY, newBoundMax);
                                    var relChild = state.getOrCreate(traverseId, org.mwg.Type.RELATION);
                                    relChild.add(newChild.id());
                                    newChild.free();
                                }
                                context.setVariable("next", traverseId);
                            }
                            else {
                                var valueToInsert = context.variable("value").get(0);
                                var rel = state.getOrCreate(org.mwg.structure.tree.NDTree._VALUES, org.mwg.Type.RELATION);
                                rel.add(valueToInsert.id());
                                var keys = state.get(org.mwg.structure.tree.NDTree._KEYS);
                                if (keys != null) {
                                    var newkeys = new Float64Array(keys.length + dim);
                                    java.lang.System.arraycopy(keys, 0, newkeys, 0, keys.length);
                                    java.lang.System.arraycopy(keyToInsert, 0, newkeys, keys.length, dim);
                                    state.set(org.mwg.structure.tree.NDTree._KEYS, org.mwg.Type.DOUBLE_ARRAY, newkeys);
                                }
                                else {
                                    state.set(org.mwg.structure.tree.NDTree._KEYS, org.mwg.Type.DOUBLE_ARRAY, keyToInsert);
                                }
                                org.mwg.structure.tree.NDTree.updateCount(true, root);
                            }
                            return continueNavigation;
                        }
                    }, org.mwg.task.Actions.action(org.mwg.structure.action.TraverseById.NAME, "{{next}}"));
                    return NDTree;
                }(org.mwg.plugin.AbstractNode));
                tree.NDTree = NDTree;
                var NDTree2 = (function (_super) {
                    __extends(NDTree2, _super);
                    function NDTree2(p_world, p_time, p_id, p_graph) {
                        _super.call(this, p_world, p_time, p_id, p_graph);
                    }
                    NDTree2.createChildAndIndex = function (dim, centerKey, boundMin, boundMax, keyToInsert, valueID, current, state, traverseId, updateStat) {
                        var newBoundMin = new Float64Array(dim);
                        var newBoundMax = new Float64Array(dim);
                        for (var i = 0; i < centerKey.length; i++) {
                            if (keyToInsert[i] <= centerKey[i]) {
                                newBoundMin[i] = boundMin[i];
                                newBoundMax[i] = centerKey[i];
                            }
                            else {
                                newBoundMin[i] = centerKey[i];
                                newBoundMax[i] = boundMax[i];
                            }
                        }
                        var newChild = current.graph().newTypedNode(current.world(), current.time(), NDTree2.NAME);
                        var newState = newChild.graph().resolver().resolveState(newChild);
                        newState.set(NDTree2._BOUNDMIN, org.mwg.Type.DOUBLE_ARRAY, newBoundMin);
                        newState.set(NDTree2._BOUNDMAX, org.mwg.Type.DOUBLE_ARRAY, newBoundMax);
                        newState.getOrCreate(NDTree2._VALUES, org.mwg.Type.RELATION).add(valueID);
                        newState.set(NDTree2._KEYS, org.mwg.Type.DOUBLE_ARRAY, keyToInsert);
                        var relChild = state.getOrCreate(traverseId, org.mwg.Type.RELATION);
                        relChild.add(newChild.id());
                        org.mwg.structure.tree.NDTree2.updateGaussian(updateStat, newState, keyToInsert);
                        newChild.free();
                    };
                    NDTree2.updateCount = function (updateCount, root) {
                        if (!updateCount) {
                            return;
                        }
                        if (root.getByIndex(NDTree2._NUMNODES) != null) {
                            var count = root.getByIndex(NDTree2._NUMNODES);
                            count++;
                            root.setPropertyByIndex(NDTree2._NUMNODES, org.mwg.Type.INT, count);
                        }
                        else {
                            root.setPropertyByIndex(NDTree2._NUMNODES, org.mwg.Type.INT, 1);
                        }
                    };
                    NDTree2.initNearestTask = function () {
                        var reccursiveDown = org.mwg.task.Actions.newTask();
                        reccursiveDown.defineVar("parent").then(function (context) {
                            {
                                var current = context.result().get(0);
                                var state = current.graph().resolver().resolveState(current);
                                var nnl = context.variable("nnl").get(0);
                                if (!state.getWithDefault(org.mwg.structure.tree.NDTree2._CONTINUENAV, false)) {
                                    var values = state.get(org.mwg.structure.tree.NDTree2._VALUES);
                                    var dim = context.variable("dim").get(0);
                                    var k = new Float64Array(dim);
                                    var keys = state.get(org.mwg.structure.tree.NDTree2._KEYS);
                                    var target = context.variable("key").get(0);
                                    var distance_10 = context.variable("distance").get(0);
                                    for (var i = 0; i < values.size(); i++) {
                                        for (var j = 0; j < dim; j++) {
                                            k[j] = keys[i * dim + j];
                                        }
                                        nnl.insert(values.get(i), distance_10.measure(k, target));
                                    }
                                    context.continueWith(null);
                                }
                                else {
                                    var boundMax_3 = state.get(org.mwg.structure.tree.NDTree2._BOUNDMAX);
                                    var boundMin_3 = state.get(org.mwg.structure.tree.NDTree2._BOUNDMIN);
                                    var target_3 = context.variable("key").get(0);
                                    var distance_11 = context.variable("distance").get(0);
                                    var worst = nnl.getWorstDistance();
                                    if (!nnl.isCapacityReached() || org.mwg.structure.tree.NDTree2.getclosestDistance(target_3, boundMin_3, boundMax_3, distance_11) <= worst) {
                                        var dim_3 = boundMin_3.length;
                                        var childMin_3 = new Float64Array(dim_3);
                                        var childMax_3 = new Float64Array(dim_3);
                                        var temp_3 = new org.mwg.structure.util.NearestNeighborArrayList();
                                        state.each(function (attributeKey, elemType, elem) {
                                            {
                                                if (attributeKey >= org.mwg.structure.tree.NDTree2._RELCONST) {
                                                    var binaries = org.mwg.structure.tree.NDTree2.binaryFromLong(attributeKey, dim_3);
                                                    for (var i = 0; i < dim_3; i++) {
                                                        if (!binaries[i]) {
                                                            childMin_3[i] = boundMin_3[i];
                                                            childMax_3[i] = (boundMax_3[i] + boundMin_3[i]) / 2;
                                                        }
                                                        else {
                                                            childMin_3[i] = (boundMax_3[i] + boundMin_3[i]) / 2;
                                                            childMax_3[i] = boundMax_3[i];
                                                        }
                                                    }
                                                    temp_3.insert(attributeKey, org.mwg.structure.tree.NDTree2.getclosestDistance(target_3, childMin_3, childMax_3, distance_11));
                                                }
                                            }
                                        });
                                        temp_3.sort();
                                        var relations = temp_3.getNodes();
                                        context.continueWith(context.wrap(relations));
                                    }
                                    else {
                                        context.continueWith(null);
                                    }
                                }
                            }
                        }).foreach(org.mwg.task.Actions.defineVar("relid").fromVar("parent").action(org.mwg.structure.action.TraverseById.NAME, "{{relid}}").subTask(reccursiveDown));
                        return reccursiveDown;
                    };
                    NDTree2.initRadusTask = function () {
                        var reccursiveDown = org.mwg.task.Actions.newTask();
                        reccursiveDown.defineVar("parent").then(function (context) {
                            {
                                var current = context.result().get(0);
                                var state = current.graph().resolver().resolveState(current);
                                var nnl = context.variable("nnl").get(0);
                                if (!state.getWithDefault(org.mwg.structure.tree.NDTree2._CONTINUENAV, false)) {
                                    var values = state.get(org.mwg.structure.tree.NDTree2._VALUES);
                                    var dim = context.variable("dim").get(0);
                                    var k = new Float64Array(dim);
                                    var keys = state.get(org.mwg.structure.tree.NDTree2._KEYS);
                                    var target = context.variable("key").get(0);
                                    var distance_12 = context.variable("distance").get(0);
                                    for (var i = 0; i < values.size(); i++) {
                                        for (var j = 0; j < dim; j++) {
                                            k[j] = keys[i * dim + j];
                                        }
                                        nnl.insert(values.get(i), distance_12.measure(k, target));
                                    }
                                    context.continueWith(null);
                                }
                                else {
                                    var boundMax_4 = state.get(org.mwg.structure.tree.NDTree2._BOUNDMAX);
                                    var boundMin_4 = state.get(org.mwg.structure.tree.NDTree2._BOUNDMIN);
                                    var target_4 = context.variable("key").get(0);
                                    var distance_13 = context.variable("distance").get(0);
                                    var radius = context.variable("radius").get(0);
                                    if (org.mwg.structure.tree.NDTree2.getclosestDistance(target_4, boundMin_4, boundMax_4, distance_13) <= radius) {
                                        var dim_4 = boundMin_4.length;
                                        var childMin_4 = new Float64Array(dim_4);
                                        var childMax_4 = new Float64Array(dim_4);
                                        var temp_4 = new org.mwg.structure.util.NearestNeighborArrayList();
                                        state.each(function (attributeKey, elemType, elem) {
                                            {
                                                if (attributeKey >= org.mwg.structure.tree.NDTree2._RELCONST) {
                                                    var binaries = org.mwg.structure.tree.NDTree2.binaryFromLong(attributeKey, dim_4);
                                                    for (var i = 0; i < dim_4; i++) {
                                                        if (!binaries[i]) {
                                                            childMin_4[i] = boundMin_4[i];
                                                            childMax_4[i] = (boundMax_4[i] + boundMin_4[i]) / 2;
                                                        }
                                                        else {
                                                            childMin_4[i] = (boundMax_4[i] + boundMin_4[i]) / 2;
                                                            childMax_4[i] = boundMax_4[i];
                                                        }
                                                    }
                                                    temp_4.insert(attributeKey, org.mwg.structure.tree.NDTree2.getclosestDistance(target_4, childMin_4, childMax_4, distance_13));
                                                }
                                            }
                                        });
                                        temp_4.sort();
                                        var relations = temp_4.getNodes();
                                        context.continueWith(context.wrap(relations));
                                    }
                                    else {
                                        context.continueWith(null);
                                    }
                                }
                            }
                        }).foreach(org.mwg.task.Actions.defineVar("relid").fromVar("parent").action(org.mwg.structure.action.TraverseById.NAME, "{{relid}}").subTask(reccursiveDown));
                        return reccursiveDown;
                    };
                    NDTree2.prototype.setUpdateStat = function (value) {
                        var state = this.unphasedState();
                        state.set(NDTree2._STAT, org.mwg.Type.BOOL, value);
                    };
                    NDTree2.updateGaussian = function (updateStat, state, key) {
                        if (!updateStat) {
                            return;
                        }
                        var total = 0;
                        var x = state.get(NDTree2._TOTAL);
                        if (x != null) {
                            total = x;
                        }
                        if (total == 0) {
                            state.set(NDTree2._TOTAL, org.mwg.Type.INT, 1);
                            state.set(NDTree2._SUM, org.mwg.Type.DOUBLE_ARRAY, key);
                        }
                        else {
                            var features = key.length;
                            var sum = void 0;
                            var sumsquares = void 0;
                            if (total == 1) {
                                sum = state.get(NDTree2._SUM);
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
                                sum = state.get(NDTree2._SUM);
                                sumsquares = state.get(NDTree2._SUMSQ);
                            }
                            for (var i = 0; i < features; i++) {
                                sum[i] += key[i];
                            }
                            var count = 0;
                            for (var i = 0; i < features; i++) {
                                for (var j = i; j < features; j++) {
                                    sumsquares[count] += key[i] * key[j];
                                    count++;
                                }
                            }
                            total++;
                            state.set(NDTree2._TOTAL, org.mwg.Type.INT, total);
                            state.set(NDTree2._SUM, org.mwg.Type.DOUBLE_ARRAY, sum);
                            state.set(NDTree2._SUMSQ, org.mwg.Type.DOUBLE_ARRAY, sumsquares);
                        }
                    };
                    NDTree2.prototype.getTotal = function () {
                        var x = _super.prototype.getByIndex.call(this, NDTree2._TOTAL);
                        if (x == null) {
                            return 0;
                        }
                        else {
                            return x;
                        }
                    };
                    NDTree2.prototype.getAvg = function () {
                        var total = this.getTotal();
                        if (total == 0) {
                            return null;
                        }
                        if (total == 1) {
                            return _super.prototype.getByIndex.call(this, NDTree2._SUM);
                        }
                        else {
                            var avg = _super.prototype.getByIndex.call(this, NDTree2._SUM);
                            for (var i = 0; i < avg.length; i++) {
                                avg[i] = avg[i] / total;
                            }
                            return avg;
                        }
                    };
                    NDTree2.prototype.setBounds = function (min, max) {
                        var state = this.unphasedState();
                        if (state.get(NDTree2._BOUNDMIN) != null) {
                            throw new Error("Bounds can't be changed!, you need to re-index");
                        }
                        if (min.length != max.length) {
                            throw new Error("Min and max bounds should be the same array length");
                        }
                        for (var i = 0; i < min.length; i++) {
                            if (min[i] >= max[i]) {
                                throw new Error("Min should be always exclusively smaller than max");
                            }
                        }
                        state.set(NDTree2._DIM, org.mwg.Type.INT, min.length);
                        state.set(NDTree2._BOUNDMIN, org.mwg.Type.DOUBLE_ARRAY, min);
                        state.set(NDTree2._BOUNDMAX, org.mwg.Type.DOUBLE_ARRAY, max);
                    };
                    NDTree2.prototype.getCovarianceArray = function (avg, err) {
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
                            var sumsquares = _super.prototype.getByIndex.call(this, NDTree2._SUMSQ);
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
                    NDTree2.getRelationId = function (centerKey, keyToInsert) {
                        var result = Long.UZERO;
                        for (var i = 0; i < centerKey.length; i++) {
                            if (i != 0) {
                                result = result.shiftLeft(1);
                            }
                            if (keyToInsert[i] > centerKey[i]) {
                                result = result.add(Long.ONE);
                            }
                        }
                        return result.add(Long.fromNumber(org.mwg.structure.tree.NDTree2._RELCONST, true)).toNumber();
                    };
                    NDTree2.binaryFromLong = function (value, dim) {
                        var tempvalue = value - NDTree2._RELCONST;
                        var shiftvalue = tempvalue >> 1;
                        var res = [];
                        for (var i = 0; i < dim; i++) {
                            res[dim - i - 1] = ((tempvalue - (shiftvalue << 1)) == 1);
                            tempvalue = shiftvalue;
                            shiftvalue = tempvalue >> 1;
                        }
                        return res;
                    };
                    NDTree2.prototype.getDistance = function (state) {
                        var d = state.getWithDefault(NDTree2._DISTANCE, NDTree2.DISTANCE_TYPE_DEF);
                        var distance;
                        if (d == org.mwg.structure.distance.Distances.EUCLIDEAN) {
                            distance = org.mwg.structure.distance.EuclideanDistance.instance();
                        }
                        else if (d == org.mwg.structure.distance.Distances.GEODISTANCE) {
                            distance = org.mwg.structure.distance.GeoDistance.instance();
                        }
                        else {
                            throw new Error("Unknown distance code metric");
                        }
                        return distance;
                    };
                    NDTree2.prototype.setDistance = function (distanceType) {
                        this.setPropertyByIndex(NDTree2._DISTANCE, org.mwg.Type.INT, distanceType);
                    };
                    NDTree2.prototype.setFrom = function (extractor) {
                        this.setPropertyByIndex(NDTree2._FROM, org.mwg.Type.STRING, extractor);
                    };
                    NDTree2.prototype.nearestN = function (key, n, callback) {
                        var _this = this;
                        var state = this.unphasedState();
                        var dim;
                        var tdim = state.get(NDTree2._DIM);
                        if (tdim == null) {
                            callback(null);
                            return;
                        }
                        else {
                            dim = tdim;
                            if (key.length != dim) {
                                throw new Error("Key size should always be the same");
                            }
                        }
                        var nnl = new org.mwg.structure.util.NearestNeighborList(n);
                        var distance = this.getDistance(state);
                        var tc = NDTree2.nearestTask.prepareWith(this.graph(), this, function (result) {
                            {
                                var res_7 = nnl.getNodes();
                                if (res_7.length != 0) {
                                    var lookupall = org.mwg.task.Actions.setWorld(java.lang.String.valueOf(_this.world())).setTime(java.lang.String.valueOf(_this.time())).fromVar("res").lookupAll("{{result}}");
                                    var tc_7 = lookupall.prepareWith(_this.graph(), null, function (result) {
                                        {
                                            var finalres = new Array(result.size());
                                            for (var i = 0; i < result.size(); i++) {
                                                finalres[i] = result.get(i);
                                            }
                                            callback(finalres);
                                        }
                                    });
                                    var tr = tc_7.wrap(res_7);
                                    tc_7.addToGlobalVariable("res", tr);
                                    lookupall.executeUsing(tc_7);
                                }
                                else {
                                    callback(new Array(0));
                                }
                            }
                        });
                        var res = tc.newResult();
                        res.add(key);
                        tc.setGlobalVariable("key", res);
                        tc.setGlobalVariable("distance", distance);
                        tc.setGlobalVariable("dim", dim);
                        tc.setGlobalVariable("nnl", nnl);
                        NDTree2.nearestTask.executeUsing(tc);
                    };
                    NDTree2.prototype.nearestWithinRadius = function (key, radius, callback) {
                        var _this = this;
                        var state = this.unphasedState();
                        var dim;
                        var tdim = state.get(NDTree2._DIM);
                        if (tdim == null) {
                            callback(null);
                            return;
                        }
                        else {
                            dim = tdim;
                            if (key.length != dim) {
                                throw new Error("Key size should always be the same");
                            }
                        }
                        var nnl = new org.mwg.structure.util.NearestNeighborArrayList();
                        var distance = this.getDistance(state);
                        var tc = NDTree2.nearestRadiusTask.prepareWith(this.graph(), this, function (result) {
                            {
                                var res_8 = nnl.getNodes();
                                if (res_8.length != 0) {
                                    var lookupall = org.mwg.task.Actions.setWorld(java.lang.String.valueOf(_this.world())).setTime(java.lang.String.valueOf(_this.time())).fromVar("res").lookupAll("{{result}}");
                                    var tc_8 = lookupall.prepareWith(_this.graph(), null, function (result) {
                                        {
                                            var finalres = new Array(result.size());
                                            for (var i = 0; i < result.size(); i++) {
                                                finalres[i] = result.get(i);
                                            }
                                            callback(finalres);
                                        }
                                    });
                                    var tr = tc_8.wrap(res_8);
                                    tc_8.addToGlobalVariable("res", tr);
                                    lookupall.executeUsing(tc_8);
                                }
                                else {
                                    callback(new Array(0));
                                }
                            }
                        });
                        var res = tc.newResult();
                        res.add(key);
                        tc.setGlobalVariable("key", res);
                        tc.setGlobalVariable("distance", distance);
                        tc.setGlobalVariable("dim", dim);
                        tc.setGlobalVariable("radius", radius);
                        tc.setGlobalVariable("nnl", nnl);
                        NDTree2.nearestRadiusTask.executeUsing(tc);
                    };
                    NDTree2.prototype.nearestNWithinRadius = function (key, nbElem, radius, callback) {
                        var _this = this;
                        var state = this.unphasedState();
                        var dim;
                        var tdim = state.get(NDTree2._DIM);
                        if (tdim == null) {
                            callback(null);
                            return;
                        }
                        else {
                            dim = tdim;
                            if (key.length != dim) {
                                throw new Error("Key size should always be the same");
                            }
                        }
                        var nnl = new org.mwg.structure.util.NearestNeighborList(nbElem);
                        var distance = this.getDistance(state);
                        var tc = NDTree2.nearestTask.prepareWith(this.graph(), this, function (result) {
                            {
                                var res_9 = nnl.getAllNodesWithin(radius);
                                if (res_9.length != 0) {
                                    var lookupall = org.mwg.task.Actions.setWorld(java.lang.String.valueOf(_this.world())).setTime(java.lang.String.valueOf(_this.time())).fromVar("res").lookupAll("{{result}}");
                                    var tc_9 = lookupall.prepareWith(_this.graph(), null, function (result) {
                                        {
                                            var finalres = new Array(result.size());
                                            for (var i = 0; i < result.size(); i++) {
                                                finalres[i] = result.get(i);
                                            }
                                            callback(finalres);
                                        }
                                    });
                                    var tr = tc_9.wrap(res_9);
                                    tc_9.addToGlobalVariable("res", tr);
                                    lookupall.executeUsing(tc_9);
                                }
                                else {
                                    callback(new Array(0));
                                }
                            }
                        });
                        var res = tc.newResult();
                        res.add(key);
                        tc.setGlobalVariable("key", res);
                        tc.setGlobalVariable("distance", distance);
                        tc.setGlobalVariable("dim", dim);
                        tc.setGlobalVariable("nnl", nnl);
                        NDTree2.nearestTask.executeUsing(tc);
                    };
                    NDTree2.prototype.checkKey = function (state, key, dim) {
                        if (key.length != dim) {
                            throw new Error("Key size should always be the same");
                        }
                        var min = state.get(NDTree2._BOUNDMIN);
                        var max = state.get(NDTree2._BOUNDMAX);
                        if (min == null || max == null) {
                            throw new Error("Please set min and max boundary before inserting in the tree");
                        }
                        for (var i = 0; i < dim; i++) {
                            if (key[i] < min[i] || key[i] > max[i]) {
                                throw new Error("Key should be between min and max boundaries");
                            }
                        }
                        return true;
                    };
                    NDTree2.prototype.insertWith = function (key, value, callback) {
                        if (value == null || key == null) {
                            return;
                        }
                        var state = this.unphasedState();
                        if (state.get(NDTree2._DIM) == null) {
                            state.set(NDTree2._DIM, org.mwg.Type.INT, key.length);
                        }
                        var dim = state.getWithDefault(NDTree2._DIM, key.length);
                        this.checkKey(state, key, dim);
                        var tc = NDTree2.insert.prepareWith(this.graph(), this, function (result) {
                            {
                                result.free();
                                if (callback != null) {
                                    callback(true);
                                }
                            }
                        });
                        var res = tc.newResult();
                        res.add(key);
                        tc.setGlobalVariable("key", res);
                        tc.setGlobalVariable("value", value.id());
                        tc.setGlobalVariable("distance", this.getDistance(state));
                        tc.setGlobalVariable("distancemin", state.getWithDefault(NDTree2._DISTANCETHRESHOLD, NDTree2.DISTANCE_THRESHOLD_DEF));
                        tc.setGlobalVariable("updatestat", state.getWithDefault(NDTree2._STAT, NDTree2.STAT_DEF));
                        tc.setGlobalVariable("updatecount", true);
                        tc.setGlobalVariable("updatestatchild", state.getWithDefault(NDTree2._STAT, NDTree2.STAT_DEF));
                        tc.setGlobalVariable("root", this);
                        NDTree2.insert.executeUsing(tc);
                    };
                    NDTree2.prototype.extractFeatures = function (current, callback) {
                        var _this = this;
                        var query = _super.prototype.getByIndex.call(this, NDTree2._FROM);
                        if (query != null) {
                            var split = query.split(",");
                            var tasks_3 = new Array(split.length);
                            for (var i = 0; i < split.length; i++) {
                                var t = org.mwg.task.Actions.setWorld("" + this.world());
                                t.setTime(this.time() + "");
                                t.parse(split[i].trim());
                                tasks_3[i] = t;
                            }
                            var result_3 = new Float64Array(tasks_3.length);
                            var waiter_3 = this.graph().newCounter(tasks_3.length);
                            var _loop_4 = function(i) {
                                var initial = org.mwg.task.Actions.newTask().emptyResult();
                                initial.add(current);
                                var capsule = function (i) {
                                    {
                                        tasks_3[i].executeWith(_this.graph(), initial, function (currentResult) {
                                            {
                                                if (currentResult == null) {
                                                    result_3[i] = org.mwg.Constants.NULL_LONG;
                                                }
                                                else {
                                                    result_3[i] = parseFloat(currentResult.get(0).toString());
                                                    currentResult.free();
                                                }
                                                waiter_3.count();
                                            }
                                        });
                                    }
                                };
                                capsule(i);
                            };
                            for (var i = 0; i < split.length; i++) {
                                _loop_4(i);
                            }
                            waiter_3.then(function () {
                                {
                                    callback(result_3);
                                }
                            });
                        }
                        else {
                            callback(null);
                        }
                    };
                    NDTree2.prototype.insert = function (value, callback) {
                        var _this = this;
                        this.extractFeatures(value, function (result) {
                            {
                                _this.insertWith(result, value, callback);
                            }
                        });
                    };
                    NDTree2.prototype.size = function () {
                        if (this.getByIndex(NDTree2._NUMNODES) != null) {
                            return this.getByIndex(NDTree2._NUMNODES);
                        }
                        else {
                            return 1;
                        }
                    };
                    NDTree2.getclosestDistance = function (target, boundMin, boundMax, distance) {
                        var closest = new Float64Array(target.length);
                        for (var i = 0; i < target.length; i++) {
                            if (target[i] >= boundMax[i]) {
                                closest[i] = boundMax[i];
                            }
                            else if (target[i] <= boundMin[i]) {
                                closest[i] = boundMin[i];
                            }
                            else {
                                closest[i] = target[i];
                            }
                        }
                        return distance.measure(closest, target);
                    };
                    NDTree2.NAME = "NDTree2";
                    NDTree2._STAT = 0;
                    NDTree2._TOTAL = 1;
                    NDTree2._SUM = 2;
                    NDTree2._SUMSQ = 3;
                    NDTree2._BOUNDMIN = 6;
                    NDTree2._BOUNDMAX = 7;
                    NDTree2._VALUES = 8;
                    NDTree2._KEYS = 9;
                    NDTree2._VALUES_STR = "8";
                    NDTree2._KEYS_STR = "9";
                    NDTree2._CONTINUENAV = 10;
                    NDTree2._NUMNODES = 11;
                    NDTree2._DIM = 12;
                    NDTree2._DISTANCE = 13;
                    NDTree2._DISTANCETHRESHOLD = 14;
                    NDTree2._FROM = 15;
                    NDTree2.DISTANCE_THRESHOLD = "threshold";
                    NDTree2.DISTANCE_THRESHOLD_DEF = 1e-10;
                    NDTree2.DISTANCE_TYPE_DEF = 0;
                    NDTree2.STAT_DEF = false;
                    NDTree2.MAXINSIDE = 2;
                    NDTree2._RELCONST = 16;
                    NDTree2.nearestTask = NDTree2.initNearestTask();
                    NDTree2.nearestRadiusTask = NDTree2.initRadusTask();
                    NDTree2.insert = org.mwg.task.Actions.whileDo(function (context) {
                        {
                            var root = context.variable("root").get(0);
                            var current = context.resultAsNodes().get(0);
                            var state_5 = current.graph().resolver().resolveState(current);
                            var updateStat = context.variable("updatestat").get(0);
                            var updateCount = context.variable("updatecount").get(0);
                            var boundMax = state_5.get(org.mwg.structure.tree.NDTree2._BOUNDMAX);
                            var boundMin = state_5.get(org.mwg.structure.tree.NDTree2._BOUNDMIN);
                            var centerKey = new Float64Array(boundMax.length);
                            for (var i = 0; i < centerKey.length; i++) {
                                centerKey[i] = (boundMax[i] + boundMin[i]) / 2;
                            }
                            var keyToInsert = context.variable("key").get(0);
                            var valueToInsert = context.variable("value").get(0);
                            var dim = keyToInsert.length;
                            var continueNavigation = state_5.getWithDefault(org.mwg.structure.tree.NDTree2._CONTINUENAV, false);
                            if (continueNavigation) {
                                org.mwg.structure.tree.NDTree2.updateGaussian(updateStat, state_5, keyToInsert);
                                var traverseId = org.mwg.structure.tree.NDTree2.getRelationId(centerKey, keyToInsert);
                                if (state_5.get(traverseId) == null) {
                                    var updatestatchild = context.variable("updatestatchild").get(0);
                                    org.mwg.structure.tree.NDTree2.createChildAndIndex(dim, centerKey, boundMin, boundMax, keyToInsert, valueToInsert, current, state_5, traverseId, updatestatchild);
                                    org.mwg.structure.tree.NDTree2.updateCount(updateCount, root);
                                    return false;
                                }
                                else {
                                    context.setVariable("next", traverseId);
                                    return true;
                                }
                            }
                            else {
                                var rel_1 = state_5.getOrCreate(org.mwg.structure.tree.NDTree2._VALUES, org.mwg.Type.RELATION);
                                var keys = state_5.get(org.mwg.structure.tree.NDTree2._KEYS);
                                var distancemin = context.variable("distancemin").get(0);
                                var distance_14 = context.variable("distance").get(0);
                                if (keys != null) {
                                    var tempkey = new Float64Array(dim);
                                    for (var j = 0; j < rel_1.size(); j++) {
                                        java.lang.System.arraycopy(keys, j * dim, tempkey, 0, dim);
                                        if (distance_14.measure(tempkey, keyToInsert) < distancemin) {
                                            for (var k = 0; k < dim; k++) {
                                                keys[j * dim + k] = keyToInsert[k];
                                            }
                                            state_5.set(org.mwg.structure.tree.NDTree2._KEYS, org.mwg.Type.DOUBLE_ARRAY, keys);
                                            rel_1.set(j, valueToInsert);
                                            return false;
                                        }
                                    }
                                    var newkeys = new Float64Array(keys.length + dim);
                                    java.lang.System.arraycopy(keys, 0, newkeys, 0, keys.length);
                                    java.lang.System.arraycopy(keyToInsert, 0, newkeys, keys.length, dim);
                                    state_5.set(org.mwg.structure.tree.NDTree2._KEYS, org.mwg.Type.DOUBLE_ARRAY, newkeys);
                                    rel_1.add(valueToInsert);
                                    keys = newkeys;
                                    org.mwg.structure.tree.NDTree2.updateCount(updateCount, root);
                                    org.mwg.structure.tree.NDTree2.updateGaussian(updateStat, state_5, keyToInsert);
                                    if (rel_1.size() <= org.mwg.structure.tree.NDTree2.MAXINSIDE) {
                                        return false;
                                    }
                                    else {
                                        state_5.set(org.mwg.structure.tree.NDTree2._CONTINUENAV, org.mwg.Type.BOOL, true);
                                        var dc_1 = root.graph().newCounter(rel_1.size());
                                        for (var i = 0; i < rel_1.size(); i++) {
                                            var tempsk = new Float64Array(dim);
                                            java.lang.System.arraycopy(keys, i * dim, tempsk, 0, dim);
                                            var tc = org.mwg.structure.tree.NDTree2.insert.prepareWith(root.graph(), current, function (result) {
                                                {
                                                    result.free();
                                                    dc_1.count();
                                                }
                                            });
                                            tc.setGlobalVariable("distance", distance_14);
                                            tc.setGlobalVariable("distancemin", distancemin);
                                            tc.setGlobalVariable("updatestat", false);
                                            tc.setGlobalVariable("updatecount", false);
                                            tc.setGlobalVariable("updatestatchild", updateStat);
                                            tc.setGlobalVariable("root", current);
                                            var res = tc.newResult();
                                            res.add(tempsk);
                                            tc.setGlobalVariable("key", res);
                                            tc.setGlobalVariable("value", rel_1.get(i));
                                            org.mwg.structure.tree.NDTree2.insert.executeUsing(tc);
                                        }
                                        dc_1.then(function () {
                                            {
                                                rel_1.clear();
                                                state_5.set(org.mwg.structure.tree.NDTree2._KEYS, org.mwg.Type.DOUBLE_ARRAY, null);
                                            }
                                        });
                                        return false;
                                    }
                                }
                                else {
                                    state_5.set(org.mwg.structure.tree.NDTree2._KEYS, org.mwg.Type.DOUBLE_ARRAY, keyToInsert);
                                    rel_1.add(valueToInsert);
                                    org.mwg.structure.tree.NDTree2.updateCount(updateCount, root);
                                    org.mwg.structure.tree.NDTree2.updateGaussian(updateStat, state_5, keyToInsert);
                                    return false;
                                }
                            }
                        }
                    }, org.mwg.task.Actions.action(org.mwg.structure.action.TraverseById.NAME, "{{next}}"));
                    return NDTree2;
                }(org.mwg.plugin.AbstractNode));
                tree.NDTree2 = NDTree2;
            })(tree = structure.tree || (structure.tree = {}));
            var util;
            (function (util) {
                var HRect = (function () {
                    function HRect(vmin, vmax) {
                        this.min = new Float64Array(vmin.length);
                        this.max = new Float64Array(vmax.length);
                        java.lang.System.arraycopy(vmin, 0, this.min, 0, vmin.length);
                        java.lang.System.arraycopy(vmax, 0, this.max, 0, vmax.length);
                    }
                    HRect.prototype.clone = function () {
                        return new org.mwg.structure.util.HRect(this.min, this.max);
                    };
                    HRect.prototype.closest = function (t) {
                        var p = new Float64Array(t.length);
                        for (var i = 0; i < t.length; ++i) {
                            if (t[i] <= this.min[i]) {
                                p[i] = this.min[i];
                            }
                            else if (t[i] >= this.max[i]) {
                                p[i] = this.max[i];
                            }
                            else {
                                p[i] = t[i];
                            }
                        }
                        return p;
                    };
                    HRect.infiniteHRect = function (d) {
                        var vmin = new Float64Array(d);
                        var vmax = new Float64Array(d);
                        for (var i = 0; i < d; ++i) {
                            vmin[i] = java.lang.Double.NEGATIVE_INFINITY;
                            vmax[i] = java.lang.Double.POSITIVE_INFINITY;
                        }
                        return new org.mwg.structure.util.HRect(vmin, vmax);
                    };
                    HRect.prototype.intersection = function (r) {
                        var newmin = new Float64Array(this.min.length);
                        var newmax = new Float64Array(this.min.length);
                        for (var i = 0; i < this.min.length; ++i) {
                            newmin[i] = Math.max(this.min[i], r.min[i]);
                            newmax[i] = Math.min(this.max[i], r.max[i]);
                            if (newmin[i] >= newmax[i])
                                return null;
                        }
                        return new org.mwg.structure.util.HRect(newmin, newmax);
                    };
                    HRect.prototype.area = function () {
                        var a = 1;
                        for (var i = 0; i < this.min.length; ++i) {
                            a *= (this.max[i] - this.min[i]);
                        }
                        return a;
                    };
                    HRect.prototype.toString = function () {
                        return this.min + "\n" + this.max + "\n";
                    };
                    return HRect;
                }());
                util.HRect = HRect;
                var NDResult = (function () {
                    function NDResult() {
                    }
                    return NDResult;
                }());
                util.NDResult = NDResult;
                var NearestNeighborArrayList = (function () {
                    function NearestNeighborArrayList() {
                        this.maxPriority = java.lang.Double.MAX_VALUE;
                        this.count = 0;
                        this.data = new java.util.ArrayList();
                        this.value = new java.util.ArrayList();
                        this.value.add(this.maxPriority);
                        this.data.add(-1);
                    }
                    NearestNeighborArrayList.prototype.getMaxPriority = function () {
                        if (this.count == 0) {
                            return java.lang.Double.POSITIVE_INFINITY;
                        }
                        return this.value.get(1);
                    };
                    NearestNeighborArrayList.prototype.insert = function (node, priority) {
                        this.count++;
                        this.value.add(priority);
                        this.data.add(node);
                        this.bubbleUp(this.count);
                        return true;
                    };
                    NearestNeighborArrayList.prototype.distroyAndGetAllNodes = function () {
                        var size = this.count;
                        var nbrs = new Float64Array(this.count);
                        for (var i = 0; i < size; ++i) {
                            nbrs[size - i - 1] = this.remove();
                        }
                        return nbrs;
                    };
                    NearestNeighborArrayList.prototype.sort = function () {
                        for (var i = 2; i < this.count; i++) {
                            for (var j = i + 1; j < this.count; j++) {
                                if (this.value.get(i) < this.value.get(j)) {
                                    var tempv = this.value.get(i);
                                    this.value.set(i, this.value.get(j));
                                    this.value.set(j, tempv);
                                    var templ = this.data.get(i);
                                    this.data.set(i, this.data.get(j));
                                    this.data.set(j, templ);
                                }
                            }
                        }
                    };
                    NearestNeighborArrayList.prototype.getWorstDistance = function () {
                        return this.value.get(1);
                    };
                    NearestNeighborArrayList.prototype.getNodes = function () {
                        var nbrs = new Float64Array(this.count);
                        for (var i = 0; i < this.count; i++) {
                            nbrs[i] = this.data.get(this.count - i);
                        }
                        return nbrs;
                    };
                    NearestNeighborArrayList.prototype.getDistances = function () {
                        var nbrs = new Float64Array(this.count);
                        for (var i = 0; i < this.count; i++) {
                            nbrs[i] = this.value.get(this.count - i);
                        }
                        return nbrs;
                    };
                    NearestNeighborArrayList.prototype.getHighest = function () {
                        return this.data.get(1);
                    };
                    NearestNeighborArrayList.prototype.getBestDistance = function () {
                        return this.value.get(1);
                    };
                    NearestNeighborArrayList.prototype.isEmpty = function () {
                        return this.count == 0;
                    };
                    NearestNeighborArrayList.prototype.getSize = function () {
                        return this.count;
                    };
                    NearestNeighborArrayList.prototype.remove = function () {
                        if (this.count == 0)
                            return 0;
                        var element = this.data.get(1);
                        this.data.set(1, this.data.get(this.count));
                        this.value.set(1, this.value.get(this.count));
                        this.data.set(this.count, 0);
                        this.value.set(this.count, 0);
                        this.count--;
                        this.bubbleDown(1);
                        return element;
                    };
                    NearestNeighborArrayList.prototype.bubbleDown = function (pos) {
                        var element = this.data.get(pos);
                        var priority = this.value.get(pos);
                        var child;
                        for (; pos * 2 <= this.count; pos = child) {
                            child = pos * 2;
                            if (child != this.count)
                                if (this.value.get(child) < this.value.get(child + 1))
                                    child++;
                            if (priority < this.value.get(child)) {
                                this.value.set(pos, this.value.get(child));
                                this.data.set(pos, this.data.get(child));
                            }
                            else {
                                break;
                            }
                        }
                        this.value.set(pos, priority);
                        this.data.set(pos, element);
                    };
                    NearestNeighborArrayList.prototype.bubbleUp = function (pos) {
                        var element = this.data.get(pos);
                        var priority = this.value.get(pos);
                        var halfpos = Math.floor(pos / 2);
                        while (this.value.get(halfpos) < priority) {
                            this.value.set(pos, this.value.get(halfpos));
                            this.data.set(pos, this.data.get(halfpos));
                            pos = Math.floor(pos / 2);
                            halfpos = Math.floor(pos / 2);
                        }
                        this.value.set(pos, priority);
                        this.data.set(pos, element);
                    };
                    return NearestNeighborArrayList;
                }());
                util.NearestNeighborArrayList = NearestNeighborArrayList;
                var NearestNeighborList = (function () {
                    function NearestNeighborList(capacity) {
                        this.maxPriority = java.lang.Double.MAX_VALUE;
                        this.count = 0;
                        this.capacity = capacity;
                        this.data = new Float64Array(capacity + 1);
                        this.value = new Float64Array(capacity + 1);
                        this.value[0] = this.maxPriority;
                    }
                    NearestNeighborList.prototype.getMaxPriority = function () {
                        if (this.count == 0) {
                            return java.lang.Double.POSITIVE_INFINITY;
                        }
                        return this.value[1];
                    };
                    NearestNeighborList.prototype.removeNode = function (node) {
                        var pos = -1;
                        for (var i = 1; i < this.capacity + 1; i++) {
                            if (this.data[i] == node) {
                                pos = i;
                                break;
                            }
                        }
                        if (pos == -1) {
                            return false;
                        }
                        else if (pos == 1) {
                            this.remove();
                        }
                        else if (pos == this.capacity + 1) {
                            this.data[pos] = 0;
                            this.value[pos] = 0;
                            this.count--;
                        }
                        else {
                            for (var i = pos; i < this.capacity; i++) {
                                this.data[i] = this.data[i + 1];
                                this.value[i] = this.value[i + 1];
                            }
                            this.count--;
                        }
                        return true;
                    };
                    NearestNeighborList.prototype.insert = function (node, priority) {
                        if (this.count < this.capacity) {
                            this.add(node, priority);
                            return true;
                        }
                        if (priority > this.getMaxPriority()) {
                            return false;
                        }
                        this.remove();
                        this.add(node, priority);
                        return true;
                    };
                    NearestNeighborList.prototype.print = function () {
                        console.log(" ");
                        console.log("keys: ");
                        for (var i = 0; i < this.data.length; i++) {
                            console.log(this.data[i]);
                        }
                        console.log(" ");
                        console.log("dist: ");
                        for (var i = 0; i < this.value.length; i++) {
                            console.log(this.value[i]);
                        }
                        console.log(" ");
                    };
                    NearestNeighborList.prototype.getNodes = function () {
                        var size = Math.min(this.capacity, this.count);
                        var nbrs = new Float64Array(size);
                        for (var i = 0; i < size; ++i) {
                            nbrs[size - i - 1] = this.remove();
                        }
                        return nbrs;
                    };
                    NearestNeighborList.prototype.isCapacityReached = function () {
                        return this.count >= this.capacity;
                    };
                    NearestNeighborList.prototype.getHighest = function () {
                        return this.data[1];
                    };
                    NearestNeighborList.prototype.getWorstDistance = function () {
                        return this.value[1];
                    };
                    NearestNeighborList.prototype.isEmpty = function () {
                        return this.count == 0;
                    };
                    NearestNeighborList.prototype.getSize = function () {
                        return this.count;
                    };
                    NearestNeighborList.prototype.add = function (element, priority) {
                        if (this.count++ >= this.capacity) {
                            this.expandCapacity();
                        }
                        this.value[this.count] = priority;
                        this.data[this.count] = element;
                        this.bubbleUp(this.count);
                    };
                    NearestNeighborList.prototype.remove = function () {
                        if (this.count == 0)
                            return 0;
                        var element = this.data[1];
                        this.data[1] = this.data[this.count];
                        this.value[1] = this.value[this.count];
                        this.data[this.count] = 0;
                        this.value[this.count] = 0;
                        this.count--;
                        this.bubbleDown(1);
                        return element;
                    };
                    NearestNeighborList.prototype.bubbleDown = function (pos) {
                        var element = this.data[pos];
                        var priority = this.value[pos];
                        var child;
                        for (; pos * 2 <= this.count; pos = child) {
                            child = pos * 2;
                            if (child != this.count)
                                if (this.value[child] < this.value[child + 1])
                                    child++;
                            if (priority < this.value[child]) {
                                this.value[pos] = this.value[child];
                                this.data[pos] = this.data[child];
                            }
                            else {
                                break;
                            }
                        }
                        this.value[pos] = priority;
                        this.data[pos] = element;
                    };
                    NearestNeighborList.prototype.bubbleUp = function (pos) {
                        var element = this.data[pos];
                        var priority = this.value[pos];
                        var halfpos = Math.floor(pos / 2);
                        while (this.value[halfpos] < priority) {
                            this.value[pos] = this.value[halfpos];
                            this.data[pos] = this.data[halfpos];
                            pos = Math.floor(pos / 2);
                            halfpos = Math.floor(pos / 2);
                        }
                        this.value[pos] = priority;
                        this.data[pos] = element;
                    };
                    NearestNeighborList.prototype.expandCapacity = function () {
                        this.capacity = this.count * 2;
                        var elements = new Float64Array(this.capacity + 1);
                        var prioritys = new Float64Array(this.capacity + 1);
                        java.lang.System.arraycopy(this.data, 0, elements, 0, this.data.length);
                        java.lang.System.arraycopy(this.value, 0, prioritys, 0, this.data.length);
                        this.data = elements;
                        this.value = prioritys;
                    };
                    NearestNeighborList.prototype.getAllNodesWithin = function (radius) {
                        var size = Math.min(this.capacity, this.count);
                        var nbrs = new Float64Array(size);
                        var cc = 0;
                        for (var i = 0; i < size; ++i) {
                            if (this.getMaxPriority() <= radius) {
                                nbrs[size - cc - 1] = this.remove();
                                cc++;
                            }
                            else {
                                this.remove();
                            }
                        }
                        var trimnbrs = new Float64Array(cc);
                        java.lang.System.arraycopy(nbrs, size - cc, trimnbrs, 0, cc);
                        return trimnbrs;
                    };
                    return NearestNeighborList;
                }());
                util.NearestNeighborList = NearestNeighborList;
            })(util = structure.util || (structure.util = {}));
        })(structure = mwg.structure || (mwg.structure = {}));
    })(mwg = org.mwg || (org.mwg = {}));
})(org || (org = {}));
//# sourceMappingURL=mwg.structure.js.map