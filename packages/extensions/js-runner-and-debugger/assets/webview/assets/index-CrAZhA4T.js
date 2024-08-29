var Vl = Object.defineProperty;
var Ql = (e, t, n) =>
  t in e
    ? Vl(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n })
    : (e[t] = n);
var fn = (e, t, n) => Ql(e, typeof t != 'symbol' ? t + '' : t, n);
(function () {
  const t = document.createElement('link').relList;
  if (t && t.supports && t.supports('modulepreload')) return;
  for (const s of document.querySelectorAll('link[rel="modulepreload"]')) r(s);
  new MutationObserver(s => {
    for (const i of s)
      if (i.type === 'childList')
        for (const o of i.addedNodes)
          o.tagName === 'LINK' && o.rel === 'modulepreload' && r(o);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(s) {
    const i = {};
    return (
      s.integrity && (i.integrity = s.integrity),
      s.referrerPolicy && (i.referrerPolicy = s.referrerPolicy),
      s.crossOrigin === 'use-credentials'
        ? (i.credentials = 'include')
        : s.crossOrigin === 'anonymous'
          ? (i.credentials = 'omit')
          : (i.credentials = 'same-origin'),
      i
    );
  }
  function r(s) {
    if (s.ep) return;
    s.ep = !0;
    const i = n(s);
    fetch(s.href, i);
  }
})();
/**
 * @vue/shared v3.4.30
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ /*! #__NO_SIDE_EFFECTS__ */ function Ys(e, t) {
  const n = new Set(e.split(','));
  return r => n.has(r);
}
const xe = {},
  gn = [],
  at = () => {},
  ql = () => !1,
  kr = e =>
    e.charCodeAt(0) === 111 &&
    e.charCodeAt(1) === 110 &&
    (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97),
  ei = e => e.startsWith('onUpdate:'),
  Fe = Object.assign,
  ti = (e, t) => {
    const n = e.indexOf(t);
    n > -1 && e.splice(n, 1);
  },
  zl = Object.prototype.hasOwnProperty,
  be = (e, t) => zl.call(e, t),
  fe = Array.isArray,
  mn = e => Dr(e) === '[object Map]',
  Wo = e => Dr(e) === '[object Set]',
  ve = e => typeof e == 'function',
  ke = e => typeof e == 'string',
  Gt = e => typeof e == 'symbol',
  Ie = e => e !== null && typeof e == 'object',
  Jo = e => (Ie(e) || ve(e)) && ve(e.then) && ve(e.catch),
  Xo = Object.prototype.toString,
  Dr = e => Xo.call(e),
  Gl = e => Dr(e).slice(8, -1),
  Zo = e => Dr(e) === '[object Object]',
  ni = e => ke(e) && e !== 'NaN' && e[0] !== '-' && '' + parseInt(e, 10) === e,
  Rn = Ys(
    ',key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted'
  ),
  jr = e => {
    const t = Object.create(null);
    return n => t[n] || (t[n] = e(n));
  },
  Hl = /-(\w)/g,
  bn = jr(e => e.replace(Hl, (t, n) => (n ? n.toUpperCase() : ''))),
  Kl = /\B([A-Z])/g,
  ln = jr(e => e.replace(Kl, '-$1').toLowerCase()),
  Yo = jr(e => e.charAt(0).toUpperCase() + e.slice(1)),
  ss = jr(e => (e ? `on${Yo(e)}` : '')),
  qt = (e, t) => !Object.is(e, t),
  is = (e, ...t) => {
    for (let n = 0; n < e.length; n++) e[n](...t);
  },
  ea = (e, t, n, r = !1) => {
    Object.defineProperty(e, t, {
      configurable: !0,
      enumerable: !1,
      writable: r,
      value: n,
    });
  },
  Bl = e => {
    const t = parseFloat(e);
    return isNaN(t) ? e : t;
  },
  Wl = e => {
    const t = ke(e) ? Number(e) : NaN;
    return isNaN(t) ? e : t;
  };
let Ni;
const ta = () =>
  Ni ||
  (Ni =
    typeof globalThis < 'u'
      ? globalThis
      : typeof self < 'u'
        ? self
        : typeof window < 'u'
          ? window
          : typeof global < 'u'
            ? global
            : {});
function ht(e) {
  if (fe(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const r = e[n],
        s = ke(r) ? Yl(r) : ht(r);
      if (s) for (const i in s) t[i] = s[i];
    }
    return t;
  } else if (ke(e) || Ie(e)) return e;
}
const Jl = /;(?![^(]*\))/g,
  Xl = /:([^]+)/,
  Zl = /\/\*[^]*?\*\//g;
function Yl(e) {
  const t = {};
  return (
    e
      .replace(Zl, '')
      .split(Jl)
      .forEach(n => {
        if (n) {
          const r = n.split(Xl);
          r.length > 1 && (t[r[0].trim()] = r[1].trim());
        }
      }),
    t
  );
}
function Te(e) {
  let t = '';
  if (ke(e)) t = e;
  else if (fe(e))
    for (let n = 0; n < e.length; n++) {
      const r = Te(e[n]);
      r && (t += r + ' ');
    }
  else if (Ie(e)) for (const n in e) e[n] && (t += n + ' ');
  return t.trim();
}
const ec =
    'itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly',
  tc = Ys(ec);
function na(e) {
  return !!e || e === '';
}
const Ee = e =>
    ke(e)
      ? e
      : e == null
        ? ''
        : fe(e) || (Ie(e) && (e.toString === Xo || !ve(e.toString)))
          ? JSON.stringify(e, ra, 2)
          : String(e),
  ra = (e, t) =>
    t && t.__v_isRef
      ? ra(e, t.value)
      : mn(t)
        ? {
            [`Map(${t.size})`]: [...t.entries()].reduce(
              (n, [r, s], i) => ((n[os(r, i) + ' =>'] = s), n),
              {}
            ),
          }
        : Wo(t)
          ? { [`Set(${t.size})`]: [...t.values()].map(n => os(n)) }
          : Gt(t)
            ? os(t)
            : Ie(t) && !fe(t) && !Zo(t)
              ? String(t)
              : t,
  os = (e, t = '') => {
    var n;
    return Gt(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e;
  };
/**
 * @vue/reactivity v3.4.30
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ let tt;
class sa {
  constructor(t = !1) {
    (this.detached = t),
      (this._active = !0),
      (this.effects = []),
      (this.cleanups = []),
      (this.parent = tt),
      !t && tt && (this.index = (tt.scopes || (tt.scopes = [])).push(this) - 1);
  }
  get active() {
    return this._active;
  }
  run(t) {
    if (this._active) {
      const n = tt;
      try {
        return (tt = this), t();
      } finally {
        tt = n;
      }
    }
  }
  on() {
    tt = this;
  }
  off() {
    tt = this.parent;
  }
  stop(t) {
    if (this._active) {
      let n, r;
      for (n = 0, r = this.effects.length; n < r; n++) this.effects[n].stop();
      for (n = 0, r = this.cleanups.length; n < r; n++) this.cleanups[n]();
      if (this.scopes)
        for (n = 0, r = this.scopes.length; n < r; n++) this.scopes[n].stop(!0);
      if (!this.detached && this.parent && !t) {
        const s = this.parent.scopes.pop();
        s &&
          s !== this &&
          ((this.parent.scopes[this.index] = s), (s.index = this.index));
      }
      (this.parent = void 0), (this._active = !1);
    }
  }
}
function nc(e) {
  return new sa(e);
}
function rc(e, t = tt) {
  t && t.active && t.effects.push(e);
}
function ia() {
  return tt;
}
function oa(e) {
  tt && tt.cleanups.push(e);
}
let on;
class ri {
  constructor(t, n, r, s) {
    (this.fn = t),
      (this.trigger = n),
      (this.scheduler = r),
      (this.active = !0),
      (this.deps = []),
      (this._dirtyLevel = 5),
      (this._trackId = 0),
      (this._runnings = 0),
      (this._shouldSchedule = !1),
      (this._depsLength = 0),
      rc(this, s);
  }
  get dirty() {
    if (this._dirtyLevel === 2) return !1;
    if (this._dirtyLevel === 3 || this._dirtyLevel === 4) {
      (this._dirtyLevel = 1), Ht();
      for (let t = 0; t < this._depsLength; t++) {
        const n = this.deps[t];
        if (n.computed) {
          if (n.computed.effect._dirtyLevel === 2) return xt(), !0;
          if ((sc(n.computed), this._dirtyLevel >= 5)) break;
        }
      }
      this._dirtyLevel === 1 && (this._dirtyLevel = 0), xt();
    }
    return this._dirtyLevel >= 5;
  }
  set dirty(t) {
    this._dirtyLevel = t ? 5 : 0;
  }
  run() {
    if (((this._dirtyLevel = 0), !this.active)) return this.fn();
    let t = Vt,
      n = on;
    try {
      return (Vt = !0), (on = this), this._runnings++, Fi(this), this.fn();
    } finally {
      ki(this), this._runnings--, (on = n), (Vt = t);
    }
  }
  stop() {
    this.active &&
      (Fi(this), ki(this), this.onStop && this.onStop(), (this.active = !1));
  }
}
function sc(e) {
  return e.value;
}
function Fi(e) {
  e._trackId++, (e._depsLength = 0);
}
function ki(e) {
  if (e.deps.length > e._depsLength) {
    for (let t = e._depsLength; t < e.deps.length; t++) aa(e.deps[t], e);
    e.deps.length = e._depsLength;
  }
}
function aa(e, t) {
  const n = e.get(t);
  n !== void 0 &&
    t._trackId !== n &&
    (e.delete(t), e.size === 0 && e.cleanup());
}
let Vt = !0,
  ws = 0;
const la = [];
function Ht() {
  la.push(Vt), (Vt = !1);
}
function xt() {
  const e = la.pop();
  Vt = e === void 0 ? !0 : e;
}
function si() {
  ws++;
}
function ii() {
  for (ws--; !ws && Os.length; ) Os.shift()();
}
function ca(e, t, n) {
  if (t.get(e) !== e._trackId) {
    t.set(e, e._trackId);
    const r = e.deps[e._depsLength];
    r !== t ? (r && aa(r, e), (e.deps[e._depsLength++] = t)) : e._depsLength++;
  }
}
const Os = [];
function ua(e, t, n) {
  si();
  for (const r of e.keys()) {
    let s;
    if (
      !e.computed &&
      r.computed &&
      r._runnings > 0 &&
      (s ?? (s = e.get(r) === r._trackId))
    ) {
      r._dirtyLevel = 2;
      continue;
    }
    r._dirtyLevel < t &&
      (s ?? (s = e.get(r) === r._trackId)) &&
      (r._shouldSchedule || (r._shouldSchedule = r._dirtyLevel === 0),
      r.computed && r._dirtyLevel === 2 && (r._shouldSchedule = !0),
      (r._dirtyLevel = t)),
      r._shouldSchedule &&
        (s ?? (s = e.get(r) === r._trackId)) &&
        (r.trigger(),
        (!r._runnings || r.allowRecurse) &&
          r._dirtyLevel !== 3 &&
          ((r._shouldSchedule = !1), r.scheduler && Os.push(r.scheduler)));
  }
  ii();
}
const fa = (e, t) => {
    const n = new Map();
    return (n.cleanup = e), (n.computed = t), n;
  },
  Cr = new WeakMap(),
  an = Symbol(''),
  Ss = Symbol('');
function Ze(e, t, n) {
  if (Vt && on) {
    let r = Cr.get(e);
    r || Cr.set(e, (r = new Map()));
    let s = r.get(n);
    s || r.set(n, (s = fa(() => r.delete(n)))), ca(on, s);
  }
}
function It(e, t, n, r, s, i) {
  const o = Cr.get(e);
  if (!o) return;
  let l = [];
  if (t === 'clear') l = [...o.values()];
  else if (n === 'length' && fe(e)) {
    const a = Number(r);
    o.forEach((c, u) => {
      (u === 'length' || (!Gt(u) && u >= a)) && l.push(c);
    });
  } else
    switch ((n !== void 0 && l.push(o.get(n)), t)) {
      case 'add':
        fe(e)
          ? ni(n) && l.push(o.get('length'))
          : (l.push(o.get(an)), mn(e) && l.push(o.get(Ss)));
        break;
      case 'delete':
        fe(e) || (l.push(o.get(an)), mn(e) && l.push(o.get(Ss)));
        break;
      case 'set':
        mn(e) && l.push(o.get(an));
        break;
    }
  si();
  for (const a of l) a && ua(a, 5);
  ii();
}
function ic(e, t) {
  const n = Cr.get(e);
  return n && n.get(t);
}
const oc = Ys('__proto__,__v_isRef,__isVue'),
  da = new Set(
    Object.getOwnPropertyNames(Symbol)
      .filter(e => e !== 'arguments' && e !== 'caller')
      .map(e => Symbol[e])
      .filter(Gt)
  ),
  Di = ac();
function ac() {
  const e = {};
  return (
    ['includes', 'indexOf', 'lastIndexOf'].forEach(t => {
      e[t] = function (...n) {
        const r = Ce(this);
        for (let i = 0, o = this.length; i < o; i++) Ze(r, 'get', i + '');
        const s = r[t](...n);
        return s === -1 || s === !1 ? r[t](...n.map(Ce)) : s;
      };
    }),
    ['push', 'pop', 'shift', 'unshift', 'splice'].forEach(t => {
      e[t] = function (...n) {
        Ht(), si();
        const r = Ce(this)[t].apply(this, n);
        return ii(), xt(), r;
      };
    }),
    e
  );
}
function lc(e) {
  Gt(e) || (e = String(e));
  const t = Ce(this);
  return Ze(t, 'has', e), t.hasOwnProperty(e);
}
class ha {
  constructor(t = !1, n = !1) {
    (this._isReadonly = t), (this._isShallow = n);
  }
  get(t, n, r) {
    const s = this._isReadonly,
      i = this._isShallow;
    if (n === '__v_isReactive') return !s;
    if (n === '__v_isReadonly') return s;
    if (n === '__v_isShallow') return i;
    if (n === '__v_raw')
      return r === (s ? (i ? Cc : ma) : i ? ga : va).get(t) ||
        Object.getPrototypeOf(t) === Object.getPrototypeOf(r)
        ? t
        : void 0;
    const o = fe(t);
    if (!s) {
      if (o && be(Di, n)) return Reflect.get(Di, n, r);
      if (n === 'hasOwnProperty') return lc;
    }
    const l = Reflect.get(t, n, r);
    return (Gt(n) ? da.has(n) : oc(n)) || (s || Ze(t, 'get', n), i)
      ? l
      : Qe(l)
        ? o && ni(n)
          ? l
          : l.value
        : Ie(l)
          ? s
            ? Vr(l)
            : Kn(l)
          : l;
  }
}
class pa extends ha {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, r, s) {
    let i = t[n];
    if (!this._isShallow) {
      const a = jn(i);
      if (
        (!Er(r) && !jn(r) && ((i = Ce(i)), (r = Ce(r))),
        !fe(t) && Qe(i) && !Qe(r))
      )
        return a ? !1 : ((i.value = r), !0);
    }
    const o = fe(t) && ni(n) ? Number(n) < t.length : be(t, n),
      l = Reflect.set(t, n, r, s);
    return (
      t === Ce(s) && (o ? qt(r, i) && It(t, 'set', n, r) : It(t, 'add', n, r)),
      l
    );
  }
  deleteProperty(t, n) {
    const r = be(t, n);
    t[n];
    const s = Reflect.deleteProperty(t, n);
    return s && r && It(t, 'delete', n, void 0), s;
  }
  has(t, n) {
    const r = Reflect.has(t, n);
    return (!Gt(n) || !da.has(n)) && Ze(t, 'has', n), r;
  }
  ownKeys(t) {
    return Ze(t, 'iterate', fe(t) ? 'length' : an), Reflect.ownKeys(t);
  }
}
class cc extends ha {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, n) {
    return !0;
  }
  deleteProperty(t, n) {
    return !0;
  }
}
const uc = new pa(),
  fc = new cc(),
  dc = new pa(!0);
const oi = e => e,
  Ur = e => Reflect.getPrototypeOf(e);
function er(e, t, n = !1, r = !1) {
  e = e.__v_raw;
  const s = Ce(e),
    i = Ce(t);
  n || (qt(t, i) && Ze(s, 'get', t), Ze(s, 'get', i));
  const { has: o } = Ur(s),
    l = r ? oi : n ? ci : Un;
  if (o.call(s, t)) return l(e.get(t));
  if (o.call(s, i)) return l(e.get(i));
  e !== s && e.get(t);
}
function tr(e, t = !1) {
  const n = this.__v_raw,
    r = Ce(n),
    s = Ce(e);
  return (
    t || (qt(e, s) && Ze(r, 'has', e), Ze(r, 'has', s)),
    e === s ? n.has(e) : n.has(e) || n.has(s)
  );
}
function nr(e, t = !1) {
  return (
    (e = e.__v_raw), !t && Ze(Ce(e), 'iterate', an), Reflect.get(e, 'size', e)
  );
}
function ji(e) {
  e = Ce(e);
  const t = Ce(this);
  return Ur(t).has.call(t, e) || (t.add(e), It(t, 'add', e, e)), this;
}
function Ui(e, t) {
  t = Ce(t);
  const n = Ce(this),
    { has: r, get: s } = Ur(n);
  let i = r.call(n, e);
  i || ((e = Ce(e)), (i = r.call(n, e)));
  const o = s.call(n, e);
  return (
    n.set(e, t), i ? qt(t, o) && It(n, 'set', e, t) : It(n, 'add', e, t), this
  );
}
function Vi(e) {
  const t = Ce(this),
    { has: n, get: r } = Ur(t);
  let s = n.call(t, e);
  s || ((e = Ce(e)), (s = n.call(t, e))), r && r.call(t, e);
  const i = t.delete(e);
  return s && It(t, 'delete', e, void 0), i;
}
function Qi() {
  const e = Ce(this),
    t = e.size !== 0,
    n = e.clear();
  return t && It(e, 'clear', void 0, void 0), n;
}
function rr(e, t) {
  return function (r, s) {
    const i = this,
      o = i.__v_raw,
      l = Ce(o),
      a = t ? oi : e ? ci : Un;
    return (
      !e && Ze(l, 'iterate', an), o.forEach((c, u) => r.call(s, a(c), a(u), i))
    );
  };
}
function sr(e, t, n) {
  return function (...r) {
    const s = this.__v_raw,
      i = Ce(s),
      o = mn(i),
      l = e === 'entries' || (e === Symbol.iterator && o),
      a = e === 'keys' && o,
      c = s[e](...r),
      u = n ? oi : t ? ci : Un;
    return (
      !t && Ze(i, 'iterate', a ? Ss : an),
      {
        next() {
          const { value: d, done: h } = c.next();
          return h
            ? { value: d, done: h }
            : { value: l ? [u(d[0]), u(d[1])] : u(d), done: h };
        },
        [Symbol.iterator]() {
          return this;
        },
      }
    );
  };
}
function Lt(e) {
  return function (...t) {
    return e === 'delete' ? !1 : e === 'clear' ? void 0 : this;
  };
}
function hc() {
  const e = {
      get(i) {
        return er(this, i);
      },
      get size() {
        return nr(this);
      },
      has: tr,
      add: ji,
      set: Ui,
      delete: Vi,
      clear: Qi,
      forEach: rr(!1, !1),
    },
    t = {
      get(i) {
        return er(this, i, !1, !0);
      },
      get size() {
        return nr(this);
      },
      has: tr,
      add: ji,
      set: Ui,
      delete: Vi,
      clear: Qi,
      forEach: rr(!1, !0),
    },
    n = {
      get(i) {
        return er(this, i, !0);
      },
      get size() {
        return nr(this, !0);
      },
      has(i) {
        return tr.call(this, i, !0);
      },
      add: Lt('add'),
      set: Lt('set'),
      delete: Lt('delete'),
      clear: Lt('clear'),
      forEach: rr(!0, !1),
    },
    r = {
      get(i) {
        return er(this, i, !0, !0);
      },
      get size() {
        return nr(this, !0);
      },
      has(i) {
        return tr.call(this, i, !0);
      },
      add: Lt('add'),
      set: Lt('set'),
      delete: Lt('delete'),
      clear: Lt('clear'),
      forEach: rr(!0, !0),
    };
  return (
    ['keys', 'values', 'entries', Symbol.iterator].forEach(i => {
      (e[i] = sr(i, !1, !1)),
        (n[i] = sr(i, !0, !1)),
        (t[i] = sr(i, !1, !0)),
        (r[i] = sr(i, !0, !0));
    }),
    [e, n, t, r]
  );
}
const [pc, vc, gc, mc] = hc();
function ai(e, t) {
  const n = t ? (e ? mc : gc) : e ? vc : pc;
  return (r, s, i) =>
    s === '__v_isReactive'
      ? !e
      : s === '__v_isReadonly'
        ? e
        : s === '__v_raw'
          ? r
          : Reflect.get(be(n, s) && s in r ? n : r, s, i);
}
const yc = { get: ai(!1, !1) },
  _c = { get: ai(!1, !0) },
  bc = { get: ai(!0, !1) };
const va = new WeakMap(),
  ga = new WeakMap(),
  ma = new WeakMap(),
  Cc = new WeakMap();
function Ec(e) {
  switch (e) {
    case 'Object':
    case 'Array':
      return 1;
    case 'Map':
    case 'Set':
    case 'WeakMap':
    case 'WeakSet':
      return 2;
    default:
      return 0;
  }
}
function wc(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Ec(Gl(e));
}
function Kn(e) {
  return jn(e) ? e : li(e, !1, uc, yc, va);
}
function Oc(e) {
  return li(e, !1, dc, _c, ga);
}
function Vr(e) {
  return li(e, !0, fc, bc, ma);
}
function li(e, t, n, r, s) {
  if (!Ie(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
  const i = s.get(e);
  if (i) return i;
  const o = wc(e);
  if (o === 0) return e;
  const l = new Proxy(e, o === 2 ? r : n);
  return s.set(e, l), l;
}
function Tn(e) {
  return jn(e) ? Tn(e.__v_raw) : !!(e && e.__v_isReactive);
}
function jn(e) {
  return !!(e && e.__v_isReadonly);
}
function Er(e) {
  return !!(e && e.__v_isShallow);
}
function ya(e) {
  return e ? !!e.__v_raw : !1;
}
function Ce(e) {
  const t = e && e.__v_raw;
  return t ? Ce(t) : e;
}
function Sc(e) {
  return Object.isExtensible(e) && ea(e, '__v_skip', !0), e;
}
const Un = e => (Ie(e) ? Kn(e) : e),
  ci = e => (Ie(e) ? Vr(e) : e);
class _a {
  constructor(t, n, r, s) {
    (this.getter = t),
      (this._setter = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this.__v_isReadonly = !1),
      (this.effect = new ri(
        () => t(this._value),
        () => Mn(this, this.effect._dirtyLevel === 3 ? 3 : 4)
      )),
      (this.effect.computed = this),
      (this.effect.active = this._cacheable = !s),
      (this.__v_isReadonly = r);
  }
  get value() {
    const t = Ce(this),
      n = t.effect._dirtyLevel;
    return (
      (!t._cacheable || t.effect.dirty) &&
        qt(t._value, (t._value = t.effect.run())) &&
        n !== 3 &&
        Mn(t, 5),
      ui(t),
      t.effect._dirtyLevel >= 2 && Mn(t, 3),
      t._value
    );
  }
  set value(t) {
    this._setter(t);
  }
  get _dirty() {
    return this.effect.dirty;
  }
  set _dirty(t) {
    this.effect.dirty = t;
  }
}
function Ic(e, t, n = !1) {
  let r, s;
  const i = ve(e);
  return (
    i ? ((r = e), (s = at)) : ((r = e.get), (s = e.set)),
    new _a(r, s, i || !s, n)
  );
}
function ui(e) {
  var t;
  Vt &&
    on &&
    ((e = Ce(e)),
    ca(
      on,
      (t = e.dep) != null
        ? t
        : (e.dep = fa(() => (e.dep = void 0), e instanceof _a ? e : void 0))
    ));
}
function Mn(e, t = 5, n, r) {
  e = Ce(e);
  const s = e.dep;
  s && ua(s, t);
}
function Qe(e) {
  return !!(e && e.__v_isRef === !0);
}
function ye(e) {
  return $c(e, !1);
}
function $c(e, t) {
  return Qe(e) ? e : new xc(e, t);
}
class xc {
  constructor(t, n) {
    (this.__v_isShallow = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this._rawValue = n ? t : Ce(t)),
      (this._value = n ? t : Un(t));
  }
  get value() {
    return ui(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || Er(t) || jn(t);
    (t = n ? t : Ce(t)),
      qt(t, this._rawValue) &&
        (this._rawValue,
        (this._rawValue = t),
        (this._value = n ? t : Un(t)),
        Mn(this, 5));
  }
}
function J(e) {
  return Qe(e) ? e.value : e;
}
const Ac = {
  get: (e, t, n) => J(Reflect.get(e, t, n)),
  set: (e, t, n, r) => {
    const s = e[t];
    return Qe(s) && !Qe(n) ? ((s.value = n), !0) : Reflect.set(e, t, n, r);
  },
};
function ba(e) {
  return Tn(e) ? e : new Proxy(e, Ac);
}
class Pc {
  constructor(t) {
    (this.dep = void 0), (this.__v_isRef = !0);
    const { get: n, set: r } = t(
      () => ui(this),
      () => Mn(this)
    );
    (this._get = n), (this._set = r);
  }
  get value() {
    return this._get();
  }
  set value(t) {
    this._set(t);
  }
}
function Lc(e) {
  return new Pc(e);
}
function Rc(e) {
  const t = fe(e) ? new Array(e.length) : {};
  for (const n in e) t[n] = Ca(e, n);
  return t;
}
class Tc {
  constructor(t, n, r) {
    (this._object = t),
      (this._key = n),
      (this._defaultValue = r),
      (this.__v_isRef = !0);
  }
  get value() {
    const t = this._object[this._key];
    return t === void 0 ? this._defaultValue : t;
  }
  set value(t) {
    this._object[this._key] = t;
  }
  get dep() {
    return ic(Ce(this._object), this._key);
  }
}
class Mc {
  constructor(t) {
    (this._getter = t), (this.__v_isRef = !0), (this.__v_isReadonly = !0);
  }
  get value() {
    return this._getter();
  }
}
function Nc(e, t, n) {
  return Qe(e)
    ? e
    : ve(e)
      ? new Mc(e)
      : Ie(e) && arguments.length > 1
        ? Ca(e, t, n)
        : ye(e);
}
function Ca(e, t, n) {
  const r = e[t];
  return Qe(r) ? r : new Tc(e, t, n);
}
/**
 * @vue/runtime-core v3.4.30
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ function Qt(e, t, n, r) {
  try {
    return r ? e(...r) : e();
  } catch (s) {
    Qr(s, t, n);
  }
}
function lt(e, t, n, r) {
  if (ve(e)) {
    const s = Qt(e, t, n, r);
    return (
      s &&
        Jo(s) &&
        s.catch(i => {
          Qr(i, t, n);
        }),
      s
    );
  }
  if (fe(e)) {
    const s = [];
    for (let i = 0; i < e.length; i++) s.push(lt(e[i], t, n, r));
    return s;
  }
}
function Qr(e, t, n, r = !0) {
  const s = t ? t.vnode : null;
  if (t) {
    let i = t.parent;
    const o = t.proxy,
      l = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; i; ) {
      const c = i.ec;
      if (c) {
        for (let u = 0; u < c.length; u++) if (c[u](e, o, l) === !1) return;
      }
      i = i.parent;
    }
    const a = t.appContext.config.errorHandler;
    if (a) {
      Ht(), Qt(a, null, 10, [e, o, l]), xt();
      return;
    }
  }
  Fc(e, n, s, r);
}
function Fc(e, t, n, r = !0) {
  console.error(e);
}
let Vn = !1,
  Is = !1;
const Be = [];
let bt = 0;
const yn = [];
let Mt = null,
  en = 0;
const Ea = Promise.resolve();
let fi = null;
function wa(e) {
  const t = fi || Ea;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function kc(e) {
  let t = bt + 1,
    n = Be.length;
  for (; t < n; ) {
    const r = (t + n) >>> 1,
      s = Be[r],
      i = Qn(s);
    i < e || (i === e && s.pre) ? (t = r + 1) : (n = r);
  }
  return t;
}
function di(e) {
  (!Be.length || !Be.includes(e, Vn && e.allowRecurse ? bt + 1 : bt)) &&
    (e.id == null ? Be.push(e) : Be.splice(kc(e.id), 0, e), Oa());
}
function Oa() {
  !Vn && !Is && ((Is = !0), (fi = Ea.then(Ia)));
}
function Dc(e) {
  const t = Be.indexOf(e);
  t > bt && Be.splice(t, 1);
}
function jc(e) {
  fe(e)
    ? yn.push(...e)
    : (!Mt || !Mt.includes(e, e.allowRecurse ? en + 1 : en)) && yn.push(e),
    Oa();
}
function qi(e, t, n = Vn ? bt + 1 : 0) {
  for (; n < Be.length; n++) {
    const r = Be[n];
    if (r && r.pre) {
      if (e && r.id !== e.uid) continue;
      Be.splice(n, 1), n--, r();
    }
  }
}
function Sa(e) {
  if (yn.length) {
    const t = [...new Set(yn)].sort((n, r) => Qn(n) - Qn(r));
    if (((yn.length = 0), Mt)) {
      Mt.push(...t);
      return;
    }
    for (Mt = t, en = 0; en < Mt.length; en++) {
      const n = Mt[en];
      n.active !== !1 && n();
    }
    (Mt = null), (en = 0);
  }
}
const Qn = e => (e.id == null ? 1 / 0 : e.id),
  Uc = (e, t) => {
    const n = Qn(e) - Qn(t);
    if (n === 0) {
      if (e.pre && !t.pre) return -1;
      if (t.pre && !e.pre) return 1;
    }
    return n;
  };
function Ia(e) {
  (Is = !1), (Vn = !0), Be.sort(Uc);
  try {
    for (bt = 0; bt < Be.length; bt++) {
      const t = Be[bt];
      t && t.active !== !1 && Qt(t, null, 14);
    }
  } finally {
    (bt = 0),
      (Be.length = 0),
      Sa(),
      (Vn = !1),
      (fi = null),
      (Be.length || yn.length) && Ia();
  }
}
function Vc(e, t, ...n) {
  if (e.isUnmounted) return;
  const r = e.vnode.props || xe;
  let s = n;
  const i = t.startsWith('update:'),
    o = i && t.slice(7);
  if (o && o in r) {
    const u = `${o === 'modelValue' ? 'model' : o}Modifiers`,
      { number: d, trim: h } = r[u] || xe;
    h && (s = n.map(v => (ke(v) ? v.trim() : v))), d && (s = n.map(Bl));
  }
  let l,
    a = r[(l = ss(t))] || r[(l = ss(bn(t)))];
  !a && i && (a = r[(l = ss(ln(t)))]), a && lt(a, e, 6, s);
  const c = r[l + 'Once'];
  if (c) {
    if (!e.emitted) e.emitted = {};
    else if (e.emitted[l]) return;
    (e.emitted[l] = !0), lt(c, e, 6, s);
  }
}
function $a(e, t, n = !1) {
  const r = t.emitsCache,
    s = r.get(e);
  if (s !== void 0) return s;
  const i = e.emits;
  let o = {},
    l = !1;
  if (!ve(e)) {
    const a = c => {
      const u = $a(c, t, !0);
      u && ((l = !0), Fe(o, u));
    };
    !n && t.mixins.length && t.mixins.forEach(a),
      e.extends && a(e.extends),
      e.mixins && e.mixins.forEach(a);
  }
  return !i && !l
    ? (Ie(e) && r.set(e, null), null)
    : (fe(i) ? i.forEach(a => (o[a] = null)) : Fe(o, i),
      Ie(e) && r.set(e, o),
      o);
}
function qr(e, t) {
  return !e || !kr(t)
    ? !1
    : ((t = t.slice(2).replace(/Once$/, '')),
      be(e, t[0].toLowerCase() + t.slice(1)) || be(e, ln(t)) || be(e, t));
}
let ft = null,
  zr = null;
function wr(e) {
  const t = ft;
  return (ft = e), (zr = (e && e.type.__scopeId) || null), t;
}
function Bn(e) {
  zr = e;
}
function Wn() {
  zr = null;
}
function Or(e, t = ft, n) {
  if (!t || e._n) return e;
  const r = (...s) => {
    r._d && to(-1);
    const i = wr(t);
    let o;
    try {
      o = e(...s);
    } finally {
      wr(i), r._d && to(1);
    }
    return o;
  };
  return (r._n = !0), (r._c = !0), (r._d = !0), r;
}
function as(e) {
  const {
      type: t,
      vnode: n,
      proxy: r,
      withProxy: s,
      propsOptions: [i],
      slots: o,
      attrs: l,
      emit: a,
      render: c,
      renderCache: u,
      props: d,
      data: h,
      setupState: v,
      ctx: g,
      inheritAttrs: I,
    } = e,
    W = wr(e);
  let F, q;
  try {
    if (n.shapeFlag & 4) {
      const oe = s || r,
        K = oe;
      (F = _t(c.call(K, oe, u, d, v, h, g))), (q = l);
    } else {
      const oe = t;
      (F = _t(
        oe.length > 1 ? oe(d, { attrs: l, slots: o, emit: a }) : oe(d, null)
      )),
        (q = t.props ? l : Qc(l));
    }
  } catch (oe) {
    (kn.length = 0), Qr(oe, e, 1), (F = _e(rt));
  }
  let k = F;
  if (q && I !== !1) {
    const oe = Object.keys(q),
      { shapeFlag: K } = k;
    oe.length &&
      K & 7 &&
      (i && oe.some(ei) && (q = qc(q, i)), (k = zt(k, q, !1, !0)));
  }
  return (
    n.dirs &&
      ((k = zt(k, null, !1, !0)),
      (k.dirs = k.dirs ? k.dirs.concat(n.dirs) : n.dirs)),
    n.transition && (k.transition = n.transition),
    (F = k),
    wr(W),
    F
  );
}
const Qc = e => {
    let t;
    for (const n in e)
      (n === 'class' || n === 'style' || kr(n)) && ((t || (t = {}))[n] = e[n]);
    return t;
  },
  qc = (e, t) => {
    const n = {};
    for (const r in e) (!ei(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
    return n;
  };
function zc(e, t, n) {
  const { props: r, children: s, component: i } = e,
    { props: o, children: l, patchFlag: a } = t,
    c = i.emitsOptions;
  if (t.dirs || t.transition) return !0;
  if (n && a >= 0) {
    if (a & 1024) return !0;
    if (a & 16) return r ? zi(r, o, c) : !!o;
    if (a & 8) {
      const u = t.dynamicProps;
      for (let d = 0; d < u.length; d++) {
        const h = u[d];
        if (o[h] !== r[h] && !qr(c, h)) return !0;
      }
    }
  } else
    return (s || l) && (!l || !l.$stable)
      ? !0
      : r === o
        ? !1
        : r
          ? o
            ? zi(r, o, c)
            : !0
          : !!o;
  return !1;
}
function zi(e, t, n) {
  const r = Object.keys(t);
  if (r.length !== Object.keys(e).length) return !0;
  for (let s = 0; s < r.length; s++) {
    const i = r[s];
    if (t[i] !== e[i] && !qr(n, i)) return !0;
  }
  return !1;
}
function Gc({ vnode: e, parent: t }, n) {
  for (; t; ) {
    const r = t.subTree;
    if ((r.suspense && r.suspense.activeBranch === e && (r.el = e.el), r === e))
      ((e = t.vnode).el = n), (t = t.parent);
    else break;
  }
}
const Hc = Symbol.for('v-ndc'),
  Kc = e => e.__isSuspense;
function Bc(e, t) {
  t && t.pendingBranch
    ? fe(e)
      ? t.effects.push(...e)
      : t.effects.push(e)
    : jc(e);
}
function Gr(e, t, n = We, r = !1) {
  if (n) {
    const s = n[e] || (n[e] = []),
      i =
        t.__weh ||
        (t.__weh = (...o) => {
          Ht();
          const l = Jn(n),
            a = lt(t, n, e, o);
          return l(), xt(), a;
        });
    return r ? s.unshift(i) : s.push(i), i;
  }
}
const Pt =
    e =>
    (t, n = We) => {
      (!Wr || e === 'sp') && Gr(e, (...r) => t(...r), n);
    },
  Wc = Pt('bm'),
  wn = Pt('m'),
  Jc = Pt('bu'),
  Xc = Pt('u'),
  hi = Pt('bum'),
  xa = Pt('um'),
  Zc = Pt('sp'),
  Yc = Pt('rtg'),
  eu = Pt('rtc');
function tu(e, t = We) {
  Gr('ec', e, t);
}
function Jt(e, t, n, r) {
  const s = e.dirs,
    i = t && t.dirs;
  for (let o = 0; o < s.length; o++) {
    const l = s[o];
    i && (l.oldValue = i[o].value);
    let a = l.dir[r];
    a && (Ht(), lt(a, n, 8, [e.el, l, e, t]), xt());
  }
}
function Cn(e, t, n, r) {
  let s;
  const i = n;
  if (fe(e) || ke(e)) {
    s = new Array(e.length);
    for (let o = 0, l = e.length; o < l; o++) s[o] = t(e[o], o, void 0, i);
  } else if (typeof e == 'number') {
    s = new Array(e);
    for (let o = 0; o < e; o++) s[o] = t(o + 1, o, void 0, i);
  } else if (Ie(e))
    if (e[Symbol.iterator]) s = Array.from(e, (o, l) => t(o, l, void 0, i));
    else {
      const o = Object.keys(e);
      s = new Array(o.length);
      for (let l = 0, a = o.length; l < a; l++) {
        const c = o[l];
        s[l] = t(e[c], c, l, i);
      }
    }
  else s = [];
  return s;
}
/*! #__NO_SIDE_EFFECTS__ */ function De(e, t) {
  return ve(e) ? Fe({ name: e.name }, t, { setup: e }) : e;
}
const pr = e => !!e.type.__asyncLoader,
  $s = e => (e ? (Wa(e) ? yi(e) : $s(e.parent)) : null),
  Nn = Fe(Object.create(null), {
    $: e => e,
    $el: e => e.vnode.el,
    $data: e => e.data,
    $props: e => e.props,
    $attrs: e => e.attrs,
    $slots: e => e.slots,
    $refs: e => e.refs,
    $parent: e => $s(e.parent),
    $root: e => $s(e.root),
    $emit: e => e.emit,
    $options: e => pi(e),
    $forceUpdate: e =>
      e.f ||
      (e.f = () => {
        (e.effect.dirty = !0), di(e.update);
      }),
    $nextTick: e => e.n || (e.n = wa.bind(e.proxy)),
    $watch: e => wu.bind(e),
  }),
  ls = (e, t) => e !== xe && !e.__isScriptSetup && be(e, t),
  nu = {
    get({ _: e }, t) {
      if (t === '__v_skip') return !0;
      const {
        ctx: n,
        setupState: r,
        data: s,
        props: i,
        accessCache: o,
        type: l,
        appContext: a,
      } = e;
      let c;
      if (t[0] !== '$') {
        const v = o[t];
        if (v !== void 0)
          switch (v) {
            case 1:
              return r[t];
            case 2:
              return s[t];
            case 4:
              return n[t];
            case 3:
              return i[t];
          }
        else {
          if (ls(r, t)) return (o[t] = 1), r[t];
          if (s !== xe && be(s, t)) return (o[t] = 2), s[t];
          if ((c = e.propsOptions[0]) && be(c, t)) return (o[t] = 3), i[t];
          if (n !== xe && be(n, t)) return (o[t] = 4), n[t];
          xs && (o[t] = 0);
        }
      }
      const u = Nn[t];
      let d, h;
      if (u) return t === '$attrs' && Ze(e.attrs, 'get', ''), u(e);
      if ((d = l.__cssModules) && (d = d[t])) return d;
      if (n !== xe && be(n, t)) return (o[t] = 4), n[t];
      if (((h = a.config.globalProperties), be(h, t))) return h[t];
    },
    set({ _: e }, t, n) {
      const { data: r, setupState: s, ctx: i } = e;
      return ls(s, t)
        ? ((s[t] = n), !0)
        : r !== xe && be(r, t)
          ? ((r[t] = n), !0)
          : be(e.props, t) || (t[0] === '$' && t.slice(1) in e)
            ? !1
            : ((i[t] = n), !0);
    },
    has(
      {
        _: {
          data: e,
          setupState: t,
          accessCache: n,
          ctx: r,
          appContext: s,
          propsOptions: i,
        },
      },
      o
    ) {
      let l;
      return (
        !!n[o] ||
        (e !== xe && be(e, o)) ||
        ls(t, o) ||
        ((l = i[0]) && be(l, o)) ||
        be(r, o) ||
        be(Nn, o) ||
        be(s.config.globalProperties, o)
      );
    },
    defineProperty(e, t, n) {
      return (
        n.get != null
          ? (e._.accessCache[t] = 0)
          : be(n, 'value') && this.set(e, t, n.value, null),
        Reflect.defineProperty(e, t, n)
      );
    },
  };
function Gi(e) {
  return fe(e) ? e.reduce((t, n) => ((t[n] = null), t), {}) : e;
}
let xs = !0;
function ru(e) {
  const t = pi(e),
    n = e.proxy,
    r = e.ctx;
  (xs = !1), t.beforeCreate && Hi(t.beforeCreate, e, 'bc');
  const {
    data: s,
    computed: i,
    methods: o,
    watch: l,
    provide: a,
    inject: c,
    created: u,
    beforeMount: d,
    mounted: h,
    beforeUpdate: v,
    updated: g,
    activated: I,
    deactivated: W,
    beforeDestroy: F,
    beforeUnmount: q,
    destroyed: k,
    unmounted: oe,
    render: K,
    renderTracked: A,
    renderTriggered: Y,
    errorCaptured: Q,
    serverPrefetch: B,
    expose: G,
    inheritAttrs: ue,
    components: z,
    directives: P,
    filters: S,
  } = t;
  if ((c && su(c, r, null), o))
    for (const _ in o) {
      const y = o[_];
      ve(y) && (r[_] = y.bind(n));
    }
  if (s) {
    const _ = s.call(n, n);
    Ie(_) && (e.data = Kn(_));
  }
  if (((xs = !0), i))
    for (const _ in i) {
      const y = i[_],
        M = ve(y) ? y.bind(n, n) : ve(y.get) ? y.get.bind(n, n) : at,
        te = !ve(y) && ve(y.set) ? y.set.bind(n) : at,
        re = ee({ get: M, set: te });
      Object.defineProperty(r, _, {
        enumerable: !0,
        configurable: !0,
        get: () => re.value,
        set: he => (re.value = he),
      });
    }
  if (l) for (const _ in l) Aa(l[_], r, n, _);
  if (a) {
    const _ = ve(a) ? a.call(n) : a;
    Reflect.ownKeys(_).forEach(y => {
      uu(y, _[y]);
    });
  }
  u && Hi(u, e, 'c');
  function N(_, y) {
    fe(y) ? y.forEach(M => _(M.bind(n))) : y && _(y.bind(n));
  }
  if (
    (N(Wc, d),
    N(wn, h),
    N(Jc, v),
    N(Xc, g),
    N(Ou, I),
    N(Su, W),
    N(tu, Q),
    N(eu, A),
    N(Yc, Y),
    N(hi, q),
    N(xa, oe),
    N(Zc, B),
    fe(G))
  )
    if (G.length) {
      const _ = e.exposed || (e.exposed = {});
      G.forEach(y => {
        Object.defineProperty(_, y, { get: () => n[y], set: M => (n[y] = M) });
      });
    } else e.exposed || (e.exposed = {});
  K && e.render === at && (e.render = K),
    ue != null && (e.inheritAttrs = ue),
    z && (e.components = z),
    P && (e.directives = P);
}
function su(e, t, n = at) {
  fe(e) && (e = As(e));
  for (const r in e) {
    const s = e[r];
    let i;
    Ie(s)
      ? 'default' in s
        ? (i = $t(s.from || r, s.default, !0))
        : (i = $t(s.from || r))
      : (i = $t(s)),
      Qe(i)
        ? Object.defineProperty(t, r, {
            enumerable: !0,
            configurable: !0,
            get: () => i.value,
            set: o => (i.value = o),
          })
        : (t[r] = i);
  }
}
function Hi(e, t, n) {
  lt(fe(e) ? e.map(r => r.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function Aa(e, t, n, r) {
  const s = r.includes('.') ? Va(n, r) : () => n[r];
  if (ke(e)) {
    const i = t[e];
    ve(i) && Ne(s, i);
  } else if (ve(e)) Ne(s, e.bind(n));
  else if (Ie(e))
    if (fe(e)) e.forEach(i => Aa(i, t, n, r));
    else {
      const i = ve(e.handler) ? e.handler.bind(n) : t[e.handler];
      ve(i) && Ne(s, i, e);
    }
}
function pi(e) {
  const t = e.type,
    { mixins: n, extends: r } = t,
    {
      mixins: s,
      optionsCache: i,
      config: { optionMergeStrategies: o },
    } = e.appContext,
    l = i.get(t);
  let a;
  return (
    l
      ? (a = l)
      : !s.length && !n && !r
        ? (a = t)
        : ((a = {}), s.length && s.forEach(c => Sr(a, c, o, !0)), Sr(a, t, o)),
    Ie(t) && i.set(t, a),
    a
  );
}
function Sr(e, t, n, r = !1) {
  const { mixins: s, extends: i } = t;
  i && Sr(e, i, n, !0), s && s.forEach(o => Sr(e, o, n, !0));
  for (const o in t)
    if (!(r && o === 'expose')) {
      const l = iu[o] || (n && n[o]);
      e[o] = l ? l(e[o], t[o]) : t[o];
    }
  return e;
}
const iu = {
  data: Ki,
  props: Bi,
  emits: Bi,
  methods: xn,
  computed: xn,
  beforeCreate: Je,
  created: Je,
  beforeMount: Je,
  mounted: Je,
  beforeUpdate: Je,
  updated: Je,
  beforeDestroy: Je,
  beforeUnmount: Je,
  destroyed: Je,
  unmounted: Je,
  activated: Je,
  deactivated: Je,
  errorCaptured: Je,
  serverPrefetch: Je,
  components: xn,
  directives: xn,
  watch: au,
  provide: Ki,
  inject: ou,
};
function Ki(e, t) {
  return t
    ? e
      ? function () {
          return Fe(
            ve(e) ? e.call(this, this) : e,
            ve(t) ? t.call(this, this) : t
          );
        }
      : t
    : e;
}
function ou(e, t) {
  return xn(As(e), As(t));
}
function As(e) {
  if (fe(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
    return t;
  }
  return e;
}
function Je(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function xn(e, t) {
  return e ? Fe(Object.create(null), e, t) : t;
}
function Bi(e, t) {
  return e
    ? fe(e) && fe(t)
      ? [...new Set([...e, ...t])]
      : Fe(Object.create(null), Gi(e), Gi(t ?? {}))
    : t;
}
function au(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = Fe(Object.create(null), e);
  for (const r in t) n[r] = Je(e[r], t[r]);
  return n;
}
function Pa() {
  return {
    app: null,
    config: {
      isNativeTag: ql,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {},
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap(),
  };
}
let lu = 0;
function cu(e, t) {
  return function (r, s = null) {
    ve(r) || (r = Fe({}, r)), s != null && !Ie(s) && (s = null);
    const i = Pa(),
      o = new WeakSet();
    let l = !1;
    const a = (i.app = {
      _uid: lu++,
      _component: r,
      _props: s,
      _container: null,
      _context: i,
      _instance: null,
      version: zu,
      get config() {
        return i.config;
      },
      set config(c) {},
      use(c, ...u) {
        return (
          o.has(c) ||
            (c && ve(c.install)
              ? (o.add(c), c.install(a, ...u))
              : ve(c) && (o.add(c), c(a, ...u))),
          a
        );
      },
      mixin(c) {
        return i.mixins.includes(c) || i.mixins.push(c), a;
      },
      component(c, u) {
        return u ? ((i.components[c] = u), a) : i.components[c];
      },
      directive(c, u) {
        return u ? ((i.directives[c] = u), a) : i.directives[c];
      },
      mount(c, u, d) {
        if (!l) {
          const h = _e(r, s);
          return (
            (h.appContext = i),
            d === !0 ? (d = 'svg') : d === !1 && (d = void 0),
            u && t ? t(h, c) : e(h, c, d),
            (l = !0),
            (a._container = c),
            (c.__vue_app__ = a),
            yi(h.component)
          );
        }
      },
      unmount() {
        l && (e(null, a._container), delete a._container.__vue_app__);
      },
      provide(c, u) {
        return (i.provides[c] = u), a;
      },
      runWithContext(c) {
        const u = Fn;
        Fn = a;
        try {
          return c();
        } finally {
          Fn = u;
        }
      },
    });
    return a;
  };
}
let Fn = null;
function uu(e, t) {
  if (We) {
    let n = We.provides;
    const r = We.parent && We.parent.provides;
    r === n && (n = We.provides = Object.create(r)), (n[e] = t);
  }
}
function $t(e, t, n = !1) {
  const r = We || ft;
  if (r || Fn) {
    const s = r
      ? r.parent == null
        ? r.vnode.appContext && r.vnode.appContext.provides
        : r.parent.provides
      : Fn._context.provides;
    if (s && e in s) return s[e];
    if (arguments.length > 1) return n && ve(t) ? t.call(r && r.proxy) : t;
  }
}
const La = {},
  Ra = () => Object.create(La),
  Ta = e => Object.getPrototypeOf(e) === La;
function fu(e, t, n, r = !1) {
  const s = {},
    i = Ra();
  (e.propsDefaults = Object.create(null)), Ma(e, t, s, i);
  for (const o in e.propsOptions[0]) o in s || (s[o] = void 0);
  n ? (e.props = r ? s : Oc(s)) : e.type.props ? (e.props = s) : (e.props = i),
    (e.attrs = i);
}
function du(e, t, n, r) {
  const {
      props: s,
      attrs: i,
      vnode: { patchFlag: o },
    } = e,
    l = Ce(s),
    [a] = e.propsOptions;
  let c = !1;
  if ((r || o > 0) && !(o & 16)) {
    if (o & 8) {
      const u = e.vnode.dynamicProps;
      for (let d = 0; d < u.length; d++) {
        let h = u[d];
        if (qr(e.emitsOptions, h)) continue;
        const v = t[h];
        if (a)
          if (be(i, h)) v !== i[h] && ((i[h] = v), (c = !0));
          else {
            const g = bn(h);
            s[g] = Ps(a, l, g, v, e, !1);
          }
        else v !== i[h] && ((i[h] = v), (c = !0));
      }
    }
  } else {
    Ma(e, t, s, i) && (c = !0);
    let u;
    for (const d in l)
      (!t || (!be(t, d) && ((u = ln(d)) === d || !be(t, u)))) &&
        (a
          ? n &&
            (n[d] !== void 0 || n[u] !== void 0) &&
            (s[d] = Ps(a, l, d, void 0, e, !0))
          : delete s[d]);
    if (i !== l)
      for (const d in i) (!t || !be(t, d)) && (delete i[d], (c = !0));
  }
  c && It(e.attrs, 'set', '');
}
function Ma(e, t, n, r) {
  const [s, i] = e.propsOptions;
  let o = !1,
    l;
  if (t)
    for (let a in t) {
      if (Rn(a)) continue;
      const c = t[a];
      let u;
      s && be(s, (u = bn(a)))
        ? !i || !i.includes(u)
          ? (n[u] = c)
          : ((l || (l = {}))[u] = c)
        : qr(e.emitsOptions, a) ||
          ((!(a in r) || c !== r[a]) && ((r[a] = c), (o = !0)));
    }
  if (i) {
    const a = Ce(n),
      c = l || xe;
    for (let u = 0; u < i.length; u++) {
      const d = i[u];
      n[d] = Ps(s, a, d, c[d], e, !be(c, d));
    }
  }
  return o;
}
function Ps(e, t, n, r, s, i) {
  const o = e[n];
  if (o != null) {
    const l = be(o, 'default');
    if (l && r === void 0) {
      const a = o.default;
      if (o.type !== Function && !o.skipFactory && ve(a)) {
        const { propsDefaults: c } = s;
        if (n in c) r = c[n];
        else {
          const u = Jn(s);
          (r = c[n] = a.call(null, t)), u();
        }
      } else r = a;
    }
    o[0] &&
      (i && !l ? (r = !1) : o[1] && (r === '' || r === ln(n)) && (r = !0));
  }
  return r;
}
function Na(e, t, n = !1) {
  const r = t.propsCache,
    s = r.get(e);
  if (s) return s;
  const i = e.props,
    o = {},
    l = [];
  let a = !1;
  if (!ve(e)) {
    const u = d => {
      a = !0;
      const [h, v] = Na(d, t, !0);
      Fe(o, h), v && l.push(...v);
    };
    !n && t.mixins.length && t.mixins.forEach(u),
      e.extends && u(e.extends),
      e.mixins && e.mixins.forEach(u);
  }
  if (!i && !a) return Ie(e) && r.set(e, gn), gn;
  if (fe(i))
    for (let u = 0; u < i.length; u++) {
      const d = bn(i[u]);
      Wi(d) && (o[d] = xe);
    }
  else if (i)
    for (const u in i) {
      const d = bn(u);
      if (Wi(d)) {
        const h = i[u],
          v = (o[d] = fe(h) || ve(h) ? { type: h } : Fe({}, h));
        if (v) {
          const g = Zi(Boolean, v.type),
            I = Zi(String, v.type);
          (v[0] = g > -1),
            (v[1] = I < 0 || g < I),
            (g > -1 || be(v, 'default')) && l.push(d);
        }
      }
    }
  const c = [o, l];
  return Ie(e) && r.set(e, c), c;
}
function Wi(e) {
  return e[0] !== '$' && !Rn(e);
}
function Ji(e) {
  return e === null
    ? 'null'
    : typeof e == 'function'
      ? e.name || ''
      : (typeof e == 'object' && e.constructor && e.constructor.name) || '';
}
function Xi(e, t) {
  return Ji(e) === Ji(t);
}
function Zi(e, t) {
  return fe(t) ? t.findIndex(n => Xi(n, e)) : ve(t) && Xi(t, e) ? 0 : -1;
}
const Fa = e => e[0] === '_' || e === '$stable',
  vi = e => (fe(e) ? e.map(_t) : [_t(e)]),
  hu = (e, t, n) => {
    if (t._n) return t;
    const r = Or((...s) => vi(t(...s)), n);
    return (r._c = !1), r;
  },
  ka = (e, t, n) => {
    const r = e._ctx;
    for (const s in e) {
      if (Fa(s)) continue;
      const i = e[s];
      if (ve(i)) t[s] = hu(s, i, r);
      else if (i != null) {
        const o = vi(i);
        t[s] = () => o;
      }
    }
  },
  Da = (e, t) => {
    const n = vi(t);
    e.slots.default = () => n;
  },
  pu = (e, t) => {
    const n = (e.slots = Ra());
    if (e.vnode.shapeFlag & 32) {
      const r = t._;
      r ? (Fe(n, t), ea(n, '_', r, !0)) : ka(t, n);
    } else t && Da(e, t);
  },
  vu = (e, t, n) => {
    const { vnode: r, slots: s } = e;
    let i = !0,
      o = xe;
    if (r.shapeFlag & 32) {
      const l = t._;
      l
        ? n && l === 1
          ? (i = !1)
          : (Fe(s, t), !n && l === 1 && delete s._)
        : ((i = !t.$stable), ka(t, s)),
        (o = t);
    } else t && (Da(e, t), (o = { default: 1 }));
    if (i) for (const l in s) !Fa(l) && o[l] == null && delete s[l];
  };
function Ls(e, t, n, r, s = !1) {
  if (fe(e)) {
    e.forEach((h, v) => Ls(h, t && (fe(t) ? t[v] : t), n, r, s));
    return;
  }
  if (pr(r) && !s) return;
  const i = r.shapeFlag & 4 ? yi(r.component) : r.el,
    o = s ? null : i,
    { i: l, r: a } = e,
    c = t && t.r,
    u = l.refs === xe ? (l.refs = {}) : l.refs,
    d = l.setupState;
  if (
    (c != null &&
      c !== a &&
      (ke(c)
        ? ((u[c] = null), be(d, c) && (d[c] = null))
        : Qe(c) && (c.value = null)),
    ve(a))
  )
    Qt(a, l, 12, [o, u]);
  else {
    const h = ke(a),
      v = Qe(a);
    if (h || v) {
      const g = () => {
        if (e.f) {
          const I = h ? (be(d, a) ? d[a] : u[a]) : a.value;
          s
            ? fe(I) && ti(I, i)
            : fe(I)
              ? I.includes(i) || I.push(i)
              : h
                ? ((u[a] = [i]), be(d, a) && (d[a] = u[a]))
                : ((a.value = [i]), e.k && (u[e.k] = a.value));
        } else
          h
            ? ((u[a] = o), be(d, a) && (d[a] = o))
            : v && ((a.value = o), e.k && (u[e.k] = o));
      };
      o ? ((g.id = -1), Xe(g, n)) : g();
    }
  }
}
const Xe = Bc;
function gu(e) {
  return mu(e);
}
function mu(e, t) {
  const n = ta();
  n.__VUE__ = !0;
  const {
      insert: r,
      remove: s,
      patchProp: i,
      createElement: o,
      createText: l,
      createComment: a,
      setText: c,
      setElementText: u,
      parentNode: d,
      nextSibling: h,
      setScopeId: v = at,
      insertStaticContent: g,
    } = e,
    I = (
      f,
      p,
      m,
      b = null,
      E = null,
      L = null,
      V = void 0,
      T = null,
      D = !!p.dynamicChildren
    ) => {
      if (f === p) return;
      f && !nn(f, p) && ((b = Bt(f)), he(f, E, L, !0), (f = null)),
        p.patchFlag === -2 && ((D = !1), (p.dynamicChildren = null));
      const { type: O, ref: H, shapeFlag: se } = p;
      switch (O) {
        case Kr:
          W(f, p, m, b);
          break;
        case rt:
          F(f, p, m, b);
          break;
        case vr:
          f == null && q(p, m, b, V);
          break;
        case Le:
          z(f, p, m, b, E, L, V, T, D);
          break;
        default:
          se & 1
            ? K(f, p, m, b, E, L, V, T, D)
            : se & 6
              ? P(f, p, m, b, E, L, V, T, D)
              : (se & 64 || se & 128) &&
                O.process(f, p, m, b, E, L, V, T, D, x);
      }
      H != null && E && Ls(H, f && f.ref, L, p || f, !p);
    },
    W = (f, p, m, b) => {
      if (f == null) r((p.el = l(p.children)), m, b);
      else {
        const E = (p.el = f.el);
        p.children !== f.children && c(E, p.children);
      }
    },
    F = (f, p, m, b) => {
      f == null ? r((p.el = a(p.children || '')), m, b) : (p.el = f.el);
    },
    q = (f, p, m, b) => {
      [f.el, f.anchor] = g(f.children, p, m, b, f.el, f.anchor);
    },
    k = ({ el: f, anchor: p }, m, b) => {
      let E;
      for (; f && f !== p; ) (E = h(f)), r(f, m, b), (f = E);
      r(p, m, b);
    },
    oe = ({ el: f, anchor: p }) => {
      let m;
      for (; f && f !== p; ) (m = h(f)), s(f), (f = m);
      s(p);
    },
    K = (f, p, m, b, E, L, V, T, D) => {
      p.type === 'svg' ? (V = 'svg') : p.type === 'math' && (V = 'mathml'),
        f == null ? A(p, m, b, E, L, V, T, D) : B(f, p, E, L, V, T, D);
    },
    A = (f, p, m, b, E, L, V, T) => {
      let D, O;
      const { props: H, shapeFlag: se, transition: ne, dirs: de } = f;
      if (
        ((D = f.el = o(f.type, L, H && H.is, H)),
        se & 8
          ? u(D, f.children)
          : se & 16 && Q(f.children, D, null, b, E, cs(f, L), V, T),
        de && Jt(f, null, b, 'created'),
        Y(D, f, f.scopeId, V, b),
        H)
      ) {
        for (const ce in H)
          ce !== 'value' &&
            !Rn(ce) &&
            i(D, ce, null, H[ce], L, f.children, b, E, ut);
        'value' in H && i(D, 'value', null, H.value, L),
          (O = H.onVnodeBeforeMount) && mt(O, b, f);
      }
      de && Jt(f, null, b, 'beforeMount');
      const ie = yu(E, ne);
      ie && ne.beforeEnter(D),
        r(D, p, m),
        ((O = H && H.onVnodeMounted) || ie || de) &&
          Xe(() => {
            O && mt(O, b, f),
              ie && ne.enter(D),
              de && Jt(f, null, b, 'mounted');
          }, E);
    },
    Y = (f, p, m, b, E) => {
      if ((m && v(f, m), b)) for (let L = 0; L < b.length; L++) v(f, b[L]);
      if (E) {
        let L = E.subTree;
        if (p === L) {
          const V = E.vnode;
          Y(f, V, V.scopeId, V.slotScopeIds, E.parent);
        }
      }
    },
    Q = (f, p, m, b, E, L, V, T, D = 0) => {
      for (let O = D; O < f.length; O++) {
        const H = (f[O] = T ? Ft(f[O]) : _t(f[O]));
        I(null, H, p, m, b, E, L, V, T);
      }
    },
    B = (f, p, m, b, E, L, V) => {
      const T = (p.el = f.el);
      let { patchFlag: D, dynamicChildren: O, dirs: H } = p;
      D |= f.patchFlag & 16;
      const se = f.props || xe,
        ne = p.props || xe;
      let de;
      if (
        (m && Xt(m, !1),
        (de = ne.onVnodeBeforeUpdate) && mt(de, m, p, f),
        H && Jt(p, f, m, 'beforeUpdate'),
        m && Xt(m, !0),
        O
          ? G(f.dynamicChildren, O, T, m, b, cs(p, E), L)
          : V || y(f, p, T, null, m, b, cs(p, E), L, !1),
        D > 0)
      ) {
        if (D & 16) ue(T, p, se, ne, m, b, E);
        else if (
          (D & 2 && se.class !== ne.class && i(T, 'class', null, ne.class, E),
          D & 4 && i(T, 'style', se.style, ne.style, E),
          D & 8)
        ) {
          const ie = p.dynamicProps;
          for (let ce = 0; ce < ie.length; ce++) {
            const ge = ie[ce],
              Oe = se[ge],
              Ve = ne[ge];
            (Ve !== Oe || ge === 'value') &&
              i(T, ge, Oe, Ve, E, f.children, m, b, ut);
          }
        }
        D & 1 && f.children !== p.children && u(T, p.children);
      } else !V && O == null && ue(T, p, se, ne, m, b, E);
      ((de = ne.onVnodeUpdated) || H) &&
        Xe(() => {
          de && mt(de, m, p, f), H && Jt(p, f, m, 'updated');
        }, b);
    },
    G = (f, p, m, b, E, L, V) => {
      for (let T = 0; T < p.length; T++) {
        const D = f[T],
          O = p[T],
          H =
            D.el && (D.type === Le || !nn(D, O) || D.shapeFlag & 70)
              ? d(D.el)
              : m;
        I(D, O, H, null, b, E, L, V, !0);
      }
    },
    ue = (f, p, m, b, E, L, V) => {
      if (m !== b) {
        if (m !== xe)
          for (const T in m)
            !Rn(T) && !(T in b) && i(f, T, m[T], null, V, p.children, E, L, ut);
        for (const T in b) {
          if (Rn(T)) continue;
          const D = b[T],
            O = m[T];
          D !== O && T !== 'value' && i(f, T, O, D, V, p.children, E, L, ut);
        }
        'value' in b && i(f, 'value', m.value, b.value, V);
      }
    },
    z = (f, p, m, b, E, L, V, T, D) => {
      const O = (p.el = f ? f.el : l('')),
        H = (p.anchor = f ? f.anchor : l(''));
      let { patchFlag: se, dynamicChildren: ne, slotScopeIds: de } = p;
      de && (T = T ? T.concat(de) : de),
        f == null
          ? (r(O, m, b), r(H, m, b), Q(p.children || [], m, H, E, L, V, T, D))
          : se > 0 && se & 64 && ne && f.dynamicChildren
            ? (G(f.dynamicChildren, ne, m, E, L, V, T),
              (p.key != null || (E && p === E.subTree)) && ja(f, p, !0))
            : y(f, p, m, H, E, L, V, T, D);
    },
    P = (f, p, m, b, E, L, V, T, D) => {
      (p.slotScopeIds = T),
        f == null
          ? p.shapeFlag & 512
            ? E.ctx.activate(p, m, b, V, D)
            : S(p, m, b, E, L, V, D)
          : R(f, p, D);
    },
    S = (f, p, m, b, E, L, V) => {
      const T = (f.component = Du(f, b, E));
      if ((Hr(f) && (T.ctx.renderer = x), ju(T), T.asyncDep)) {
        if ((E && E.registerDep(T, N, V), !f.el)) {
          const D = (T.subTree = _e(rt));
          F(null, D, p, m);
        }
      } else N(T, f, p, m, E, L, V);
    },
    R = (f, p, m) => {
      const b = (p.component = f.component);
      if (zc(f, p, m))
        if (b.asyncDep && !b.asyncResolved) {
          _(b, p, m);
          return;
        } else (b.next = p), Dc(b.update), (b.effect.dirty = !0), b.update();
      else (p.el = f.el), (b.vnode = p);
    },
    N = (f, p, m, b, E, L, V) => {
      const T = () => {
          if (f.isMounted) {
            let { next: H, bu: se, u: ne, parent: de, vnode: ie } = f;
            {
              const st = Ua(f);
              if (st) {
                H && ((H.el = ie.el), _(f, H, V)),
                  st.asyncDep.then(() => {
                    f.isUnmounted || T();
                  });
                return;
              }
            }
            let ce = H,
              ge;
            Xt(f, !1),
              H ? ((H.el = ie.el), _(f, H, V)) : (H = ie),
              se && is(se),
              (ge = H.props && H.props.onVnodeBeforeUpdate) &&
                mt(ge, de, H, ie),
              Xt(f, !0);
            const Oe = as(f),
              Ve = f.subTree;
            (f.subTree = Oe),
              I(Ve, Oe, d(Ve.el), Bt(Ve), f, E, L),
              (H.el = Oe.el),
              ce === null && Gc(f, Oe.el),
              ne && Xe(ne, E),
              (ge = H.props && H.props.onVnodeUpdated) &&
                Xe(() => mt(ge, de, H, ie), E);
          } else {
            let H;
            const { el: se, props: ne } = p,
              { bm: de, m: ie, parent: ce } = f,
              ge = pr(p);
            if (
              (Xt(f, !1),
              de && is(de),
              !ge && (H = ne && ne.onVnodeBeforeMount) && mt(H, ce, p),
              Xt(f, !0),
              se && X)
            ) {
              const Oe = () => {
                (f.subTree = as(f)), X(se, f.subTree, f, E, null);
              };
              ge
                ? p.type.__asyncLoader().then(() => !f.isUnmounted && Oe())
                : Oe();
            } else {
              const Oe = (f.subTree = as(f));
              I(null, Oe, m, b, f, E, L), (p.el = Oe.el);
            }
            if ((ie && Xe(ie, E), !ge && (H = ne && ne.onVnodeMounted))) {
              const Oe = p;
              Xe(() => mt(H, ce, Oe), E);
            }
            (p.shapeFlag & 256 ||
              (ce && pr(ce.vnode) && ce.vnode.shapeFlag & 256)) &&
              f.a &&
              Xe(f.a, E),
              (f.isMounted = !0),
              (p = m = b = null);
          }
        },
        D = (f.effect = new ri(T, at, () => di(O), f.scope)),
        O = (f.update = () => {
          D.dirty && D.run();
        });
      (O.id = f.uid), Xt(f, !0), O();
    },
    _ = (f, p, m) => {
      p.component = f;
      const b = f.vnode.props;
      (f.vnode = p),
        (f.next = null),
        du(f, p.props, b, m),
        vu(f, p.children, m),
        Ht(),
        qi(f),
        xt();
    },
    y = (f, p, m, b, E, L, V, T, D = !1) => {
      const O = f && f.children,
        H = f ? f.shapeFlag : 0,
        se = p.children,
        { patchFlag: ne, shapeFlag: de } = p;
      if (ne > 0) {
        if (ne & 128) {
          te(O, se, m, b, E, L, V, T, D);
          return;
        } else if (ne & 256) {
          M(O, se, m, b, E, L, V, T, D);
          return;
        }
      }
      de & 8
        ? (H & 16 && ut(O, E, L), se !== O && u(m, se))
        : H & 16
          ? de & 16
            ? te(O, se, m, b, E, L, V, T, D)
            : ut(O, E, L, !0)
          : (H & 8 && u(m, ''), de & 16 && Q(se, m, b, E, L, V, T, D));
    },
    M = (f, p, m, b, E, L, V, T, D) => {
      (f = f || gn), (p = p || gn);
      const O = f.length,
        H = p.length,
        se = Math.min(O, H);
      let ne;
      for (ne = 0; ne < se; ne++) {
        const de = (p[ne] = D ? Ft(p[ne]) : _t(p[ne]));
        I(f[ne], de, m, null, E, L, V, T, D);
      }
      O > H ? ut(f, E, L, !0, !1, se) : Q(p, m, b, E, L, V, T, D, se);
    },
    te = (f, p, m, b, E, L, V, T, D) => {
      let O = 0;
      const H = p.length;
      let se = f.length - 1,
        ne = H - 1;
      for (; O <= se && O <= ne; ) {
        const de = f[O],
          ie = (p[O] = D ? Ft(p[O]) : _t(p[O]));
        if (nn(de, ie)) I(de, ie, m, null, E, L, V, T, D);
        else break;
        O++;
      }
      for (; O <= se && O <= ne; ) {
        const de = f[se],
          ie = (p[ne] = D ? Ft(p[ne]) : _t(p[ne]));
        if (nn(de, ie)) I(de, ie, m, null, E, L, V, T, D);
        else break;
        se--, ne--;
      }
      if (O > se) {
        if (O <= ne) {
          const de = ne + 1,
            ie = de < H ? p[de].el : b;
          for (; O <= ne; )
            I(null, (p[O] = D ? Ft(p[O]) : _t(p[O])), m, ie, E, L, V, T, D),
              O++;
        }
      } else if (O > ne) for (; O <= se; ) he(f[O], E, L, !0), O++;
      else {
        const de = O,
          ie = O,
          ce = new Map();
        for (O = ie; O <= ne; O++) {
          const et = (p[O] = D ? Ft(p[O]) : _t(p[O]));
          et.key != null && ce.set(et.key, O);
        }
        let ge,
          Oe = 0;
        const Ve = ne - ie + 1;
        let st = !1,
          Wt = 0;
        const Ot = new Array(Ve);
        for (O = 0; O < Ve; O++) Ot[O] = 0;
        for (O = de; O <= se; O++) {
          const et = f[O];
          if (Oe >= Ve) {
            he(et, E, L, !0);
            continue;
          }
          let gt;
          if (et.key != null) gt = ce.get(et.key);
          else
            for (ge = ie; ge <= ne; ge++)
              if (Ot[ge - ie] === 0 && nn(et, p[ge])) {
                gt = ge;
                break;
              }
          gt === void 0
            ? he(et, E, L, !0)
            : ((Ot[gt - ie] = O + 1),
              gt >= Wt ? (Wt = gt) : (st = !0),
              I(et, p[gt], m, null, E, L, V, T, D),
              Oe++);
        }
        const Yn = st ? _u(Ot) : gn;
        for (ge = Yn.length - 1, O = Ve - 1; O >= 0; O--) {
          const et = ie + O,
            gt = p[et],
            Mi = et + 1 < H ? p[et + 1].el : b;
          Ot[O] === 0
            ? I(null, gt, m, Mi, E, L, V, T, D)
            : st && (ge < 0 || O !== Yn[ge] ? re(gt, m, Mi, 2) : ge--);
        }
      }
    },
    re = (f, p, m, b, E = null) => {
      const { el: L, type: V, transition: T, children: D, shapeFlag: O } = f;
      if (O & 6) {
        re(f.component.subTree, p, m, b);
        return;
      }
      if (O & 128) {
        f.suspense.move(p, m, b);
        return;
      }
      if (O & 64) {
        V.move(f, p, m, x);
        return;
      }
      if (V === Le) {
        r(L, p, m);
        for (let se = 0; se < D.length; se++) re(D[se], p, m, b);
        r(f.anchor, p, m);
        return;
      }
      if (V === vr) {
        k(f, p, m);
        return;
      }
      if (b !== 2 && O & 1 && T)
        if (b === 0) T.beforeEnter(L), r(L, p, m), Xe(() => T.enter(L), E);
        else {
          const { leave: se, delayLeave: ne, afterLeave: de } = T,
            ie = () => r(L, p, m),
            ce = () => {
              se(L, () => {
                ie(), de && de();
              });
            };
          ne ? ne(L, ie, ce) : ce();
        }
      else r(L, p, m);
    },
    he = (f, p, m, b = !1, E = !1) => {
      const {
        type: L,
        props: V,
        ref: T,
        children: D,
        dynamicChildren: O,
        shapeFlag: H,
        patchFlag: se,
        dirs: ne,
        memoIndex: de,
      } = f;
      if (
        (se === -2 && (E = !1),
        T != null && Ls(T, null, m, f, !0),
        de != null && (p.renderCache[de] = void 0),
        H & 256)
      ) {
        p.ctx.deactivate(f);
        return;
      }
      const ie = H & 1 && ne,
        ce = !pr(f);
      let ge;
      if ((ce && (ge = V && V.onVnodeBeforeUnmount) && mt(ge, p, f), H & 6))
        wt(f.component, m, b);
      else {
        if (H & 128) {
          f.suspense.unmount(m, b);
          return;
        }
        ie && Jt(f, null, p, 'beforeUnmount'),
          H & 64
            ? f.type.remove(f, p, m, x, b)
            : O && (L !== Le || (se > 0 && se & 64))
              ? ut(O, p, m, !1, !0)
              : ((L === Le && se & 384) || (!E && H & 16)) && ut(D, p, m),
          b && Ue(f);
      }
      ((ce && (ge = V && V.onVnodeUnmounted)) || ie) &&
        Xe(() => {
          ge && mt(ge, p, f), ie && Jt(f, null, p, 'unmounted');
        }, m);
    },
    Ue = f => {
      const { type: p, el: m, anchor: b, transition: E } = f;
      if (p === Le) {
        $e(m, b);
        return;
      }
      if (p === vr) {
        oe(f);
        return;
      }
      const L = () => {
        s(m), E && !E.persisted && E.afterLeave && E.afterLeave();
      };
      if (f.shapeFlag & 1 && E && !E.persisted) {
        const { leave: V, delayLeave: T } = E,
          D = () => V(m, L);
        T ? T(f.el, L, D) : D();
      } else L();
    },
    $e = (f, p) => {
      let m;
      for (; f !== p; ) (m = h(f)), s(f), (f = m);
      s(p);
    },
    wt = (f, p, m) => {
      const { bum: b, scope: E, update: L, subTree: V, um: T, m: D, a: O } = f;
      Yi(D),
        Yi(O),
        b && is(b),
        E.stop(),
        L && ((L.active = !1), he(V, f, p, m)),
        T && Xe(T, p),
        Xe(() => {
          f.isUnmounted = !0;
        }, p),
        p &&
          p.pendingBranch &&
          !p.isUnmounted &&
          f.asyncDep &&
          !f.asyncResolved &&
          f.suspenseId === p.pendingId &&
          (p.deps--, p.deps === 0 && p.resolve());
    },
    ut = (f, p, m, b = !1, E = !1, L = 0) => {
      for (let V = L; V < f.length; V++) he(f[V], p, m, b, E);
    },
    Bt = f =>
      f.shapeFlag & 6
        ? Bt(f.component.subTree)
        : f.shapeFlag & 128
          ? f.suspense.next()
          : h(f.anchor || f.el);
  let C = !1;
  const $ = (f, p, m) => {
      f == null
        ? p._vnode && he(p._vnode, null, null, !0)
        : I(p._vnode || null, f, p, null, null, null, m),
        C || ((C = !0), qi(), Sa(), (C = !1)),
        (p._vnode = f);
    },
    x = {
      p: I,
      um: he,
      m: re,
      r: Ue,
      mt: S,
      mc: Q,
      pc: y,
      pbc: G,
      n: Bt,
      o: e,
    };
  let j, X;
  return { render: $, hydrate: j, createApp: cu($, j) };
}
function cs({ type: e, props: t }, n) {
  return (n === 'svg' && e === 'foreignObject') ||
    (n === 'mathml' &&
      e === 'annotation-xml' &&
      t &&
      t.encoding &&
      t.encoding.includes('html'))
    ? void 0
    : n;
}
function Xt({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function yu(e, t) {
  return (!e || (e && !e.pendingBranch)) && t && !t.persisted;
}
function ja(e, t, n = !1) {
  const r = e.children,
    s = t.children;
  if (fe(r) && fe(s))
    for (let i = 0; i < r.length; i++) {
      const o = r[i];
      let l = s[i];
      l.shapeFlag & 1 &&
        !l.dynamicChildren &&
        ((l.patchFlag <= 0 || l.patchFlag === 32) &&
          ((l = s[i] = Ft(s[i])), (l.el = o.el)),
        !n && l.patchFlag !== -2 && ja(o, l)),
        l.type === Kr && (l.el = o.el);
    }
}
function _u(e) {
  const t = e.slice(),
    n = [0];
  let r, s, i, o, l;
  const a = e.length;
  for (r = 0; r < a; r++) {
    const c = e[r];
    if (c !== 0) {
      if (((s = n[n.length - 1]), e[s] < c)) {
        (t[r] = s), n.push(r);
        continue;
      }
      for (i = 0, o = n.length - 1; i < o; )
        (l = (i + o) >> 1), e[n[l]] < c ? (i = l + 1) : (o = l);
      c < e[n[i]] && (i > 0 && (t[r] = n[i - 1]), (n[i] = r));
    }
  }
  for (i = n.length, o = n[i - 1]; i-- > 0; ) (n[i] = o), (o = t[o]);
  return n;
}
function Ua(e) {
  const t = e.subTree.component;
  if (t) return t.asyncDep && !t.asyncResolved ? t : Ua(t);
}
function Yi(e) {
  if (e) for (let t = 0; t < e.length; t++) e[t].active = !1;
}
const bu = Symbol.for('v-scx'),
  Cu = () => $t(bu);
function Eu(e, t) {
  return gi(e, null, t);
}
const ir = {};
function Ne(e, t, n) {
  return gi(e, t, n);
}
function gi(
  e,
  t,
  { immediate: n, deep: r, flush: s, once: i, onTrack: o, onTrigger: l } = xe
) {
  if (t && i) {
    const A = t;
    t = (...Y) => {
      A(...Y), K();
    };
  }
  const a = We,
    c = A => (r === !0 ? A : tn(A, r === !1 ? 1 : void 0));
  let u,
    d = !1,
    h = !1;
  if (
    (Qe(e)
      ? ((u = () => e.value), (d = Er(e)))
      : Tn(e)
        ? ((u = () => c(e)), (d = !0))
        : fe(e)
          ? ((h = !0),
            (d = e.some(A => Tn(A) || Er(A))),
            (u = () =>
              e.map(A => {
                if (Qe(A)) return A.value;
                if (Tn(A)) return c(A);
                if (ve(A)) return Qt(A, a, 2);
              })))
          : ve(e)
            ? t
              ? (u = () => Qt(e, a, 2))
              : (u = () => (v && v(), lt(e, a, 3, [g])))
            : (u = at),
    t && r)
  ) {
    const A = u;
    u = () => tn(A());
  }
  let v,
    g = A => {
      v = k.onStop = () => {
        Qt(A, a, 4), (v = k.onStop = void 0);
      };
    },
    I;
  if (Wr)
    if (
      ((g = at),
      t ? n && lt(t, a, 3, [u(), h ? [] : void 0, g]) : u(),
      s === 'sync')
    ) {
      const A = Cu();
      I = A.__watcherHandles || (A.__watcherHandles = []);
    } else return at;
  let W = h ? new Array(e.length).fill(ir) : ir;
  const F = () => {
    if (!(!k.active || !k.dirty))
      if (t) {
        const A = k.run();
        (r || d || (h ? A.some((Y, Q) => qt(Y, W[Q])) : qt(A, W))) &&
          (v && v(),
          lt(t, a, 3, [A, W === ir ? void 0 : h && W[0] === ir ? [] : W, g]),
          (W = A));
      } else k.run();
  };
  F.allowRecurse = !!t;
  let q;
  s === 'sync'
    ? (q = F)
    : s === 'post'
      ? (q = () => Xe(F, a && a.suspense))
      : ((F.pre = !0), a && (F.id = a.uid), (q = () => di(F)));
  const k = new ri(u, at, q),
    oe = ia(),
    K = () => {
      k.stop(), oe && ti(oe.effects, k);
    };
  return (
    t
      ? n
        ? F()
        : (W = k.run())
      : s === 'post'
        ? Xe(k.run.bind(k), a && a.suspense)
        : k.run(),
    I && I.push(K),
    K
  );
}
function wu(e, t, n) {
  const r = this.proxy,
    s = ke(e) ? (e.includes('.') ? Va(r, e) : () => r[e]) : e.bind(r, r);
  let i;
  ve(t) ? (i = t) : ((i = t.handler), (n = t));
  const o = Jn(this),
    l = gi(s, i.bind(r), n);
  return o(), l;
}
function Va(e, t) {
  const n = t.split('.');
  return () => {
    let r = e;
    for (let s = 0; s < n.length && r; s++) r = r[n[s]];
    return r;
  };
}
function tn(e, t = 1 / 0, n) {
  if (t <= 0 || !Ie(e) || e.__v_skip || ((n = n || new Set()), n.has(e)))
    return e;
  if ((n.add(e), t--, Qe(e))) tn(e.value, t, n);
  else if (fe(e)) for (let r = 0; r < e.length; r++) tn(e[r], t, n);
  else if (Wo(e) || mn(e))
    e.forEach(r => {
      tn(r, t, n);
    });
  else if (Zo(e)) {
    for (const r in e) tn(e[r], t, n);
    for (const r of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, r) && tn(e[r], t, n);
  }
  return e;
}
const Hr = e => e.type.__isKeepAlive;
function Ou(e, t) {
  Qa(e, 'a', t);
}
function Su(e, t) {
  Qa(e, 'da', t);
}
function Qa(e, t, n = We) {
  const r =
    e.__wdc ||
    (e.__wdc = () => {
      let s = n;
      for (; s; ) {
        if (s.isDeactivated) return;
        s = s.parent;
      }
      return e();
    });
  if ((Gr(t, r, n), n)) {
    let s = n.parent;
    for (; s && s.parent; )
      Hr(s.parent.vnode) && Iu(r, t, n, s), (s = s.parent);
  }
}
function Iu(e, t, n, r) {
  const s = Gr(t, e, r, !0);
  xa(() => {
    ti(r[t], s);
  }, n);
}
const Nt = Symbol('_leaveCb'),
  or = Symbol('_enterCb');
function $u() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: new Map(),
  };
  return (
    wn(() => {
      e.isMounted = !0;
    }),
    hi(() => {
      e.isUnmounting = !0;
    }),
    e
  );
}
const it = [Function, Array],
  qa = {
    mode: String,
    appear: Boolean,
    persisted: Boolean,
    onBeforeEnter: it,
    onEnter: it,
    onAfterEnter: it,
    onEnterCancelled: it,
    onBeforeLeave: it,
    onLeave: it,
    onAfterLeave: it,
    onLeaveCancelled: it,
    onBeforeAppear: it,
    onAppear: it,
    onAfterAppear: it,
    onAppearCancelled: it,
  },
  za = e => {
    const t = e.subTree;
    return t.component ? za(t.component) : t;
  },
  xu = {
    name: 'BaseTransition',
    props: qa,
    setup(e, { slots: t }) {
      const n = Br(),
        r = $u();
      return () => {
        const s = t.default && Ha(t.default(), !0);
        if (!s || !s.length) return;
        let i = s[0];
        if (s.length > 1) {
          for (const h of s)
            if (h.type !== rt) {
              i = h;
              break;
            }
        }
        const o = Ce(e),
          { mode: l } = o;
        if (r.isLeaving) return us(i);
        const a = eo(i);
        if (!a) return us(i);
        let c = Rs(a, o, r, n, h => (c = h));
        Ir(a, c);
        const u = n.subTree,
          d = u && eo(u);
        if (d && d.type !== rt && !nn(a, d) && za(n).type !== rt) {
          const h = Rs(d, o, r, n);
          if ((Ir(d, h), l === 'out-in' && a.type !== rt))
            return (
              (r.isLeaving = !0),
              (h.afterLeave = () => {
                (r.isLeaving = !1),
                  n.update.active !== !1 && ((n.effect.dirty = !0), n.update());
              }),
              us(i)
            );
          l === 'in-out' &&
            a.type !== rt &&
            (h.delayLeave = (v, g, I) => {
              const W = Ga(r, d);
              (W[String(d.key)] = d),
                (v[Nt] = () => {
                  g(), (v[Nt] = void 0), delete c.delayedLeave;
                }),
                (c.delayedLeave = I);
            });
        }
        return i;
      };
    },
  },
  Au = xu;
function Ga(e, t) {
  const { leavingVNodes: n } = e;
  let r = n.get(t.type);
  return r || ((r = Object.create(null)), n.set(t.type, r)), r;
}
function Rs(e, t, n, r, s) {
  const {
      appear: i,
      mode: o,
      persisted: l = !1,
      onBeforeEnter: a,
      onEnter: c,
      onAfterEnter: u,
      onEnterCancelled: d,
      onBeforeLeave: h,
      onLeave: v,
      onAfterLeave: g,
      onLeaveCancelled: I,
      onBeforeAppear: W,
      onAppear: F,
      onAfterAppear: q,
      onAppearCancelled: k,
    } = t,
    oe = String(e.key),
    K = Ga(n, e),
    A = (B, G) => {
      B && lt(B, r, 9, G);
    },
    Y = (B, G) => {
      const ue = G[1];
      A(B, G),
        fe(B) ? B.every(z => z.length <= 1) && ue() : B.length <= 1 && ue();
    },
    Q = {
      mode: o,
      persisted: l,
      beforeEnter(B) {
        let G = a;
        if (!n.isMounted)
          if (i) G = W || a;
          else return;
        B[Nt] && B[Nt](!0);
        const ue = K[oe];
        ue && nn(e, ue) && ue.el[Nt] && ue.el[Nt](), A(G, [B]);
      },
      enter(B) {
        let G = c,
          ue = u,
          z = d;
        if (!n.isMounted)
          if (i) (G = F || c), (ue = q || u), (z = k || d);
          else return;
        let P = !1;
        const S = (B[or] = R => {
          P ||
            ((P = !0),
            R ? A(z, [B]) : A(ue, [B]),
            Q.delayedLeave && Q.delayedLeave(),
            (B[or] = void 0));
        });
        G ? Y(G, [B, S]) : S();
      },
      leave(B, G) {
        const ue = String(e.key);
        if ((B[or] && B[or](!0), n.isUnmounting)) return G();
        A(h, [B]);
        let z = !1;
        const P = (B[Nt] = S => {
          z ||
            ((z = !0),
            G(),
            S ? A(I, [B]) : A(g, [B]),
            (B[Nt] = void 0),
            K[ue] === e && delete K[ue]);
        });
        (K[ue] = e), v ? Y(v, [B, P]) : P();
      },
      clone(B) {
        const G = Rs(B, t, n, r, s);
        return s && s(G), G;
      },
    };
  return Q;
}
function us(e) {
  if (Hr(e)) return (e = zt(e)), (e.children = null), e;
}
function eo(e) {
  if (!Hr(e)) return e;
  const { shapeFlag: t, children: n } = e;
  if (n) {
    if (t & 16) return n[0];
    if (t & 32 && ve(n.default)) return n.default();
  }
}
function Ir(e, t) {
  e.shapeFlag & 6 && e.component
    ? Ir(e.component.subTree, t)
    : e.shapeFlag & 128
      ? ((e.ssContent.transition = t.clone(e.ssContent)),
        (e.ssFallback.transition = t.clone(e.ssFallback)))
      : (e.transition = t);
}
function Ha(e, t = !1, n) {
  let r = [],
    s = 0;
  for (let i = 0; i < e.length; i++) {
    let o = e[i];
    const l = n == null ? o.key : String(n) + String(o.key != null ? o.key : i);
    o.type === Le
      ? (o.patchFlag & 128 && s++, (r = r.concat(Ha(o.children, t, l))))
      : (t || o.type !== rt) && r.push(l != null ? zt(o, { key: l }) : o);
  }
  if (s > 1) for (let i = 0; i < r.length; i++) r[i].patchFlag = -2;
  return r;
}
const Pu = e => e.__isTeleport,
  Le = Symbol.for('v-fgt'),
  Kr = Symbol.for('v-txt'),
  rt = Symbol.for('v-cmt'),
  vr = Symbol.for('v-stc'),
  kn = [];
let dt = null;
function U(e = !1) {
  kn.push((dt = e ? null : []));
}
function Lu() {
  kn.pop(), (dt = kn[kn.length - 1] || null);
}
let qn = 1;
function to(e) {
  qn += e;
}
function Ka(e) {
  return (
    (e.dynamicChildren = qn > 0 ? dt || gn : null),
    Lu(),
    qn > 0 && dt && dt.push(e),
    e
  );
}
function Z(e, t, n, r, s, i) {
  return Ka(w(e, t, n, r, s, i, !0));
}
function Pe(e, t, n, r, s) {
  return Ka(_e(e, t, n, r, s, !0));
}
function Ts(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function nn(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Ba = ({ key: e }) => e ?? null,
  gr = ({ ref: e, ref_key: t, ref_for: n }) => (
    typeof e == 'number' && (e = '' + e),
    e != null
      ? ke(e) || Qe(e) || ve(e)
        ? { i: ft, r: e, k: t, f: !!n }
        : e
      : null
  );
function w(
  e,
  t = null,
  n = null,
  r = 0,
  s = null,
  i = e === Le ? 0 : 1,
  o = !1,
  l = !1
) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Ba(t),
    ref: t && gr(t),
    scopeId: zr,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: i,
    patchFlag: r,
    dynamicProps: s,
    dynamicChildren: null,
    appContext: null,
    ctx: ft,
  };
  return (
    l
      ? (mi(a, n), i & 128 && e.normalize(a))
      : n && (a.shapeFlag |= ke(n) ? 8 : 16),
    qn > 0 &&
      !o &&
      dt &&
      (a.patchFlag > 0 || i & 6) &&
      a.patchFlag !== 32 &&
      dt.push(a),
    a
  );
}
const _e = Ru;
function Ru(e, t = null, n = null, r = 0, s = null, i = !1) {
  if (((!e || e === Hc) && (e = rt), Ts(e))) {
    const l = zt(e, t, !0);
    return (
      n && mi(l, n),
      qn > 0 &&
        !i &&
        dt &&
        (l.shapeFlag & 6 ? (dt[dt.indexOf(e)] = l) : dt.push(l)),
      (l.patchFlag = -2),
      l
    );
  }
  if ((qu(e) && (e = e.__vccOpts), t)) {
    t = Tu(t);
    let { class: l, style: a } = t;
    l && !ke(l) && (t.class = Te(l)),
      Ie(a) && (ya(a) && !fe(a) && (a = Fe({}, a)), (t.style = ht(a)));
  }
  const o = ke(e) ? 1 : Kc(e) ? 128 : Pu(e) ? 64 : Ie(e) ? 4 : ve(e) ? 2 : 0;
  return w(e, t, n, r, s, o, i, !0);
}
function Tu(e) {
  return e ? (ya(e) || Ta(e) ? Fe({}, e) : e) : null;
}
function zt(e, t, n = !1, r = !1) {
  const { props: s, ref: i, patchFlag: o, children: l, transition: a } = e,
    c = t ? Nu(s || {}, t) : s,
    u = {
      __v_isVNode: !0,
      __v_skip: !0,
      type: e.type,
      props: c,
      key: c && Ba(c),
      ref:
        t && t.ref
          ? n && i
            ? fe(i)
              ? i.concat(gr(t))
              : [i, gr(t)]
            : gr(t)
          : i,
      scopeId: e.scopeId,
      slotScopeIds: e.slotScopeIds,
      children: l,
      target: e.target,
      targetAnchor: e.targetAnchor,
      staticCount: e.staticCount,
      shapeFlag: e.shapeFlag,
      patchFlag: t && e.type !== Le ? (o === -1 ? 16 : o | 16) : o,
      dynamicProps: e.dynamicProps,
      dynamicChildren: e.dynamicChildren,
      appContext: e.appContext,
      dirs: e.dirs,
      transition: a,
      component: e.component,
      suspense: e.suspense,
      ssContent: e.ssContent && zt(e.ssContent),
      ssFallback: e.ssFallback && zt(e.ssFallback),
      el: e.el,
      anchor: e.anchor,
      ctx: e.ctx,
      ce: e.ce,
    };
  return a && r && Ir(u, a.clone(u)), u;
}
function zn(e = ' ', t = 0) {
  return _e(Kr, null, e, t);
}
function Mu(e, t) {
  const n = _e(vr, null, e);
  return (n.staticCount = t), n;
}
function le(e = '', t = !1) {
  return t ? (U(), Pe(rt, null, e)) : _e(rt, null, e);
}
function _t(e) {
  return e == null || typeof e == 'boolean'
    ? _e(rt)
    : fe(e)
      ? _e(Le, null, e.slice())
      : typeof e == 'object'
        ? Ft(e)
        : _e(Kr, null, String(e));
}
function Ft(e) {
  return (e.el === null && e.patchFlag !== -1) || e.memo ? e : zt(e);
}
function mi(e, t) {
  let n = 0;
  const { shapeFlag: r } = e;
  if (t == null) t = null;
  else if (fe(t)) n = 16;
  else if (typeof t == 'object')
    if (r & 65) {
      const s = t.default;
      s && (s._c && (s._d = !1), mi(e, s()), s._c && (s._d = !0));
      return;
    } else {
      n = 32;
      const s = t._;
      !s && !Ta(t)
        ? (t._ctx = ft)
        : s === 3 &&
          ft &&
          (ft.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)));
    }
  else
    ve(t)
      ? ((t = { default: t, _ctx: ft }), (n = 32))
      : ((t = String(t)), r & 64 ? ((n = 16), (t = [zn(t)])) : (n = 8));
  (e.children = t), (e.shapeFlag |= n);
}
function Nu(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    for (const s in r)
      if (s === 'class')
        t.class !== r.class && (t.class = Te([t.class, r.class]));
      else if (s === 'style') t.style = ht([t.style, r.style]);
      else if (kr(s)) {
        const i = t[s],
          o = r[s];
        o &&
          i !== o &&
          !(fe(i) && i.includes(o)) &&
          (t[s] = i ? [].concat(i, o) : o);
      } else s !== '' && (t[s] = r[s]);
  }
  return t;
}
function mt(e, t, n, r = null) {
  lt(e, t, 7, [n, r]);
}
const Fu = Pa();
let ku = 0;
function Du(e, t, n) {
  const r = e.type,
    s = (t ? t.appContext : e.appContext) || Fu,
    i = {
      uid: ku++,
      vnode: e,
      type: r,
      parent: t,
      appContext: s,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      scope: new sa(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: t ? t.provides : Object.create(s.provides),
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: Na(r, s),
      emitsOptions: $a(r, s),
      emit: null,
      emitted: null,
      propsDefaults: xe,
      inheritAttrs: r.inheritAttrs,
      ctx: xe,
      data: xe,
      props: xe,
      attrs: xe,
      slots: xe,
      refs: xe,
      setupState: xe,
      setupContext: null,
      attrsProxy: null,
      slotsProxy: null,
      suspense: n,
      suspenseId: n ? n.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
      isMounted: !1,
      isUnmounted: !1,
      isDeactivated: !1,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null,
    };
  return (
    (i.ctx = { _: i }),
    (i.root = t ? t.root : i),
    (i.emit = Vc.bind(null, i)),
    e.ce && e.ce(i),
    i
  );
}
let We = null;
const Br = () => We || ft;
let $r, Ms;
{
  const e = ta(),
    t = (n, r) => {
      let s;
      return (
        (s = e[n]) || (s = e[n] = []),
        s.push(r),
        i => {
          s.length > 1 ? s.forEach(o => o(i)) : s[0](i);
        }
      );
    };
  ($r = t('__VUE_INSTANCE_SETTERS__', n => (We = n))),
    (Ms = t('__VUE_SSR_SETTERS__', n => (Wr = n)));
}
const Jn = e => {
    const t = We;
    return (
      $r(e),
      e.scope.on(),
      () => {
        e.scope.off(), $r(t);
      }
    );
  },
  no = () => {
    We && We.scope.off(), $r(null);
  };
function Wa(e) {
  return e.vnode.shapeFlag & 4;
}
let Wr = !1;
function ju(e, t = !1) {
  t && Ms(t);
  const { props: n, children: r } = e.vnode,
    s = Wa(e);
  fu(e, n, s, t), pu(e, r);
  const i = s ? Uu(e, t) : void 0;
  return t && Ms(!1), i;
}
function Uu(e, t) {
  const n = e.type;
  (e.accessCache = Object.create(null)), (e.proxy = new Proxy(e.ctx, nu));
  const { setup: r } = n;
  if (r) {
    const s = (e.setupContext = r.length > 1 ? Qu(e) : null),
      i = Jn(e);
    Ht();
    const o = Qt(r, e, 0, [e.props, s]);
    if ((xt(), i(), Jo(o))) {
      if ((o.then(no, no), t))
        return o
          .then(l => {
            ro(e, l, t);
          })
          .catch(l => {
            Qr(l, e, 0);
          });
      e.asyncDep = o;
    } else ro(e, o, t);
  } else Ja(e, t);
}
function ro(e, t, n) {
  ve(t)
    ? e.type.__ssrInlineRender
      ? (e.ssrRender = t)
      : (e.render = t)
    : Ie(t) && (e.setupState = ba(t)),
    Ja(e, n);
}
let so;
function Ja(e, t, n) {
  const r = e.type;
  if (!e.render) {
    if (!t && so && !r.render) {
      const s = r.template || pi(e).template;
      if (s) {
        const { isCustomElement: i, compilerOptions: o } = e.appContext.config,
          { delimiters: l, compilerOptions: a } = r,
          c = Fe(Fe({ isCustomElement: i, delimiters: l }, o), a);
        r.render = so(s, c);
      }
    }
    e.render = r.render || at;
  }
  {
    const s = Jn(e);
    Ht();
    try {
      ru(e);
    } finally {
      xt(), s();
    }
  }
}
const Vu = {
  get(e, t) {
    return Ze(e, 'get', ''), e[t];
  },
};
function Qu(e) {
  const t = n => {
    e.exposed = n || {};
  };
  return {
    attrs: new Proxy(e.attrs, Vu),
    slots: e.slots,
    emit: e.emit,
    expose: t,
  };
}
function yi(e) {
  return e.exposed
    ? e.exposeProxy ||
        (e.exposeProxy = new Proxy(ba(Sc(e.exposed)), {
          get(t, n) {
            if (n in t) return t[n];
            if (n in Nn) return Nn[n](e);
          },
          has(t, n) {
            return n in t || n in Nn;
          },
        }))
    : e.proxy;
}
function qu(e) {
  return ve(e) && '__vccOpts' in e;
}
const ee = (e, t) => Ic(e, t, Wr);
function Xa(e, t, n) {
  const r = arguments.length;
  return r === 2
    ? Ie(t) && !fe(t)
      ? Ts(t)
        ? _e(e, null, [t])
        : _e(e, t)
      : _e(e, null, t)
    : (r > 3
        ? (n = Array.prototype.slice.call(arguments, 2))
        : r === 3 && Ts(n) && (n = [n]),
      _e(e, t, n));
}
const zu = '3.4.30';
/**
 * @vue/runtime-dom v3.4.30
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ const Gu = 'http://www.w3.org/2000/svg',
  Hu = 'http://www.w3.org/1998/Math/MathML',
  St = typeof document < 'u' ? document : null,
  io = St && St.createElement('template'),
  Ku = {
    insert: (e, t, n) => {
      t.insertBefore(e, n || null);
    },
    remove: e => {
      const t = e.parentNode;
      t && t.removeChild(e);
    },
    createElement: (e, t, n, r) => {
      const s =
        t === 'svg'
          ? St.createElementNS(Gu, e)
          : t === 'mathml'
            ? St.createElementNS(Hu, e)
            : n
              ? St.createElement(e, { is: n })
              : St.createElement(e);
      return (
        e === 'select' &&
          r &&
          r.multiple != null &&
          s.setAttribute('multiple', r.multiple),
        s
      );
    },
    createText: e => St.createTextNode(e),
    createComment: e => St.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t;
    },
    setElementText: (e, t) => {
      e.textContent = t;
    },
    parentNode: e => e.parentNode,
    nextSibling: e => e.nextSibling,
    querySelector: e => St.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, '');
    },
    insertStaticContent(e, t, n, r, s, i) {
      const o = n ? n.previousSibling : t.lastChild;
      if (s && (s === i || s.nextSibling))
        for (
          ;
          t.insertBefore(s.cloneNode(!0), n),
            !(s === i || !(s = s.nextSibling));

        );
      else {
        io.innerHTML =
          r === 'svg'
            ? `<svg>${e}</svg>`
            : r === 'mathml'
              ? `<math>${e}</math>`
              : e;
        const l = io.content;
        if (r === 'svg' || r === 'mathml') {
          const a = l.firstChild;
          for (; a.firstChild; ) l.appendChild(a.firstChild);
          l.removeChild(a);
        }
        t.insertBefore(l, n);
      }
      return [
        o ? o.nextSibling : t.firstChild,
        n ? n.previousSibling : t.lastChild,
      ];
    },
  },
  Rt = 'transition',
  $n = 'animation',
  Gn = Symbol('_vtc'),
  _i = (e, { slots: t }) => Xa(Au, Bu(e), t);
_i.displayName = 'Transition';
const Za = {
  name: String,
  type: String,
  css: { type: Boolean, default: !0 },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String,
};
_i.props = Fe({}, qa, Za);
const Zt = (e, t = []) => {
    fe(e) ? e.forEach(n => n(...t)) : e && e(...t);
  },
  oo = e => (e ? (fe(e) ? e.some(t => t.length > 1) : e.length > 1) : !1);
function Bu(e) {
  const t = {};
  for (const z in e) z in Za || (t[z] = e[z]);
  if (e.css === !1) return t;
  const {
      name: n = 'v',
      type: r,
      duration: s,
      enterFromClass: i = `${n}-enter-from`,
      enterActiveClass: o = `${n}-enter-active`,
      enterToClass: l = `${n}-enter-to`,
      appearFromClass: a = i,
      appearActiveClass: c = o,
      appearToClass: u = l,
      leaveFromClass: d = `${n}-leave-from`,
      leaveActiveClass: h = `${n}-leave-active`,
      leaveToClass: v = `${n}-leave-to`,
    } = e,
    g = Wu(s),
    I = g && g[0],
    W = g && g[1],
    {
      onBeforeEnter: F,
      onEnter: q,
      onEnterCancelled: k,
      onLeave: oe,
      onLeaveCancelled: K,
      onBeforeAppear: A = F,
      onAppear: Y = q,
      onAppearCancelled: Q = k,
    } = t,
    B = (z, P, S) => {
      Yt(z, P ? u : l), Yt(z, P ? c : o), S && S();
    },
    G = (z, P) => {
      (z._isLeaving = !1), Yt(z, d), Yt(z, v), Yt(z, h), P && P();
    },
    ue = z => (P, S) => {
      const R = z ? Y : q,
        N = () => B(P, z, S);
      Zt(R, [P, N]),
        ao(() => {
          Yt(P, z ? a : i), Tt(P, z ? u : l), oo(R) || lo(P, r, I, N);
        });
    };
  return Fe(t, {
    onBeforeEnter(z) {
      Zt(F, [z]), Tt(z, i), Tt(z, o);
    },
    onBeforeAppear(z) {
      Zt(A, [z]), Tt(z, a), Tt(z, c);
    },
    onEnter: ue(!1),
    onAppear: ue(!0),
    onLeave(z, P) {
      z._isLeaving = !0;
      const S = () => G(z, P);
      Tt(z, d),
        Tt(z, h),
        Zu(),
        ao(() => {
          z._isLeaving && (Yt(z, d), Tt(z, v), oo(oe) || lo(z, r, W, S));
        }),
        Zt(oe, [z, S]);
    },
    onEnterCancelled(z) {
      B(z, !1), Zt(k, [z]);
    },
    onAppearCancelled(z) {
      B(z, !0), Zt(Q, [z]);
    },
    onLeaveCancelled(z) {
      G(z), Zt(K, [z]);
    },
  });
}
function Wu(e) {
  if (e == null) return null;
  if (Ie(e)) return [fs(e.enter), fs(e.leave)];
  {
    const t = fs(e);
    return [t, t];
  }
}
function fs(e) {
  return Wl(e);
}
function Tt(e, t) {
  t.split(/\s+/).forEach(n => n && e.classList.add(n)),
    (e[Gn] || (e[Gn] = new Set())).add(t);
}
function Yt(e, t) {
  t.split(/\s+/).forEach(r => r && e.classList.remove(r));
  const n = e[Gn];
  n && (n.delete(t), n.size || (e[Gn] = void 0));
}
function ao(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e);
  });
}
let Ju = 0;
function lo(e, t, n, r) {
  const s = (e._endId = ++Ju),
    i = () => {
      s === e._endId && r();
    };
  if (n) return setTimeout(i, n);
  const { type: o, timeout: l, propCount: a } = Xu(e, t);
  if (!o) return r();
  const c = o + 'end';
  let u = 0;
  const d = () => {
      e.removeEventListener(c, h), i();
    },
    h = v => {
      v.target === e && ++u >= a && d();
    };
  setTimeout(() => {
    u < a && d();
  }, l + 1),
    e.addEventListener(c, h);
}
function Xu(e, t) {
  const n = window.getComputedStyle(e),
    r = g => (n[g] || '').split(', '),
    s = r(`${Rt}Delay`),
    i = r(`${Rt}Duration`),
    o = co(s, i),
    l = r(`${$n}Delay`),
    a = r(`${$n}Duration`),
    c = co(l, a);
  let u = null,
    d = 0,
    h = 0;
  t === Rt
    ? o > 0 && ((u = Rt), (d = o), (h = i.length))
    : t === $n
      ? c > 0 && ((u = $n), (d = c), (h = a.length))
      : ((d = Math.max(o, c)),
        (u = d > 0 ? (o > c ? Rt : $n) : null),
        (h = u ? (u === Rt ? i.length : a.length) : 0));
  const v =
    u === Rt && /\b(transform|all)(,|$)/.test(r(`${Rt}Property`).toString());
  return { type: u, timeout: d, propCount: h, hasTransform: v };
}
function co(e, t) {
  for (; e.length < t.length; ) e = e.concat(e);
  return Math.max(...t.map((n, r) => uo(n) + uo(e[r])));
}
function uo(e) {
  return e === 'auto' ? 0 : Number(e.slice(0, -1).replace(',', '.')) * 1e3;
}
function Zu() {
  return document.body.offsetHeight;
}
function Yu(e, t, n) {
  const r = e[Gn];
  r && (t = (t ? [t, ...r] : [...r]).join(' ')),
    t == null
      ? e.removeAttribute('class')
      : n
        ? e.setAttribute('class', t)
        : (e.className = t);
}
const fo = Symbol('_vod'),
  ef = Symbol('_vsh'),
  tf = Symbol(''),
  nf = /(^|;)\s*display\s*:/;
function rf(e, t, n) {
  const r = e.style,
    s = ke(n);
  let i = !1;
  if (n && !s) {
    if (t)
      if (ke(t))
        for (const o of t.split(';')) {
          const l = o.slice(0, o.indexOf(':')).trim();
          n[l] == null && mr(r, l, '');
        }
      else for (const o in t) n[o] == null && mr(r, o, '');
    for (const o in n) o === 'display' && (i = !0), mr(r, o, n[o]);
  } else if (s) {
    if (t !== n) {
      const o = r[tf];
      o && (n += ';' + o), (r.cssText = n), (i = nf.test(n));
    }
  } else t && e.removeAttribute('style');
  fo in e && ((e[fo] = i ? r.display : ''), e[ef] && (r.display = 'none'));
}
const ho = /\s*!important$/;
function mr(e, t, n) {
  if (fe(n)) n.forEach(r => mr(e, t, r));
  else if ((n == null && (n = ''), t.startsWith('--'))) e.setProperty(t, n);
  else {
    const r = sf(e, t);
    ho.test(n)
      ? e.setProperty(ln(r), n.replace(ho, ''), 'important')
      : (e[r] = n);
  }
}
const po = ['Webkit', 'Moz', 'ms'],
  ds = {};
function sf(e, t) {
  const n = ds[t];
  if (n) return n;
  let r = bn(t);
  if (r !== 'filter' && r in e) return (ds[t] = r);
  r = Yo(r);
  for (let s = 0; s < po.length; s++) {
    const i = po[s] + r;
    if (i in e) return (ds[t] = i);
  }
  return t;
}
const vo = 'http://www.w3.org/1999/xlink';
function go(e, t, n, r, s, i = tc(t)) {
  r && t.startsWith('xlink:')
    ? n == null
      ? e.removeAttributeNS(vo, t.slice(6, t.length))
      : e.setAttributeNS(vo, t, n)
    : n == null || (i && !na(n))
      ? e.removeAttribute(t)
      : e.setAttribute(t, i ? '' : Gt(n) ? String(n) : n);
}
function of(e, t, n, r, s, i, o) {
  if (t === 'innerHTML' || t === 'textContent') {
    r && o(r, s, i), (e[t] = n ?? '');
    return;
  }
  const l = e.tagName;
  if (t === 'value' && l !== 'PROGRESS' && !l.includes('-')) {
    const c = l === 'OPTION' ? e.getAttribute('value') || '' : e.value,
      u = n == null ? '' : String(n);
    (c !== u || !('_value' in e)) && (e.value = u),
      n == null && e.removeAttribute(t),
      (e._value = n);
    return;
  }
  let a = !1;
  if (n === '' || n == null) {
    const c = typeof e[t];
    c === 'boolean'
      ? (n = na(n))
      : n == null && c === 'string'
        ? ((n = ''), (a = !0))
        : c === 'number' && ((n = 0), (a = !0));
  }
  try {
    e[t] = n;
  } catch {}
  a && e.removeAttribute(t);
}
function af(e, t, n, r) {
  e.addEventListener(t, n, r);
}
function lf(e, t, n, r) {
  e.removeEventListener(t, n, r);
}
const mo = Symbol('_vei');
function cf(e, t, n, r, s = null) {
  const i = e[mo] || (e[mo] = {}),
    o = i[t];
  if (r && o) o.value = r;
  else {
    const [l, a] = uf(t);
    if (r) {
      const c = (i[t] = hf(r, s));
      af(e, l, c, a);
    } else o && (lf(e, l, o, a), (i[t] = void 0));
  }
}
const yo = /(?:Once|Passive|Capture)$/;
function uf(e) {
  let t;
  if (yo.test(e)) {
    t = {};
    let r;
    for (; (r = e.match(yo)); )
      (e = e.slice(0, e.length - r[0].length)), (t[r[0].toLowerCase()] = !0);
  }
  return [e[2] === ':' ? e.slice(3) : ln(e.slice(2)), t];
}
let hs = 0;
const ff = Promise.resolve(),
  df = () => hs || (ff.then(() => (hs = 0)), (hs = Date.now()));
function hf(e, t) {
  const n = r => {
    if (!r._vts) r._vts = Date.now();
    else if (r._vts <= n.attached) return;
    lt(pf(r, n.value), t, 5, [r]);
  };
  return (n.value = e), (n.attached = df()), n;
}
function pf(e, t) {
  if (fe(t)) {
    const n = e.stopImmediatePropagation;
    return (
      (e.stopImmediatePropagation = () => {
        n.call(e), (e._stopped = !0);
      }),
      t.map(r => s => !s._stopped && r && r(s))
    );
  } else return t;
}
const _o = e =>
    e.charCodeAt(0) === 111 &&
    e.charCodeAt(1) === 110 &&
    e.charCodeAt(2) > 96 &&
    e.charCodeAt(2) < 123,
  vf = (e, t, n, r, s, i, o, l, a) => {
    const c = s === 'svg';
    t === 'class'
      ? Yu(e, r, c)
      : t === 'style'
        ? rf(e, n, r)
        : kr(t)
          ? ei(t) || cf(e, t, n, r, o)
          : (
                t[0] === '.'
                  ? ((t = t.slice(1)), !0)
                  : t[0] === '^'
                    ? ((t = t.slice(1)), !1)
                    : gf(e, t, r, c)
              )
            ? (of(e, t, r, i, o, l, a),
              !e.tagName.includes('-') &&
                (t === 'value' || t === 'checked' || t === 'selected') &&
                go(e, t, r, c, o, t !== 'value'))
            : (t === 'true-value'
                ? (e._trueValue = r)
                : t === 'false-value' && (e._falseValue = r),
              go(e, t, r, c));
  };
function gf(e, t, n, r) {
  if (r)
    return !!(
      t === 'innerHTML' ||
      t === 'textContent' ||
      (t in e && _o(t) && ve(n))
    );
  if (
    t === 'spellcheck' ||
    t === 'draggable' ||
    t === 'translate' ||
    t === 'form' ||
    (t === 'list' && e.tagName === 'INPUT') ||
    (t === 'type' && e.tagName === 'TEXTAREA')
  )
    return !1;
  if (t === 'width' || t === 'height') {
    const s = e.tagName;
    if (s === 'IMG' || s === 'VIDEO' || s === 'CANVAS' || s === 'SOURCE')
      return !1;
  }
  return _o(t) && ke(n) ? !1 : t in e;
}
const mf = ['ctrl', 'shift', 'alt', 'meta'],
  yf = {
    stop: e => e.stopPropagation(),
    prevent: e => e.preventDefault(),
    self: e => e.target !== e.currentTarget,
    ctrl: e => !e.ctrlKey,
    shift: e => !e.shiftKey,
    alt: e => !e.altKey,
    meta: e => !e.metaKey,
    left: e => 'button' in e && e.button !== 0,
    middle: e => 'button' in e && e.button !== 1,
    right: e => 'button' in e && e.button !== 2,
    exact: (e, t) => mf.some(n => e[`${n}Key`] && !t.includes(n)),
  },
  je = (e, t) => {
    const n = e._withMods || (e._withMods = {}),
      r = t.join('.');
    return (
      n[r] ||
      (n[r] = (s, ...i) => {
        for (let o = 0; o < t.length; o++) {
          const l = yf[t[o]];
          if (l && l(s, t)) return;
        }
        return e(s, ...i);
      })
    );
  },
  _f = {
    esc: 'escape',
    space: ' ',
    up: 'arrow-up',
    left: 'arrow-left',
    right: 'arrow-right',
    down: 'arrow-down',
    delete: 'backspace',
  },
  Re = (e, t) => {
    const n = e._withKeys || (e._withKeys = {}),
      r = t.join('.');
    return (
      n[r] ||
      (n[r] = s => {
        if (!('key' in s)) return;
        const i = ln(s.key);
        if (t.some(o => o === i || _f[o] === i)) return e(s);
      })
    );
  },
  bf = Fe({ patchProp: vf }, Ku);
let bo;
function Cf() {
  return bo || (bo = gu(bf));
}
const Ef = (...e) => {
  const t = Cf().createApp(...e),
    { mount: n } = t;
  return (
    (t.mount = r => {
      const s = Of(r);
      if (!s) return;
      const i = t._component;
      !ve(i) && !i.render && !i.template && (i.template = s.innerHTML),
        (s.innerHTML = '');
      const o = n(s, !1, wf(s));
      return (
        s instanceof Element &&
          (s.removeAttribute('v-cloak'), s.setAttribute('data-v-app', '')),
        o
      );
    }),
    t
  );
};
function wf(e) {
  if (e instanceof SVGElement) return 'svg';
  if (typeof MathMLElement == 'function' && e instanceof MathMLElement)
    return 'mathml';
}
function Of(e) {
  return ke(e) ? document.querySelector(e) : e;
}
function Jr(e) {
  return ia() ? (oa(e), !0) : !1;
}
function Ke(e) {
  return typeof e == 'function' ? e() : J(e);
}
const bi = typeof window < 'u' && typeof document < 'u';
typeof WorkerGlobalScope < 'u' && globalThis instanceof WorkerGlobalScope;
const Sf = Object.prototype.toString,
  Ya = e => Sf.call(e) === '[object Object]',
  _n = () => {},
  Ns = If();
function If() {
  var e, t;
  return (
    bi &&
    ((e = window == null ? void 0 : window.navigator) == null
      ? void 0
      : e.userAgent) &&
    (/iP(?:ad|hone|od)/.test(window.navigator.userAgent) ||
      (((t = window == null ? void 0 : window.navigator) == null
        ? void 0
        : t.maxTouchPoints) > 2 &&
        /iPad|Macintosh/.test(
          window == null ? void 0 : window.navigator.userAgent
        )))
  );
}
function $f(e) {
  return Br();
}
function xf(...e) {
  if (e.length !== 1) return Nc(...e);
  const t = e[0];
  return typeof t == 'function' ? Vr(Lc(() => ({ get: t, set: _n }))) : ye(t);
}
function Af(e, t = !0, n) {
  $f() ? wn(e, n) : t ? e() : wa(e);
}
function An(e) {
  var t;
  const n = Ke(e);
  return (t = n == null ? void 0 : n.$el) != null ? t : n;
}
const Xr = bi ? window : void 0;
function yr(...e) {
  let t, n, r, s;
  if (
    (typeof e[0] == 'string' || Array.isArray(e[0])
      ? (([n, r, s] = e), (t = Xr))
      : ([t, n, r, s] = e),
    !t)
  )
    return _n;
  Array.isArray(n) || (n = [n]), Array.isArray(r) || (r = [r]);
  const i = [],
    o = () => {
      i.forEach(u => u()), (i.length = 0);
    },
    l = (u, d, h, v) => (
      u.addEventListener(d, h, v), () => u.removeEventListener(d, h, v)
    ),
    a = Ne(
      () => [An(t), Ke(s)],
      ([u, d]) => {
        if ((o(), !u)) return;
        const h = Ya(d) ? { ...d } : d;
        i.push(...n.flatMap(v => r.map(g => l(u, v, g, h))));
      },
      { immediate: !0, flush: 'post' }
    ),
    c = () => {
      a(), o();
    };
  return Jr(c), c;
}
let Co = !1;
function Pf(e, t, n = {}) {
  const {
    window: r = Xr,
    ignore: s = [],
    capture: i = !0,
    detectIframe: o = !1,
  } = n;
  if (!r) return _n;
  Ns &&
    !Co &&
    ((Co = !0),
    Array.from(r.document.body.children).forEach(h =>
      h.addEventListener('click', _n)
    ),
    r.document.documentElement.addEventListener('click', _n));
  let l = !0;
  const a = h =>
      s.some(v => {
        if (typeof v == 'string')
          return Array.from(r.document.querySelectorAll(v)).some(
            g => g === h.target || h.composedPath().includes(g)
          );
        {
          const g = An(v);
          return g && (h.target === g || h.composedPath().includes(g));
        }
      }),
    u = [
      yr(
        r,
        'click',
        h => {
          const v = An(e);
          if (!(!v || v === h.target || h.composedPath().includes(v))) {
            if ((h.detail === 0 && (l = !a(h)), !l)) {
              l = !0;
              return;
            }
            t(h);
          }
        },
        { passive: !0, capture: i }
      ),
      yr(
        r,
        'pointerdown',
        h => {
          const v = An(e);
          l = !a(h) && !!(v && !h.composedPath().includes(v));
        },
        { passive: !0 }
      ),
      o &&
        yr(r, 'blur', h => {
          setTimeout(() => {
            var v;
            const g = An(e);
            ((v = r.document.activeElement) == null ? void 0 : v.tagName) ===
              'IFRAME' &&
              !(g != null && g.contains(r.document.activeElement)) &&
              t(h);
          }, 0);
        }),
    ].filter(Boolean);
  return () => u.forEach(h => h());
}
function Lf() {
  const e = ye(!1),
    t = Br();
  return (
    t &&
      wn(() => {
        e.value = !0;
      }, t),
    e
  );
}
function Rf(e) {
  const t = Lf();
  return ee(() => (t.value, !!e()));
}
function Tf(e, t = {}) {
  const { window: n = Xr } = t,
    r = Rf(() => n && 'matchMedia' in n && typeof n.matchMedia == 'function');
  let s;
  const i = ye(!1),
    o = c => {
      i.value = c.matches;
    },
    l = () => {
      s &&
        ('removeEventListener' in s
          ? s.removeEventListener('change', o)
          : s.removeListener(o));
    },
    a = Eu(() => {
      r.value &&
        (l(),
        (s = n.matchMedia(Ke(e))),
        'addEventListener' in s
          ? s.addEventListener('change', o)
          : s.addListener(o),
        (i.value = s.matches));
    });
  return (
    Jr(() => {
      a(), l(), (s = void 0);
    }),
    i
  );
}
function Mf(e = {}) {
  const {
      window: t = Xr,
      initialWidth: n = Number.POSITIVE_INFINITY,
      initialHeight: r = Number.POSITIVE_INFINITY,
      listenOrientation: s = !0,
      includeScrollbar: i = !0,
    } = e,
    o = ye(n),
    l = ye(r),
    a = () => {
      t &&
        (i
          ? ((o.value = t.innerWidth), (l.value = t.innerHeight))
          : ((o.value = t.document.documentElement.clientWidth),
            (l.value = t.document.documentElement.clientHeight)));
    };
  if ((a(), Af(a), yr('resize', a, { passive: !0 }), s)) {
    const c = Tf('(orientation: portrait)');
    Ne(c, () => a());
  }
  return { width: o, height: l };
}
const el = De({
  name: 'OnClickOutside',
  props: ['as', 'options'],
  emits: ['trigger'],
  setup(e, { slots: t, emit: n }) {
    const r = ye();
    return (
      Pf(
        r,
        s => {
          n('trigger', s);
        },
        e.options
      ),
      () => {
        if (t.default) return Xa(e.as || 'div', { ref: r }, t.default());
      }
    );
  },
});
function Nf(e) {
  var t;
  const n = Ke(e);
  return (t = n == null ? void 0 : n.$el) != null ? t : n;
}
const Ff = bi ? window : void 0;
function kf(...e) {
  let t, n, r, s;
  if (
    (typeof e[0] == 'string' || Array.isArray(e[0])
      ? (([n, r, s] = e), (t = Ff))
      : ([t, n, r, s] = e),
    !t)
  )
    return _n;
  Array.isArray(n) || (n = [n]), Array.isArray(r) || (r = [r]);
  const i = [],
    o = () => {
      i.forEach(u => u()), (i.length = 0);
    },
    l = (u, d, h, v) => (
      u.addEventListener(d, h, v), () => u.removeEventListener(d, h, v)
    ),
    a = Ne(
      () => [Nf(t), Ke(s)],
      ([u, d]) => {
        if ((o(), !u)) return;
        const h = Ya(d) ? { ...d } : d;
        i.push(...n.flatMap(v => r.map(g => l(u, v, g, h))));
      },
      { immediate: !0, flush: 'post' }
    ),
    c = () => {
      a(), o();
    };
  return Jr(c), c;
}
function ps(e) {
  return typeof Window < 'u' && e instanceof Window
    ? e.document.documentElement
    : typeof Document < 'u' && e instanceof Document
      ? e.documentElement
      : e;
}
function tl(e) {
  const t = window.getComputedStyle(e);
  if (
    t.overflowX === 'scroll' ||
    t.overflowY === 'scroll' ||
    (t.overflowX === 'auto' && e.clientWidth < e.scrollWidth) ||
    (t.overflowY === 'auto' && e.clientHeight < e.scrollHeight)
  )
    return !0;
  {
    const n = e.parentNode;
    return !n || n.tagName === 'BODY' ? !1 : tl(n);
  }
}
function Df(e) {
  const t = e || window.event,
    n = t.target;
  return tl(n)
    ? !1
    : t.touches.length > 1
      ? !0
      : (t.preventDefault && t.preventDefault(), !1);
}
const vs = new WeakMap();
function jf(e, t = !1) {
  const n = ye(t);
  let r = null,
    s = '';
  Ne(
    xf(e),
    l => {
      const a = ps(Ke(l));
      if (a) {
        const c = a;
        if (
          (vs.get(c) || vs.set(c, c.style.overflow),
          c.style.overflow !== 'hidden' && (s = c.style.overflow),
          c.style.overflow === 'hidden')
        )
          return (n.value = !0);
        if (n.value) return (c.style.overflow = 'hidden');
      }
    },
    { immediate: !0 }
  );
  const i = () => {
      const l = ps(Ke(e));
      !l ||
        n.value ||
        (Ns &&
          (r = kf(
            l,
            'touchmove',
            a => {
              Df(a);
            },
            { passive: !1 }
          )),
        (l.style.overflow = 'hidden'),
        (n.value = !0));
    },
    o = () => {
      const l = ps(Ke(e));
      !l ||
        !n.value ||
        (Ns && (r == null || r()),
        (l.style.overflow = s),
        vs.delete(l),
        (n.value = !1));
    };
  return (
    Jr(o),
    ee({
      get() {
        return n.value;
      },
      set(l) {
        l ? i() : o();
      },
    })
  );
}
function Uf() {
  let e = !1;
  const t = ye(!1);
  return (n, r) => {
    if (((t.value = r.value), e)) return;
    e = !0;
    const s = jf(n, r.value);
    Ne(t, i => (s.value = i));
  };
}
Uf();
const Ae = (e, t) => {
    const n = e.__vccOpts || e;
    for (const [r, s] of t) n[r] = s;
    return n;
  },
  Vf = {},
  Qf = {
    xmlns: 'http://www.w3.org/2000/svg',
    'xmlns:xlink': 'http://www.w3.org/1999/xlink',
    'aria-hidden': 'true',
    role: 'img',
    class: 'iconify iconify--bi',
    preserveAspectRatio: 'xMidYMid meet',
    viewBox: '0 0 16 16',
  },
  qf = w(
    'path',
    {
      fill: 'currentColor',
      'fill-rule': 'evenodd',
      d: 'M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z',
    },
    null,
    -1
  ),
  zf = [qf];
function Gf(e, t) {
  return U(), Z('svg', Qf, zf);
}
const Hf = Ae(Vf, [['render', Gf]]);
function At(e) {
  return Array.isArray ? Array.isArray(e) : sl(e) === '[object Array]';
}
const Kf = 1 / 0;
function Bf(e) {
  if (typeof e == 'string') return e;
  let t = e + '';
  return t == '0' && 1 / e == -Kf ? '-0' : t;
}
function Wf(e) {
  return e == null ? '' : Bf(e);
}
function Et(e) {
  return typeof e == 'string';
}
function nl(e) {
  return typeof e == 'number';
}
function Jf(e) {
  return e === !0 || e === !1 || (Xf(e) && sl(e) == '[object Boolean]');
}
function rl(e) {
  return typeof e == 'object';
}
function Xf(e) {
  return rl(e) && e !== null;
}
function nt(e) {
  return e != null;
}
function gs(e) {
  return !e.trim().length;
}
function sl(e) {
  return e == null
    ? e === void 0
      ? '[object Undefined]'
      : '[object Null]'
    : Object.prototype.toString.call(e);
}
const Zf = "Incorrect 'index' type",
  Yf = e => `Invalid value for key ${e}`,
  ed = e => `Pattern length exceeds max of ${e}.`,
  td = e => `Missing ${e} property in key`,
  nd = e => `Property 'weight' in key '${e}' must be a positive integer`,
  Eo = Object.prototype.hasOwnProperty;
class rd {
  constructor(t) {
    (this._keys = []), (this._keyMap = {});
    let n = 0;
    t.forEach(r => {
      let s = il(r);
      this._keys.push(s), (this._keyMap[s.id] = s), (n += s.weight);
    }),
      this._keys.forEach(r => {
        r.weight /= n;
      });
  }
  get(t) {
    return this._keyMap[t];
  }
  keys() {
    return this._keys;
  }
  toJSON() {
    return JSON.stringify(this._keys);
  }
}
function il(e) {
  let t = null,
    n = null,
    r = null,
    s = 1,
    i = null;
  if (Et(e) || At(e)) (r = e), (t = wo(e)), (n = Fs(e));
  else {
    if (!Eo.call(e, 'name')) throw new Error(td('name'));
    const o = e.name;
    if (((r = o), Eo.call(e, 'weight') && ((s = e.weight), s <= 0)))
      throw new Error(nd(o));
    (t = wo(o)), (n = Fs(o)), (i = e.getFn);
  }
  return { path: t, id: n, weight: s, src: r, getFn: i };
}
function wo(e) {
  return At(e) ? e : e.split('.');
}
function Fs(e) {
  return At(e) ? e.join('.') : e;
}
function sd(e, t) {
  let n = [],
    r = !1;
  const s = (i, o, l) => {
    if (nt(i))
      if (!o[l]) n.push(i);
      else {
        let a = o[l];
        const c = i[a];
        if (!nt(c)) return;
        if (l === o.length - 1 && (Et(c) || nl(c) || Jf(c))) n.push(Wf(c));
        else if (At(c)) {
          r = !0;
          for (let u = 0, d = c.length; u < d; u += 1) s(c[u], o, l + 1);
        } else o.length && s(c, o, l + 1);
      }
  };
  return s(e, Et(t) ? t.split('.') : t, 0), r ? n : n[0];
}
const id = { includeMatches: !1, findAllMatches: !1, minMatchCharLength: 1 },
  od = {
    isCaseSensitive: !1,
    includeScore: !1,
    keys: [],
    shouldSort: !0,
    sortFn: (e, t) =>
      e.score === t.score
        ? e.idx < t.idx
          ? -1
          : 1
        : e.score < t.score
          ? -1
          : 1,
  },
  ad = { location: 0, threshold: 0.6, distance: 100 },
  ld = {
    useExtendedSearch: !1,
    getFn: sd,
    ignoreLocation: !1,
    ignoreFieldNorm: !1,
    fieldNormWeight: 1,
  };
var pe = { ...od, ...id, ...ad, ...ld };
const cd = /[^ ]+/g;
function ud(e = 1, t = 3) {
  const n = new Map(),
    r = Math.pow(10, t);
  return {
    get(s) {
      const i = s.match(cd).length;
      if (n.has(i)) return n.get(i);
      const o = 1 / Math.pow(i, 0.5 * e),
        l = parseFloat(Math.round(o * r) / r);
      return n.set(i, l), l;
    },
    clear() {
      n.clear();
    },
  };
}
class Ci {
  constructor({
    getFn: t = pe.getFn,
    fieldNormWeight: n = pe.fieldNormWeight,
  } = {}) {
    (this.norm = ud(n, 3)),
      (this.getFn = t),
      (this.isCreated = !1),
      this.setIndexRecords();
  }
  setSources(t = []) {
    this.docs = t;
  }
  setIndexRecords(t = []) {
    this.records = t;
  }
  setKeys(t = []) {
    (this.keys = t),
      (this._keysMap = {}),
      t.forEach((n, r) => {
        this._keysMap[n.id] = r;
      });
  }
  create() {
    this.isCreated ||
      !this.docs.length ||
      ((this.isCreated = !0),
      Et(this.docs[0])
        ? this.docs.forEach((t, n) => {
            this._addString(t, n);
          })
        : this.docs.forEach((t, n) => {
            this._addObject(t, n);
          }),
      this.norm.clear());
  }
  add(t) {
    const n = this.size();
    Et(t) ? this._addString(t, n) : this._addObject(t, n);
  }
  removeAt(t) {
    this.records.splice(t, 1);
    for (let n = t, r = this.size(); n < r; n += 1) this.records[n].i -= 1;
  }
  getValueForItemAtKeyId(t, n) {
    return t[this._keysMap[n]];
  }
  size() {
    return this.records.length;
  }
  _addString(t, n) {
    if (!nt(t) || gs(t)) return;
    let r = { v: t, i: n, n: this.norm.get(t) };
    this.records.push(r);
  }
  _addObject(t, n) {
    let r = { i: n, $: {} };
    this.keys.forEach((s, i) => {
      let o = s.getFn ? s.getFn(t) : this.getFn(t, s.path);
      if (nt(o)) {
        if (At(o)) {
          let l = [];
          const a = [{ nestedArrIndex: -1, value: o }];
          for (; a.length; ) {
            const { nestedArrIndex: c, value: u } = a.pop();
            if (nt(u))
              if (Et(u) && !gs(u)) {
                let d = { v: u, i: c, n: this.norm.get(u) };
                l.push(d);
              } else
                At(u) &&
                  u.forEach((d, h) => {
                    a.push({ nestedArrIndex: h, value: d });
                  });
          }
          r.$[i] = l;
        } else if (Et(o) && !gs(o)) {
          let l = { v: o, n: this.norm.get(o) };
          r.$[i] = l;
        }
      }
    }),
      this.records.push(r);
  }
  toJSON() {
    return { keys: this.keys, records: this.records };
  }
}
function ol(
  e,
  t,
  { getFn: n = pe.getFn, fieldNormWeight: r = pe.fieldNormWeight } = {}
) {
  const s = new Ci({ getFn: n, fieldNormWeight: r });
  return s.setKeys(e.map(il)), s.setSources(t), s.create(), s;
}
function fd(
  e,
  { getFn: t = pe.getFn, fieldNormWeight: n = pe.fieldNormWeight } = {}
) {
  const { keys: r, records: s } = e,
    i = new Ci({ getFn: t, fieldNormWeight: n });
  return i.setKeys(r), i.setIndexRecords(s), i;
}
function ar(
  e,
  {
    errors: t = 0,
    currentLocation: n = 0,
    expectedLocation: r = 0,
    distance: s = pe.distance,
    ignoreLocation: i = pe.ignoreLocation,
  } = {}
) {
  const o = t / e.length;
  if (i) return o;
  const l = Math.abs(r - n);
  return s ? o + l / s : l ? 1 : o;
}
function dd(e = [], t = pe.minMatchCharLength) {
  let n = [],
    r = -1,
    s = -1,
    i = 0;
  for (let o = e.length; i < o; i += 1) {
    let l = e[i];
    l && r === -1
      ? (r = i)
      : !l &&
        r !== -1 &&
        ((s = i - 1), s - r + 1 >= t && n.push([r, s]), (r = -1));
  }
  return e[i - 1] && i - r >= t && n.push([r, i - 1]), n;
}
const rn = 32;
function hd(
  e,
  t,
  n,
  {
    location: r = pe.location,
    distance: s = pe.distance,
    threshold: i = pe.threshold,
    findAllMatches: o = pe.findAllMatches,
    minMatchCharLength: l = pe.minMatchCharLength,
    includeMatches: a = pe.includeMatches,
    ignoreLocation: c = pe.ignoreLocation,
  } = {}
) {
  if (t.length > rn) throw new Error(ed(rn));
  const u = t.length,
    d = e.length,
    h = Math.max(0, Math.min(r, d));
  let v = i,
    g = h;
  const I = l > 1 || a,
    W = I ? Array(d) : [];
  let F;
  for (; (F = e.indexOf(t, g)) > -1; ) {
    let Y = ar(t, {
      currentLocation: F,
      expectedLocation: h,
      distance: s,
      ignoreLocation: c,
    });
    if (((v = Math.min(Y, v)), (g = F + u), I)) {
      let Q = 0;
      for (; Q < u; ) (W[F + Q] = 1), (Q += 1);
    }
  }
  g = -1;
  let q = [],
    k = 1,
    oe = u + d;
  const K = 1 << (u - 1);
  for (let Y = 0; Y < u; Y += 1) {
    let Q = 0,
      B = oe;
    for (; Q < B; )
      ar(t, {
        errors: Y,
        currentLocation: h + B,
        expectedLocation: h,
        distance: s,
        ignoreLocation: c,
      }) <= v
        ? (Q = B)
        : (oe = B),
        (B = Math.floor((oe - Q) / 2 + Q));
    oe = B;
    let G = Math.max(1, h - B + 1),
      ue = o ? d : Math.min(h + B, d) + u,
      z = Array(ue + 2);
    z[ue + 1] = (1 << Y) - 1;
    for (let S = ue; S >= G; S -= 1) {
      let R = S - 1,
        N = n[e.charAt(R)];
      if (
        (I && (W[R] = +!!N),
        (z[S] = ((z[S + 1] << 1) | 1) & N),
        Y && (z[S] |= ((q[S + 1] | q[S]) << 1) | 1 | q[S + 1]),
        z[S] & K &&
          ((k = ar(t, {
            errors: Y,
            currentLocation: R,
            expectedLocation: h,
            distance: s,
            ignoreLocation: c,
          })),
          k <= v))
      ) {
        if (((v = k), (g = R), g <= h)) break;
        G = Math.max(1, 2 * h - g);
      }
    }
    if (
      ar(t, {
        errors: Y + 1,
        currentLocation: h,
        expectedLocation: h,
        distance: s,
        ignoreLocation: c,
      }) > v
    )
      break;
    q = z;
  }
  const A = { isMatch: g >= 0, score: Math.max(0.001, k) };
  if (I) {
    const Y = dd(W, l);
    Y.length ? a && (A.indices = Y) : (A.isMatch = !1);
  }
  return A;
}
function pd(e) {
  let t = {};
  for (let n = 0, r = e.length; n < r; n += 1) {
    const s = e.charAt(n);
    t[s] = (t[s] || 0) | (1 << (r - n - 1));
  }
  return t;
}
class al {
  constructor(
    t,
    {
      location: n = pe.location,
      threshold: r = pe.threshold,
      distance: s = pe.distance,
      includeMatches: i = pe.includeMatches,
      findAllMatches: o = pe.findAllMatches,
      minMatchCharLength: l = pe.minMatchCharLength,
      isCaseSensitive: a = pe.isCaseSensitive,
      ignoreLocation: c = pe.ignoreLocation,
    } = {}
  ) {
    if (
      ((this.options = {
        location: n,
        threshold: r,
        distance: s,
        includeMatches: i,
        findAllMatches: o,
        minMatchCharLength: l,
        isCaseSensitive: a,
        ignoreLocation: c,
      }),
      (this.pattern = a ? t : t.toLowerCase()),
      (this.chunks = []),
      !this.pattern.length)
    )
      return;
    const u = (h, v) => {
        this.chunks.push({ pattern: h, alphabet: pd(h), startIndex: v });
      },
      d = this.pattern.length;
    if (d > rn) {
      let h = 0;
      const v = d % rn,
        g = d - v;
      for (; h < g; ) u(this.pattern.substr(h, rn), h), (h += rn);
      if (v) {
        const I = d - rn;
        u(this.pattern.substr(I), I);
      }
    } else u(this.pattern, 0);
  }
  searchIn(t) {
    const { isCaseSensitive: n, includeMatches: r } = this.options;
    if ((n || (t = t.toLowerCase()), this.pattern === t)) {
      let g = { isMatch: !0, score: 0 };
      return r && (g.indices = [[0, t.length - 1]]), g;
    }
    const {
      location: s,
      distance: i,
      threshold: o,
      findAllMatches: l,
      minMatchCharLength: a,
      ignoreLocation: c,
    } = this.options;
    let u = [],
      d = 0,
      h = !1;
    this.chunks.forEach(({ pattern: g, alphabet: I, startIndex: W }) => {
      const {
        isMatch: F,
        score: q,
        indices: k,
      } = hd(t, g, I, {
        location: s + W,
        distance: i,
        threshold: o,
        findAllMatches: l,
        minMatchCharLength: a,
        includeMatches: r,
        ignoreLocation: c,
      });
      F && (h = !0), (d += q), F && k && (u = [...u, ...k]);
    });
    let v = { isMatch: h, score: h ? d / this.chunks.length : 1 };
    return h && r && (v.indices = u), v;
  }
}
class Kt {
  constructor(t) {
    this.pattern = t;
  }
  static isMultiMatch(t) {
    return Oo(t, this.multiRegex);
  }
  static isSingleMatch(t) {
    return Oo(t, this.singleRegex);
  }
  search() {}
}
function Oo(e, t) {
  const n = e.match(t);
  return n ? n[1] : null;
}
class vd extends Kt {
  constructor(t) {
    super(t);
  }
  static get type() {
    return 'exact';
  }
  static get multiRegex() {
    return /^="(.*)"$/;
  }
  static get singleRegex() {
    return /^=(.*)$/;
  }
  search(t) {
    const n = t === this.pattern;
    return {
      isMatch: n,
      score: n ? 0 : 1,
      indices: [0, this.pattern.length - 1],
    };
  }
}
class gd extends Kt {
  constructor(t) {
    super(t);
  }
  static get type() {
    return 'inverse-exact';
  }
  static get multiRegex() {
    return /^!"(.*)"$/;
  }
  static get singleRegex() {
    return /^!(.*)$/;
  }
  search(t) {
    const r = t.indexOf(this.pattern) === -1;
    return { isMatch: r, score: r ? 0 : 1, indices: [0, t.length - 1] };
  }
}
class md extends Kt {
  constructor(t) {
    super(t);
  }
  static get type() {
    return 'prefix-exact';
  }
  static get multiRegex() {
    return /^\^"(.*)"$/;
  }
  static get singleRegex() {
    return /^\^(.*)$/;
  }
  search(t) {
    const n = t.startsWith(this.pattern);
    return {
      isMatch: n,
      score: n ? 0 : 1,
      indices: [0, this.pattern.length - 1],
    };
  }
}
class yd extends Kt {
  constructor(t) {
    super(t);
  }
  static get type() {
    return 'inverse-prefix-exact';
  }
  static get multiRegex() {
    return /^!\^"(.*)"$/;
  }
  static get singleRegex() {
    return /^!\^(.*)$/;
  }
  search(t) {
    const n = !t.startsWith(this.pattern);
    return { isMatch: n, score: n ? 0 : 1, indices: [0, t.length - 1] };
  }
}
class _d extends Kt {
  constructor(t) {
    super(t);
  }
  static get type() {
    return 'suffix-exact';
  }
  static get multiRegex() {
    return /^"(.*)"\$$/;
  }
  static get singleRegex() {
    return /^(.*)\$$/;
  }
  search(t) {
    const n = t.endsWith(this.pattern);
    return {
      isMatch: n,
      score: n ? 0 : 1,
      indices: [t.length - this.pattern.length, t.length - 1],
    };
  }
}
class bd extends Kt {
  constructor(t) {
    super(t);
  }
  static get type() {
    return 'inverse-suffix-exact';
  }
  static get multiRegex() {
    return /^!"(.*)"\$$/;
  }
  static get singleRegex() {
    return /^!(.*)\$$/;
  }
  search(t) {
    const n = !t.endsWith(this.pattern);
    return { isMatch: n, score: n ? 0 : 1, indices: [0, t.length - 1] };
  }
}
class ll extends Kt {
  constructor(
    t,
    {
      location: n = pe.location,
      threshold: r = pe.threshold,
      distance: s = pe.distance,
      includeMatches: i = pe.includeMatches,
      findAllMatches: o = pe.findAllMatches,
      minMatchCharLength: l = pe.minMatchCharLength,
      isCaseSensitive: a = pe.isCaseSensitive,
      ignoreLocation: c = pe.ignoreLocation,
    } = {}
  ) {
    super(t),
      (this._bitapSearch = new al(t, {
        location: n,
        threshold: r,
        distance: s,
        includeMatches: i,
        findAllMatches: o,
        minMatchCharLength: l,
        isCaseSensitive: a,
        ignoreLocation: c,
      }));
  }
  static get type() {
    return 'fuzzy';
  }
  static get multiRegex() {
    return /^"(.*)"$/;
  }
  static get singleRegex() {
    return /^(.*)$/;
  }
  search(t) {
    return this._bitapSearch.searchIn(t);
  }
}
class cl extends Kt {
  constructor(t) {
    super(t);
  }
  static get type() {
    return 'include';
  }
  static get multiRegex() {
    return /^'"(.*)"$/;
  }
  static get singleRegex() {
    return /^'(.*)$/;
  }
  search(t) {
    let n = 0,
      r;
    const s = [],
      i = this.pattern.length;
    for (; (r = t.indexOf(this.pattern, n)) > -1; )
      (n = r + i), s.push([r, n - 1]);
    const o = !!s.length;
    return { isMatch: o, score: o ? 0 : 1, indices: s };
  }
}
const ks = [vd, cl, md, yd, bd, _d, gd, ll],
  So = ks.length,
  Cd = / +(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/,
  Ed = '|';
function wd(e, t = {}) {
  return e.split(Ed).map(n => {
    let r = n
        .trim()
        .split(Cd)
        .filter(i => i && !!i.trim()),
      s = [];
    for (let i = 0, o = r.length; i < o; i += 1) {
      const l = r[i];
      let a = !1,
        c = -1;
      for (; !a && ++c < So; ) {
        const u = ks[c];
        let d = u.isMultiMatch(l);
        d && (s.push(new u(d, t)), (a = !0));
      }
      if (!a)
        for (c = -1; ++c < So; ) {
          const u = ks[c];
          let d = u.isSingleMatch(l);
          if (d) {
            s.push(new u(d, t));
            break;
          }
        }
    }
    return s;
  });
}
const Od = new Set([ll.type, cl.type]);
class Sd {
  constructor(
    t,
    {
      isCaseSensitive: n = pe.isCaseSensitive,
      includeMatches: r = pe.includeMatches,
      minMatchCharLength: s = pe.minMatchCharLength,
      ignoreLocation: i = pe.ignoreLocation,
      findAllMatches: o = pe.findAllMatches,
      location: l = pe.location,
      threshold: a = pe.threshold,
      distance: c = pe.distance,
    } = {}
  ) {
    (this.query = null),
      (this.options = {
        isCaseSensitive: n,
        includeMatches: r,
        minMatchCharLength: s,
        findAllMatches: o,
        ignoreLocation: i,
        location: l,
        threshold: a,
        distance: c,
      }),
      (this.pattern = n ? t : t.toLowerCase()),
      (this.query = wd(this.pattern, this.options));
  }
  static condition(t, n) {
    return n.useExtendedSearch;
  }
  searchIn(t) {
    const n = this.query;
    if (!n) return { isMatch: !1, score: 1 };
    const { includeMatches: r, isCaseSensitive: s } = this.options;
    t = s ? t : t.toLowerCase();
    let i = 0,
      o = [],
      l = 0;
    for (let a = 0, c = n.length; a < c; a += 1) {
      const u = n[a];
      (o.length = 0), (i = 0);
      for (let d = 0, h = u.length; d < h; d += 1) {
        const v = u[d],
          { isMatch: g, indices: I, score: W } = v.search(t);
        if (g) {
          if (((i += 1), (l += W), r)) {
            const F = v.constructor.type;
            Od.has(F) ? (o = [...o, ...I]) : o.push(I);
          }
        } else {
          (l = 0), (i = 0), (o.length = 0);
          break;
        }
      }
      if (i) {
        let d = { isMatch: !0, score: l / i };
        return r && (d.indices = o), d;
      }
    }
    return { isMatch: !1, score: 1 };
  }
}
const Ds = [];
function Id(...e) {
  Ds.push(...e);
}
function js(e, t) {
  for (let n = 0, r = Ds.length; n < r; n += 1) {
    let s = Ds[n];
    if (s.condition(e, t)) return new s(e, t);
  }
  return new al(e, t);
}
const xr = { AND: '$and', OR: '$or' },
  Us = { PATH: '$path', PATTERN: '$val' },
  Vs = e => !!(e[xr.AND] || e[xr.OR]),
  $d = e => !!e[Us.PATH],
  xd = e => !At(e) && rl(e) && !Vs(e),
  Io = e => ({ [xr.AND]: Object.keys(e).map(t => ({ [t]: e[t] })) });
function ul(e, t, { auto: n = !0 } = {}) {
  const r = s => {
    let i = Object.keys(s);
    const o = $d(s);
    if (!o && i.length > 1 && !Vs(s)) return r(Io(s));
    if (xd(s)) {
      const a = o ? s[Us.PATH] : i[0],
        c = o ? s[Us.PATTERN] : s[a];
      if (!Et(c)) throw new Error(Yf(a));
      const u = { keyId: Fs(a), pattern: c };
      return n && (u.searcher = js(c, t)), u;
    }
    let l = { children: [], operator: i[0] };
    return (
      i.forEach(a => {
        const c = s[a];
        At(c) &&
          c.forEach(u => {
            l.children.push(r(u));
          });
      }),
      l
    );
  };
  return Vs(e) || (e = Io(e)), r(e);
}
function Ad(e, { ignoreFieldNorm: t = pe.ignoreFieldNorm }) {
  e.forEach(n => {
    let r = 1;
    n.matches.forEach(({ key: s, norm: i, score: o }) => {
      const l = s ? s.weight : null;
      r *= Math.pow(o === 0 && l ? Number.EPSILON : o, (l || 1) * (t ? 1 : i));
    }),
      (n.score = r);
  });
}
function Pd(e, t) {
  const n = e.matches;
  (t.matches = []),
    nt(n) &&
      n.forEach(r => {
        if (!nt(r.indices) || !r.indices.length) return;
        const { indices: s, value: i } = r;
        let o = { indices: s, value: i };
        r.key && (o.key = r.key.src),
          r.idx > -1 && (o.refIndex = r.idx),
          t.matches.push(o);
      });
}
function Ld(e, t) {
  t.score = e.score;
}
function Rd(
  e,
  t,
  {
    includeMatches: n = pe.includeMatches,
    includeScore: r = pe.includeScore,
  } = {}
) {
  const s = [];
  return (
    n && s.push(Pd),
    r && s.push(Ld),
    e.map(i => {
      const { idx: o } = i,
        l = { item: t[o], refIndex: o };
      return (
        s.length &&
          s.forEach(a => {
            a(i, l);
          }),
        l
      );
    })
  );
}
class On {
  constructor(t, n = {}, r) {
    (this.options = { ...pe, ...n }),
      this.options.useExtendedSearch,
      (this._keyStore = new rd(this.options.keys)),
      this.setCollection(t, r);
  }
  setCollection(t, n) {
    if (((this._docs = t), n && !(n instanceof Ci))) throw new Error(Zf);
    this._myIndex =
      n ||
      ol(this.options.keys, this._docs, {
        getFn: this.options.getFn,
        fieldNormWeight: this.options.fieldNormWeight,
      });
  }
  add(t) {
    nt(t) && (this._docs.push(t), this._myIndex.add(t));
  }
  remove(t = () => !1) {
    const n = [];
    for (let r = 0, s = this._docs.length; r < s; r += 1) {
      const i = this._docs[r];
      t(i, r) && (this.removeAt(r), (r -= 1), (s -= 1), n.push(i));
    }
    return n;
  }
  removeAt(t) {
    this._docs.splice(t, 1), this._myIndex.removeAt(t);
  }
  getIndex() {
    return this._myIndex;
  }
  search(t, { limit: n = -1 } = {}) {
    const {
      includeMatches: r,
      includeScore: s,
      shouldSort: i,
      sortFn: o,
      ignoreFieldNorm: l,
    } = this.options;
    let a = Et(t)
      ? Et(this._docs[0])
        ? this._searchStringList(t)
        : this._searchObjectList(t)
      : this._searchLogical(t);
    return (
      Ad(a, { ignoreFieldNorm: l }),
      i && a.sort(o),
      nl(n) && n > -1 && (a = a.slice(0, n)),
      Rd(a, this._docs, { includeMatches: r, includeScore: s })
    );
  }
  _searchStringList(t) {
    const n = js(t, this.options),
      { records: r } = this._myIndex,
      s = [];
    return (
      r.forEach(({ v: i, i: o, n: l }) => {
        if (!nt(i)) return;
        const { isMatch: a, score: c, indices: u } = n.searchIn(i);
        a &&
          s.push({
            item: i,
            idx: o,
            matches: [{ score: c, value: i, norm: l, indices: u }],
          });
      }),
      s
    );
  }
  _searchLogical(t) {
    const n = ul(t, this.options),
      r = (l, a, c) => {
        if (!l.children) {
          const { keyId: d, searcher: h } = l,
            v = this._findMatches({
              key: this._keyStore.get(d),
              value: this._myIndex.getValueForItemAtKeyId(a, d),
              searcher: h,
            });
          return v && v.length ? [{ idx: c, item: a, matches: v }] : [];
        }
        const u = [];
        for (let d = 0, h = l.children.length; d < h; d += 1) {
          const v = l.children[d],
            g = r(v, a, c);
          if (g.length) u.push(...g);
          else if (l.operator === xr.AND) return [];
        }
        return u;
      },
      s = this._myIndex.records,
      i = {},
      o = [];
    return (
      s.forEach(({ $: l, i: a }) => {
        if (nt(l)) {
          let c = r(n, l, a);
          c.length &&
            (i[a] || ((i[a] = { idx: a, item: l, matches: [] }), o.push(i[a])),
            c.forEach(({ matches: u }) => {
              i[a].matches.push(...u);
            }));
        }
      }),
      o
    );
  }
  _searchObjectList(t) {
    const n = js(t, this.options),
      { keys: r, records: s } = this._myIndex,
      i = [];
    return (
      s.forEach(({ $: o, i: l }) => {
        if (!nt(o)) return;
        let a = [];
        r.forEach((c, u) => {
          a.push(...this._findMatches({ key: c, value: o[u], searcher: n }));
        }),
          a.length && i.push({ idx: l, item: o, matches: a });
      }),
      i
    );
  }
  _findMatches({ key: t, value: n, searcher: r }) {
    if (!nt(n)) return [];
    let s = [];
    if (At(n))
      n.forEach(({ v: i, i: o, n: l }) => {
        if (!nt(i)) return;
        const { isMatch: a, score: c, indices: u } = r.searchIn(i);
        a &&
          s.push({ score: c, key: t, value: i, idx: o, norm: l, indices: u });
      });
    else {
      const { v: i, n: o } = n,
        { isMatch: l, score: a, indices: c } = r.searchIn(i);
      l && s.push({ score: a, key: t, value: i, norm: o, indices: c });
    }
    return s;
  }
}
On.version = '7.0.0';
On.createIndex = ol;
On.parseIndex = fd;
On.config = pe;
On.parseQuery = ul;
Id(Sd);
function fl(e, t, n) {
  const r = () => {
      var o, l;
      return new On(
        (o = Ke(t)) != null ? o : [],
        (l = Ke(n)) == null ? void 0 : l.fuseOptions
      );
    },
    s = ye(r());
  Ne(
    () => {
      var o;
      return (o = Ke(n)) == null ? void 0 : o.fuseOptions;
    },
    () => {
      s.value = r();
    },
    { deep: !0 }
  ),
    Ne(
      () => Ke(t),
      o => {
        s.value.setCollection(o);
      },
      { deep: !0 }
    );
  const i = ee(() => {
    const o = Ke(n);
    if (o != null && o.matchAllWhenSearchEmpty && !Ke(e))
      return Ke(t).map((a, c) => ({ item: a, refIndex: c }));
    const l = o == null ? void 0 : o.resultLimit;
    return s.value.search(Ke(e), l ? { limit: l } : void 0);
  });
  return { fuse: s, results: i };
}
const Td = ['value'],
  Md = De({
    __name: 'VInput',
    props: { modelValue: { type: [String, Number], required: !0 } },
    emits: ['update:modelValue'],
    setup(e) {
      return (t, n) => (
        U(),
        Z(
          'input',
          {
            class: 'w-full input h-[26px] px-2',
            autocomplete: 'off',
            spellcheck: 'false',
            value: e.modelValue,
            onInput:
              n[0] ||
              (n[0] = r => t.$emit('update:modelValue', r.target.value)),
          },
          null,
          40,
          Td
        )
      );
    },
  }),
  Nd = Ae(Md, [['__scopeId', 'data-v-933892bb']]),
  Fd = { class: 'absolute right-2 top-1/2 -mt-[6px] w-4 h-4' },
  kd = ['onClick', 'onMouseenter'],
  Dd = {
    key: 1,
    class:
      'grid h-6 cursor-pointer items-center px-2 font-medium transition-colors',
  },
  jd = De({
    __name: 'VSelect',
    props: {
      modelValue: { type: String, default: '' },
      id: { type: String, default: '' },
      formatPlaceholder: { type: Function },
      placeholder: { type: String },
      options: { type: Array, default: () => [], required: !0 },
    },
    emits: ['update:modelValue'],
    setup(e, { emit: t }) {
      const n = t,
        r = e,
        s = ye(),
        i = ye(),
        o = ye(-1),
        l = ye(''),
        a = ye(!1),
        c = ye(!1),
        { height: u } = Mf(),
        d = ee(() =>
          r.options.flatMap(Q =>
            typeof Q == 'string'
              ? Q
              : 'group' in Q
                ? Q.children.map(B =>
                    typeof B == 'string' ? B : { ...B, indent: !0 }
                  )
                : Q
          )
        ),
        h = ee(() => {
          if (!a.value || !i.value) return 'none';
          const Q = i.value.getBoundingClientRect(),
            B = u.value - 40 - (Q.bottom || 0);
          return B < 0 ? i.value.clientHeight + B : 'none';
        }),
        v = ee(() =>
          !a.value || !i.value
            ? 'none'
            : u.value - i.value.clientHeight < 0
              ? u.value / 2
              : 'none'
        ),
        g = ee(() =>
          !a.value || !s.value ? 'bottom' : h.value < 100 ? 'top' : 'bottom'
        ),
        I = ee(() => {
          let Q = 1;
          const B = [];
          for (const G of r.options) {
            if (typeof G == 'string') {
              Q++;
              continue;
            }
            if (!('group' in G)) {
              Q++;
              continue;
            }
            B.push({ index: Q, group: G.group, children: G.children }),
              (Q += G.children.length + 1);
          }
          return B;
        }),
        W = ee(() => d.value.find(Q => q(Q) === r.modelValue)),
        { results: F } = fl(l, d, {
          matchAllWhenSearchEmpty: !0,
          resultLimit: 10,
          fuseOptions: { fieldNormWeight: 3, keys: ['value'] },
        });
      function q(Q) {
        return typeof Q == 'string' ? Q : Q == null ? void 0 : Q.value;
      }
      function k(Q) {
        return r.formatPlaceholder
          ? r.formatPlaceholder(Q)
          : typeof Q == 'string'
            ? Q
            : (Q == null ? void 0 : Q.value) ?? r.placeholder;
      }
      function oe(Q) {
        return typeof Q == 'string' ? Q : Q == null ? void 0 : Q.label;
      }
      function K() {
        (o.value = -1), (a.value = !0), (c.value = !0);
      }
      function A() {
        (o.value = -1), (a.value = !1), (c.value = !1), (l.value = '');
      }
      function Y(Q) {
        n('update:modelValue', q(Q)), A();
      }
      return (Q, B) => (
        U(),
        Pe(
          J(el),
          { onTrigger: A },
          {
            default: Or(() => [
              w(
                'div',
                {
                  class: 'relative z-20',
                  onKeyup: Re(A, ['esc']),
                  ref_key: 'container',
                  ref: s,
                },
                [
                  _e(
                    Nd,
                    {
                      role: 'combobox',
                      id: e.id,
                      'aria-expanded': a.value,
                      type: 'text',
                      readonly: !a.value,
                      onClick: K,
                      onKeydown:
                        B[0] ||
                        (B[0] = G => {
                          if (
                            (G.stopPropagation(),
                            !(
                              !a.value &&
                              ![
                                'Enter',
                                'ArrowDown',
                                'ArrowUp',
                                'Space',
                              ].includes(G.code)
                            ))
                          ) {
                            if (!a.value && G.code !== 'Tab')
                              return G.preventDefault(), K();
                            switch (G.code) {
                              case 'Tab':
                                return A();
                              case 'ArrowDown':
                                o.value =
                                  o.value + 1 < J(F).length ? o.value + 1 : 0;
                                break;
                              case 'ArrowUp':
                                o.value =
                                  o.value - 1 >= 0
                                    ? o.value - 1
                                    : J(F).length - 1;
                                break;
                              case 'Enter':
                                return (
                                  o.value > -1
                                    ? Q.$emit(
                                        'update:modelValue',
                                        q(J(F)[o.value].item)
                                      )
                                    : J(F).length &&
                                      Q.$emit(
                                        'update:modelValue',
                                        q(J(F)[0].item)
                                      ),
                                  A()
                                );
                              case 'Escape':
                                return A();
                              default:
                                break;
                            }
                          }
                        }),
                      onKeyup: Re(A, ['esc']),
                      modelValue: l.value,
                      'onUpdate:modelValue':
                        B[1] || (B[1] = G => (l.value = G)),
                      class: Te([
                        'focus:outline-[color:var(--vscode-focusBorder)] placeholder-[color:var(--vscode-settings-textInputForeground, #999)] pr-6 overflow-ellipsis',
                        { 'cursor-pointer': !c.value },
                      ]),
                      placeholder: c.value ? 'Search' : k(W.value),
                    },
                    null,
                    8,
                    [
                      'id',
                      'aria-expanded',
                      'readonly',
                      'modelValue',
                      'placeholder',
                      'class',
                    ]
                  ),
                  w('div', Fd, [
                    _e(
                      Hf,
                      {
                        height: '12',
                        class: Te([
                          'pointer-events-none transition-transform',
                          { 'rotate-180': !c.value },
                        ]),
                      },
                      null,
                      8,
                      ['class']
                    ),
                  ]),
                  _e(
                    _i,
                    { appear: '' },
                    {
                      default: Or(() => [
                        a.value
                          ? (U(),
                            Z(
                              'div',
                              {
                                key: 0,
                                ref_key: 'dropdown',
                                ref: i,
                                class: Te([
                                  'absolute z-10 grid w-full overflow-auto dropdown bg-[color:var(--vscode-dropdown-background)] codesandbox:bg-[color:var(--vscode-settings-textInputBackground)] codesandbox:border-[color:var(--vscode-sideBySideEditor-horizontalBorder)] text-[color:var(--vscode-foreground)]',
                                  {
                                    'top-full': g.value === 'bottom',
                                    'bottom-full': g.value === 'top',
                                  },
                                ]),
                                style: ht({
                                  maxHeight: `${g.value === 'top' ? v.value : h.value}px`,
                                }),
                                onMouseleave:
                                  B[2] ||
                                  (B[2] = () => {
                                    o.value = -1;
                                  }),
                              },
                              [
                                (U(!0),
                                Z(
                                  Le,
                                  null,
                                  Cn(
                                    J(F),
                                    (G, ue) => (
                                      U(),
                                      Z(
                                        'div',
                                        {
                                          onClick: z => Y(G.item),
                                          class: Te([
                                            'relative grid h-6 cursor-pointer items-center px-2 transition-colors whitespace-nowrap border',
                                            {
                                              'bg-[color:var(--vscode-list-activeSelectionBackground)] text-[color:var(--vscode-list-activeSelectionForeground)] border-[color:var(--vscode-focusBorder)]':
                                                ue === o.value ||
                                                e.modelValue === q(G.item),
                                              'border-transparent':
                                                ue !== o.value,
                                              'pl-4':
                                                typeof G.item == 'object' &&
                                                G.item.indent &&
                                                !l.value,
                                            },
                                          ]),
                                          onMouseenter: z => (o.value = ue),
                                        },
                                        Ee(l.value ? q(G.item) : oe(G.item)),
                                        43,
                                        kd
                                      )
                                    )
                                  ),
                                  256
                                )),
                                l.value
                                  ? le('', !0)
                                  : (U(!0),
                                    Z(
                                      Le,
                                      { key: 0 },
                                      Cn(
                                        I.value,
                                        G => (
                                          U(),
                                          Z(
                                            'div',
                                            {
                                              key: G.group,
                                              class:
                                                'grid h-6 cursor-pointer items-center px-2 font-semibold transition-colors',
                                              style: ht({
                                                gridRowStart: G.index,
                                              }),
                                            },
                                            Ee(G.group),
                                            5
                                          )
                                        )
                                      ),
                                      128
                                    )),
                                J(F).length === 0
                                  ? (U(), Z('div', Dd, ' No results '))
                                  : le('', !0),
                              ],
                              38
                            ))
                          : le('', !0),
                      ]),
                      _: 1,
                    }
                  ),
                ],
                544
              ),
            ]),
            _: 1,
          }
        )
      );
    },
  }),
  Ei = Ae(jd, [['__scopeId', 'data-v-cb1c6b48']]);
var Se = (e => (
    (e[(e.Manage = 0)] = 'Manage'),
    (e[(e.Analyze = 1)] = 'Analyze'),
    (e[(e.Details = 2)] = 'Details'),
    e
  ))(Se || {}),
  Pn = (e => (
    (e[(e.Slow3G = 50)] = 'Slow3G'),
    (e[(e.Fast3G = 125)] = 'Fast3G'),
    (e[(e.Slow4G = 218.75)] = 'Slow4G'),
    (e[(e.Fast4G = 937.5)] = 'Fast4G'),
    e
  ))(Pn || {}),
  Qs = (e => (
    (e[(e.SuggestionsServiceIsNotResponding = 0)] =
      'SuggestionsServiceIsNotResponding'),
    e
  ))(Qs || {}),
  jt = (e => (
    (e[(e.Ascending = 0)] = 'Ascending'),
    (e[(e.Descending = 1)] = 'Descending'),
    e
  ))(jt || {}),
  vn = (e => (
    (e.Min = 'size'),
    (e.GZIP = 'gzip'),
    (e.Slow3G = 'threeG'),
    (e.Slow4G = 'fourG'),
    e
  ))(vn || {});
function Ud() {
  return dl().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function dl() {
  return typeof navigator < 'u' && typeof window < 'u'
    ? window
    : typeof globalThis < 'u'
      ? globalThis
      : {};
}
const Vd = typeof Proxy == 'function',
  Qd = 'devtools-plugin:setup',
  qd = 'plugin:settings:set';
let dn, qs;
function zd() {
  var e;
  return (
    dn !== void 0 ||
      (typeof window < 'u' && window.performance
        ? ((dn = !0), (qs = window.performance))
        : typeof globalThis < 'u' &&
            !((e = globalThis.perf_hooks) === null || e === void 0) &&
            e.performance
          ? ((dn = !0), (qs = globalThis.perf_hooks.performance))
          : (dn = !1)),
    dn
  );
}
function Gd() {
  return zd() ? qs.now() : Date.now();
}
class Hd {
  constructor(t, n) {
    (this.target = null),
      (this.targetQueue = []),
      (this.onQueue = []),
      (this.plugin = t),
      (this.hook = n);
    const r = {};
    if (t.settings)
      for (const o in t.settings) {
        const l = t.settings[o];
        r[o] = l.defaultValue;
      }
    const s = `__vue-devtools-plugin-settings__${t.id}`;
    let i = Object.assign({}, r);
    try {
      const o = localStorage.getItem(s),
        l = JSON.parse(o);
      Object.assign(i, l);
    } catch {}
    (this.fallbacks = {
      getSettings() {
        return i;
      },
      setSettings(o) {
        try {
          localStorage.setItem(s, JSON.stringify(o));
        } catch {}
        i = o;
      },
      now() {
        return Gd();
      },
    }),
      n &&
        n.on(qd, (o, l) => {
          o === this.plugin.id && this.fallbacks.setSettings(l);
        }),
      (this.proxiedOn = new Proxy(
        {},
        {
          get: (o, l) =>
            this.target
              ? this.target.on[l]
              : (...a) => {
                  this.onQueue.push({ method: l, args: a });
                },
        }
      )),
      (this.proxiedTarget = new Proxy(
        {},
        {
          get: (o, l) =>
            this.target
              ? this.target[l]
              : l === 'on'
                ? this.proxiedOn
                : Object.keys(this.fallbacks).includes(l)
                  ? (...a) => (
                      this.targetQueue.push({
                        method: l,
                        args: a,
                        resolve: () => {},
                      }),
                      this.fallbacks[l](...a)
                    )
                  : (...a) =>
                      new Promise(c => {
                        this.targetQueue.push({
                          method: l,
                          args: a,
                          resolve: c,
                        });
                      }),
        }
      ));
  }
  async setRealTarget(t) {
    this.target = t;
    for (const n of this.onQueue) this.target.on[n.method](...n.args);
    for (const n of this.targetQueue)
      n.resolve(await this.target[n.method](...n.args));
  }
}
function Kd(e, t) {
  const n = e,
    r = dl(),
    s = Ud(),
    i = Vd && n.enableEarlyProxy;
  if (s && (r.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !i)) s.emit(Qd, e, t);
  else {
    const o = i ? new Hd(n, s) : null;
    (r.__VUE_DEVTOOLS_PLUGINS__ = r.__VUE_DEVTOOLS_PLUGINS__ || []).push({
      pluginDescriptor: n,
      setupFn: t,
      proxy: o,
    }),
      o && t(o.proxiedTarget);
  }
}
/*!
 * vuex v4.1.0
 * (c) 2022 Evan You
 * @license MIT
 */ var hl = 'store';
function Bd(e) {
  return e === void 0 && (e = null), $t(e !== null ? e : hl);
}
function Sn(e, t) {
  Object.keys(e).forEach(function (n) {
    return t(e[n], n);
  });
}
function Wd(e) {
  return e !== null && typeof e == 'object';
}
function Jd(e) {
  return e && typeof e.then == 'function';
}
function Xd(e, t) {
  return function () {
    return e(t);
  };
}
function pl(e, t, n) {
  return (
    t.indexOf(e) < 0 && (n && n.prepend ? t.unshift(e) : t.push(e)),
    function () {
      var r = t.indexOf(e);
      r > -1 && t.splice(r, 1);
    }
  );
}
function vl(e, t) {
  (e._actions = Object.create(null)),
    (e._mutations = Object.create(null)),
    (e._wrappedGetters = Object.create(null)),
    (e._modulesNamespaceMap = Object.create(null));
  var n = e.state;
  Zr(e, n, [], e._modules.root, !0), wi(e, n, t);
}
function wi(e, t, n) {
  var r = e._state,
    s = e._scope;
  (e.getters = {}), (e._makeLocalGettersCache = Object.create(null));
  var i = e._wrappedGetters,
    o = {},
    l = {},
    a = nc(!0);
  a.run(function () {
    Sn(i, function (c, u) {
      (o[u] = Xd(c, e)),
        (l[u] = ee(function () {
          return o[u]();
        })),
        Object.defineProperty(e.getters, u, {
          get: function () {
            return l[u].value;
          },
          enumerable: !0,
        });
    });
  }),
    (e._state = Kn({ data: t })),
    (e._scope = a),
    e.strict && nh(e),
    r &&
      n &&
      e._withCommit(function () {
        r.data = null;
      }),
    s && s.stop();
}
function Zr(e, t, n, r, s) {
  var i = !n.length,
    o = e._modules.getNamespace(n);
  if (
    (r.namespaced &&
      (e._modulesNamespaceMap[o], (e._modulesNamespaceMap[o] = r)),
    !i && !s)
  ) {
    var l = Oi(t, n.slice(0, -1)),
      a = n[n.length - 1];
    e._withCommit(function () {
      l[a] = r.state;
    });
  }
  var c = (r.context = Zd(e, o, n));
  r.forEachMutation(function (u, d) {
    var h = o + d;
    Yd(e, h, u, c);
  }),
    r.forEachAction(function (u, d) {
      var h = u.root ? d : o + d,
        v = u.handler || u;
      eh(e, h, v, c);
    }),
    r.forEachGetter(function (u, d) {
      var h = o + d;
      th(e, h, u, c);
    }),
    r.forEachChild(function (u, d) {
      Zr(e, t, n.concat(d), u, s);
    });
}
function Zd(e, t, n) {
  var r = t === '',
    s = {
      dispatch: r
        ? e.dispatch
        : function (i, o, l) {
            var a = Ar(i, o, l),
              c = a.payload,
              u = a.options,
              d = a.type;
            return (!u || !u.root) && (d = t + d), e.dispatch(d, c);
          },
      commit: r
        ? e.commit
        : function (i, o, l) {
            var a = Ar(i, o, l),
              c = a.payload,
              u = a.options,
              d = a.type;
            (!u || !u.root) && (d = t + d), e.commit(d, c, u);
          },
    };
  return (
    Object.defineProperties(s, {
      getters: {
        get: r
          ? function () {
              return e.getters;
            }
          : function () {
              return gl(e, t);
            },
      },
      state: {
        get: function () {
          return Oi(e.state, n);
        },
      },
    }),
    s
  );
}
function gl(e, t) {
  if (!e._makeLocalGettersCache[t]) {
    var n = {},
      r = t.length;
    Object.keys(e.getters).forEach(function (s) {
      if (s.slice(0, r) === t) {
        var i = s.slice(r);
        Object.defineProperty(n, i, {
          get: function () {
            return e.getters[s];
          },
          enumerable: !0,
        });
      }
    }),
      (e._makeLocalGettersCache[t] = n);
  }
  return e._makeLocalGettersCache[t];
}
function Yd(e, t, n, r) {
  var s = e._mutations[t] || (e._mutations[t] = []);
  s.push(function (o) {
    n.call(e, r.state, o);
  });
}
function eh(e, t, n, r) {
  var s = e._actions[t] || (e._actions[t] = []);
  s.push(function (o) {
    var l = n.call(
      e,
      {
        dispatch: r.dispatch,
        commit: r.commit,
        getters: r.getters,
        state: r.state,
        rootGetters: e.getters,
        rootState: e.state,
      },
      o
    );
    return (
      Jd(l) || (l = Promise.resolve(l)),
      e._devtoolHook
        ? l.catch(function (a) {
            throw (e._devtoolHook.emit('vuex:error', a), a);
          })
        : l
    );
  });
}
function th(e, t, n, r) {
  e._wrappedGetters[t] ||
    (e._wrappedGetters[t] = function (i) {
      return n(r.state, r.getters, i.state, i.getters);
    });
}
function nh(e) {
  Ne(
    function () {
      return e._state.data;
    },
    function () {},
    { deep: !0, flush: 'sync' }
  );
}
function Oi(e, t) {
  return t.reduce(function (n, r) {
    return n[r];
  }, e);
}
function Ar(e, t, n) {
  return (
    Wd(e) && e.type && ((n = t), (t = e), (e = e.type)),
    { type: e, payload: t, options: n }
  );
}
var rh = 'vuex bindings',
  $o = 'vuex:mutations',
  ms = 'vuex:actions',
  hn = 'vuex',
  sh = 0;
function ih(e, t) {
  Kd(
    {
      id: 'org.vuejs.vuex',
      app: e,
      label: 'Vuex',
      homepage: 'https://next.vuex.vuejs.org/',
      logo: 'https://vuejs.org/images/icons/favicon-96x96.png',
      packageName: 'vuex',
      componentStateTypes: [rh],
    },
    function (n) {
      n.addTimelineLayer({ id: $o, label: 'Vuex Mutations', color: xo }),
        n.addTimelineLayer({ id: ms, label: 'Vuex Actions', color: xo }),
        n.addInspector({
          id: hn,
          label: 'Vuex',
          icon: 'storage',
          treeFilterPlaceholder: 'Filter stores...',
        }),
        n.on.getInspectorTree(function (r) {
          if (r.app === e && r.inspectorId === hn)
            if (r.filter) {
              var s = [];
              bl(s, t._modules.root, r.filter, ''), (r.rootNodes = s);
            } else r.rootNodes = [_l(t._modules.root, '')];
        }),
        n.on.getInspectorState(function (r) {
          if (r.app === e && r.inspectorId === hn) {
            var s = r.nodeId;
            gl(t, s),
              (r.state = lh(
                uh(t._modules, s),
                s === 'root' ? t.getters : t._makeLocalGettersCache,
                s
              ));
          }
        }),
        n.on.editInspectorState(function (r) {
          if (r.app === e && r.inspectorId === hn) {
            var s = r.nodeId,
              i = r.path;
            s !== 'root' && (i = s.split('/').filter(Boolean).concat(i)),
              t._withCommit(function () {
                r.set(t._state.data, i, r.state.value);
              });
          }
        }),
        t.subscribe(function (r, s) {
          var i = {};
          r.payload && (i.payload = r.payload),
            (i.state = s),
            n.notifyComponentUpdate(),
            n.sendInspectorTree(hn),
            n.sendInspectorState(hn),
            n.addTimelineEvent({
              layerId: $o,
              event: { time: Date.now(), title: r.type, data: i },
            });
        }),
        t.subscribeAction({
          before: function (r, s) {
            var i = {};
            r.payload && (i.payload = r.payload),
              (r._id = sh++),
              (r._time = Date.now()),
              (i.state = s),
              n.addTimelineEvent({
                layerId: ms,
                event: {
                  time: r._time,
                  title: r.type,
                  groupId: r._id,
                  subtitle: 'start',
                  data: i,
                },
              });
          },
          after: function (r, s) {
            var i = {},
              o = Date.now() - r._time;
            (i.duration = {
              _custom: {
                type: 'duration',
                display: o + 'ms',
                tooltip: 'Action duration',
                value: o,
              },
            }),
              r.payload && (i.payload = r.payload),
              (i.state = s),
              n.addTimelineEvent({
                layerId: ms,
                event: {
                  time: Date.now(),
                  title: r.type,
                  groupId: r._id,
                  subtitle: 'end',
                  data: i,
                },
              });
          },
        });
    }
  );
}
var xo = 8702998,
  oh = 6710886,
  ah = 16777215,
  ml = { label: 'namespaced', textColor: ah, backgroundColor: oh };
function yl(e) {
  return e && e !== 'root' ? e.split('/').slice(-2, -1)[0] : 'Root';
}
function _l(e, t) {
  return {
    id: t || 'root',
    label: yl(t),
    tags: e.namespaced ? [ml] : [],
    children: Object.keys(e._children).map(function (n) {
      return _l(e._children[n], t + n + '/');
    }),
  };
}
function bl(e, t, n, r) {
  r.includes(n) &&
    e.push({
      id: r || 'root',
      label: r.endsWith('/') ? r.slice(0, r.length - 1) : r || 'Root',
      tags: t.namespaced ? [ml] : [],
    }),
    Object.keys(t._children).forEach(function (s) {
      bl(e, t._children[s], n, r + s + '/');
    });
}
function lh(e, t, n) {
  t = n === 'root' ? t : t[n];
  var r = Object.keys(t),
    s = {
      state: Object.keys(e.state).map(function (o) {
        return { key: o, editable: !0, value: e.state[o] };
      }),
    };
  if (r.length) {
    var i = ch(t);
    s.getters = Object.keys(i).map(function (o) {
      return {
        key: o.endsWith('/') ? yl(o) : o,
        editable: !1,
        value: zs(function () {
          return i[o];
        }),
      };
    });
  }
  return s;
}
function ch(e) {
  var t = {};
  return (
    Object.keys(e).forEach(function (n) {
      var r = n.split('/');
      if (r.length > 1) {
        var s = t,
          i = r.pop();
        r.forEach(function (o) {
          s[o] ||
            (s[o] = {
              _custom: {
                value: {},
                display: o,
                tooltip: 'Module',
                abstract: !0,
              },
            }),
            (s = s[o]._custom.value);
        }),
          (s[i] = zs(function () {
            return e[n];
          }));
      } else
        t[n] = zs(function () {
          return e[n];
        });
    }),
    t
  );
}
function uh(e, t) {
  var n = t.split('/').filter(function (r) {
    return r;
  });
  return n.reduce(
    function (r, s, i) {
      var o = r[s];
      if (!o)
        throw new Error('Missing module "' + s + '" for path "' + t + '".');
      return i === n.length - 1 ? o : o._children;
    },
    t === 'root' ? e : e.root._children
  );
}
function zs(e) {
  try {
    return e();
  } catch (t) {
    return t;
  }
}
var pt = function (t, n) {
    (this.runtime = n),
      (this._children = Object.create(null)),
      (this._rawModule = t);
    var r = t.state;
    this.state = (typeof r == 'function' ? r() : r) || {};
  },
  Cl = { namespaced: { configurable: !0 } };
Cl.namespaced.get = function () {
  return !!this._rawModule.namespaced;
};
pt.prototype.addChild = function (t, n) {
  this._children[t] = n;
};
pt.prototype.removeChild = function (t) {
  delete this._children[t];
};
pt.prototype.getChild = function (t) {
  return this._children[t];
};
pt.prototype.hasChild = function (t) {
  return t in this._children;
};
pt.prototype.update = function (t) {
  (this._rawModule.namespaced = t.namespaced),
    t.actions && (this._rawModule.actions = t.actions),
    t.mutations && (this._rawModule.mutations = t.mutations),
    t.getters && (this._rawModule.getters = t.getters);
};
pt.prototype.forEachChild = function (t) {
  Sn(this._children, t);
};
pt.prototype.forEachGetter = function (t) {
  this._rawModule.getters && Sn(this._rawModule.getters, t);
};
pt.prototype.forEachAction = function (t) {
  this._rawModule.actions && Sn(this._rawModule.actions, t);
};
pt.prototype.forEachMutation = function (t) {
  this._rawModule.mutations && Sn(this._rawModule.mutations, t);
};
Object.defineProperties(pt.prototype, Cl);
var cn = function (t) {
  this.register([], t, !1);
};
cn.prototype.get = function (t) {
  return t.reduce(function (n, r) {
    return n.getChild(r);
  }, this.root);
};
cn.prototype.getNamespace = function (t) {
  var n = this.root;
  return t.reduce(function (r, s) {
    return (n = n.getChild(s)), r + (n.namespaced ? s + '/' : '');
  }, '');
};
cn.prototype.update = function (t) {
  El([], this.root, t);
};
cn.prototype.register = function (t, n, r) {
  var s = this;
  r === void 0 && (r = !0);
  var i = new pt(n, r);
  if (t.length === 0) this.root = i;
  else {
    var o = this.get(t.slice(0, -1));
    o.addChild(t[t.length - 1], i);
  }
  n.modules &&
    Sn(n.modules, function (l, a) {
      s.register(t.concat(a), l, r);
    });
};
cn.prototype.unregister = function (t) {
  var n = this.get(t.slice(0, -1)),
    r = t[t.length - 1],
    s = n.getChild(r);
  s && s.runtime && n.removeChild(r);
};
cn.prototype.isRegistered = function (t) {
  var n = this.get(t.slice(0, -1)),
    r = t[t.length - 1];
  return n ? n.hasChild(r) : !1;
};
function El(e, t, n) {
  if ((t.update(n), n.modules))
    for (var r in n.modules) {
      if (!t.getChild(r)) return;
      El(e.concat(r), t.getChild(r), n.modules[r]);
    }
}
function fh(e) {
  return new Ye(e);
}
var Ye = function (t) {
    var n = this;
    t === void 0 && (t = {});
    var r = t.plugins;
    r === void 0 && (r = []);
    var s = t.strict;
    s === void 0 && (s = !1);
    var i = t.devtools;
    (this._committing = !1),
      (this._actions = Object.create(null)),
      (this._actionSubscribers = []),
      (this._mutations = Object.create(null)),
      (this._wrappedGetters = Object.create(null)),
      (this._modules = new cn(t)),
      (this._modulesNamespaceMap = Object.create(null)),
      (this._subscribers = []),
      (this._makeLocalGettersCache = Object.create(null)),
      (this._scope = null),
      (this._devtools = i);
    var o = this,
      l = this,
      a = l.dispatch,
      c = l.commit;
    (this.dispatch = function (h, v) {
      return a.call(o, h, v);
    }),
      (this.commit = function (h, v, g) {
        return c.call(o, h, v, g);
      }),
      (this.strict = s);
    var u = this._modules.root.state;
    Zr(this, u, [], this._modules.root),
      wi(this, u),
      r.forEach(function (d) {
        return d(n);
      });
  },
  Si = { state: { configurable: !0 } };
Ye.prototype.install = function (t, n) {
  t.provide(n || hl, this), (t.config.globalProperties.$store = this);
  var r = this._devtools !== void 0 ? this._devtools : !1;
  r && ih(t, this);
};
Si.state.get = function () {
  return this._state.data;
};
Si.state.set = function (e) {};
Ye.prototype.commit = function (t, n, r) {
  var s = this,
    i = Ar(t, n, r),
    o = i.type,
    l = i.payload,
    a = { type: o, payload: l },
    c = this._mutations[o];
  c &&
    (this._withCommit(function () {
      c.forEach(function (d) {
        d(l);
      });
    }),
    this._subscribers.slice().forEach(function (u) {
      return u(a, s.state);
    }));
};
Ye.prototype.dispatch = function (t, n) {
  var r = this,
    s = Ar(t, n),
    i = s.type,
    o = s.payload,
    l = { type: i, payload: o },
    a = this._actions[i];
  if (a) {
    try {
      this._actionSubscribers
        .slice()
        .filter(function (u) {
          return u.before;
        })
        .forEach(function (u) {
          return u.before(l, r.state);
        });
    } catch {}
    var c =
      a.length > 1
        ? Promise.all(
            a.map(function (u) {
              return u(o);
            })
          )
        : a[0](o);
    return new Promise(function (u, d) {
      c.then(
        function (h) {
          try {
            r._actionSubscribers
              .filter(function (v) {
                return v.after;
              })
              .forEach(function (v) {
                return v.after(l, r.state);
              });
          } catch {}
          u(h);
        },
        function (h) {
          try {
            r._actionSubscribers
              .filter(function (v) {
                return v.error;
              })
              .forEach(function (v) {
                return v.error(l, r.state, h);
              });
          } catch {}
          d(h);
        }
      );
    });
  }
};
Ye.prototype.subscribe = function (t, n) {
  return pl(t, this._subscribers, n);
};
Ye.prototype.subscribeAction = function (t, n) {
  var r = typeof t == 'function' ? { before: t } : t;
  return pl(r, this._actionSubscribers, n);
};
Ye.prototype.watch = function (t, n, r) {
  var s = this;
  return Ne(
    function () {
      return t(s.state, s.getters);
    },
    n,
    Object.assign({}, r)
  );
};
Ye.prototype.replaceState = function (t) {
  var n = this;
  this._withCommit(function () {
    n._state.data = t;
  });
};
Ye.prototype.registerModule = function (t, n, r) {
  r === void 0 && (r = {}),
    typeof t == 'string' && (t = [t]),
    this._modules.register(t, n),
    Zr(this, this.state, t, this._modules.get(t), r.preserveState),
    wi(this, this.state);
};
Ye.prototype.unregisterModule = function (t) {
  var n = this;
  typeof t == 'string' && (t = [t]),
    this._modules.unregister(t),
    this._withCommit(function () {
      var r = Oi(n.state, t.slice(0, -1));
      delete r[t[t.length - 1]];
    }),
    vl(this);
};
Ye.prototype.hasModule = function (t) {
  return typeof t == 'string' && (t = [t]), this._modules.isRegistered(t);
};
Ye.prototype.hotUpdate = function (t) {
  this._modules.update(t), vl(this, !0);
};
Ye.prototype._withCommit = function (t) {
  var n = this._committing;
  (this._committing = !0), t(), (this._committing = n);
};
Object.defineProperties(Ye.prototype, Si);
var dh =
  typeof globalThis < 'u'
    ? globalThis
    : typeof window < 'u'
      ? window
      : typeof global < 'u'
        ? global
        : typeof self < 'u'
          ? self
          : {};
function Yr(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, 'default')
    ? e.default
    : e;
}
var wl = { exports: {} };
/*! algoliasearch-lite.umd.js | 4.23.3 | © Algolia, inc. | https://github.com/algolia/algoliasearch-client-javascript */ (function (
  e,
  t
) {
  (function (n, r) {
    e.exports = r();
  })(dh, function () {
    function n(C, $, x) {
      return (
        $ in C
          ? Object.defineProperty(C, $, {
              value: x,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (C[$] = x),
        C
      );
    }
    function r(C, $) {
      var x = Object.keys(C);
      if (Object.getOwnPropertySymbols) {
        var j = Object.getOwnPropertySymbols(C);
        $ &&
          (j = j.filter(function (X) {
            return Object.getOwnPropertyDescriptor(C, X).enumerable;
          })),
          x.push.apply(x, j);
      }
      return x;
    }
    function s(C) {
      for (var $ = 1; $ < arguments.length; $++) {
        var x = arguments[$] != null ? arguments[$] : {};
        $ % 2
          ? r(Object(x), !0).forEach(function (j) {
              n(C, j, x[j]);
            })
          : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(C, Object.getOwnPropertyDescriptors(x))
            : r(Object(x)).forEach(function (j) {
                Object.defineProperty(
                  C,
                  j,
                  Object.getOwnPropertyDescriptor(x, j)
                );
              });
      }
      return C;
    }
    function i(C, $) {
      if (C == null) return {};
      var x,
        j,
        X = (function (p, m) {
          if (p == null) return {};
          var b,
            E,
            L = {},
            V = Object.keys(p);
          for (E = 0; E < V.length; E++)
            (b = V[E]), m.indexOf(b) >= 0 || (L[b] = p[b]);
          return L;
        })(C, $);
      if (Object.getOwnPropertySymbols) {
        var f = Object.getOwnPropertySymbols(C);
        for (j = 0; j < f.length; j++)
          (x = f[j]),
            $.indexOf(x) >= 0 ||
              (Object.prototype.propertyIsEnumerable.call(C, x) &&
                (X[x] = C[x]));
      }
      return X;
    }
    function o(C, $) {
      return (
        (function (x) {
          if (Array.isArray(x)) return x;
        })(C) ||
        (function (x, j) {
          if (
            Symbol.iterator in Object(x) ||
            Object.prototype.toString.call(x) === '[object Arguments]'
          ) {
            var X = [],
              f = !0,
              p = !1,
              m = void 0;
            try {
              for (
                var b, E = x[Symbol.iterator]();
                !(f = (b = E.next()).done) &&
                (X.push(b.value), !j || X.length !== j);
                f = !0
              );
            } catch (L) {
              (p = !0), (m = L);
            } finally {
              try {
                f || E.return == null || E.return();
              } finally {
                if (p) throw m;
              }
            }
            return X;
          }
        })(C, $) ||
        (function () {
          throw new TypeError(
            'Invalid attempt to destructure non-iterable instance'
          );
        })()
      );
    }
    function l(C) {
      return (
        (function ($) {
          if (Array.isArray($)) {
            for (var x = 0, j = new Array($.length); x < $.length; x++)
              j[x] = $[x];
            return j;
          }
        })(C) ||
        (function ($) {
          if (
            Symbol.iterator in Object($) ||
            Object.prototype.toString.call($) === '[object Arguments]'
          )
            return Array.from($);
        })(C) ||
        (function () {
          throw new TypeError(
            'Invalid attempt to spread non-iterable instance'
          );
        })()
      );
    }
    function a(C) {
      var $,
        x = 'algoliasearch-client-js-'.concat(C.key),
        j = function () {
          return $ === void 0 && ($ = C.localStorage || window.localStorage), $;
        },
        X = function () {
          return JSON.parse(j().getItem(x) || '{}');
        },
        f = function (m) {
          j().setItem(x, JSON.stringify(m));
        },
        p = function () {
          var m = C.timeToLive ? 1e3 * C.timeToLive : null,
            b = X(),
            E = Object.fromEntries(
              Object.entries(b).filter(function (V) {
                return o(V, 2)[1].timestamp !== void 0;
              })
            );
          if ((f(E), m)) {
            var L = Object.fromEntries(
              Object.entries(E).filter(function (V) {
                var T = o(V, 2)[1],
                  D = new Date().getTime();
                return !(T.timestamp + m < D);
              })
            );
            f(L);
          }
        };
      return {
        get: function (m, b) {
          var E =
            arguments.length > 2 && arguments[2] !== void 0
              ? arguments[2]
              : {
                  miss: function () {
                    return Promise.resolve();
                  },
                };
          return Promise.resolve()
            .then(function () {
              p();
              var L = JSON.stringify(m);
              return X()[L];
            })
            .then(function (L) {
              return Promise.all([L ? L.value : b(), L !== void 0]);
            })
            .then(function (L) {
              var V = o(L, 2),
                T = V[0],
                D = V[1];
              return Promise.all([T, D || E.miss(T)]);
            })
            .then(function (L) {
              return o(L, 1)[0];
            });
        },
        set: function (m, b) {
          return Promise.resolve().then(function () {
            var E = X();
            return (
              (E[JSON.stringify(m)] = {
                timestamp: new Date().getTime(),
                value: b,
              }),
              j().setItem(x, JSON.stringify(E)),
              b
            );
          });
        },
        delete: function (m) {
          return Promise.resolve().then(function () {
            var b = X();
            delete b[JSON.stringify(m)], j().setItem(x, JSON.stringify(b));
          });
        },
        clear: function () {
          return Promise.resolve().then(function () {
            j().removeItem(x);
          });
        },
      };
    }
    function c(C) {
      var $ = l(C.caches),
        x = $.shift();
      return x === void 0
        ? {
            get: function (j, X) {
              var f =
                  arguments.length > 2 && arguments[2] !== void 0
                    ? arguments[2]
                    : {
                        miss: function () {
                          return Promise.resolve();
                        },
                      },
                p = X();
              return p
                .then(function (m) {
                  return Promise.all([m, f.miss(m)]);
                })
                .then(function (m) {
                  return o(m, 1)[0];
                });
            },
            set: function (j, X) {
              return Promise.resolve(X);
            },
            delete: function (j) {
              return Promise.resolve();
            },
            clear: function () {
              return Promise.resolve();
            },
          }
        : {
            get: function (j, X) {
              var f =
                arguments.length > 2 && arguments[2] !== void 0
                  ? arguments[2]
                  : {
                      miss: function () {
                        return Promise.resolve();
                      },
                    };
              return x.get(j, X, f).catch(function () {
                return c({ caches: $ }).get(j, X, f);
              });
            },
            set: function (j, X) {
              return x.set(j, X).catch(function () {
                return c({ caches: $ }).set(j, X);
              });
            },
            delete: function (j) {
              return x.delete(j).catch(function () {
                return c({ caches: $ }).delete(j);
              });
            },
            clear: function () {
              return x.clear().catch(function () {
                return c({ caches: $ }).clear();
              });
            },
          };
    }
    function u() {
      var C =
          arguments.length > 0 && arguments[0] !== void 0
            ? arguments[0]
            : { serializable: !0 },
        $ = {};
      return {
        get: function (x, j) {
          var X =
              arguments.length > 2 && arguments[2] !== void 0
                ? arguments[2]
                : {
                    miss: function () {
                      return Promise.resolve();
                    },
                  },
            f = JSON.stringify(x);
          if (f in $)
            return Promise.resolve(C.serializable ? JSON.parse($[f]) : $[f]);
          var p = j(),
            m =
              (X && X.miss) ||
              function () {
                return Promise.resolve();
              };
          return p
            .then(function (b) {
              return m(b);
            })
            .then(function () {
              return p;
            });
        },
        set: function (x, j) {
          return (
            ($[JSON.stringify(x)] = C.serializable ? JSON.stringify(j) : j),
            Promise.resolve(j)
          );
        },
        delete: function (x) {
          return delete $[JSON.stringify(x)], Promise.resolve();
        },
        clear: function () {
          return ($ = {}), Promise.resolve();
        },
      };
    }
    function d(C) {
      for (var $ = C.length - 1; $ > 0; $--) {
        var x = Math.floor(Math.random() * ($ + 1)),
          j = C[$];
        (C[$] = C[x]), (C[x] = j);
      }
      return C;
    }
    function h(C, $) {
      return (
        $ &&
          Object.keys($).forEach(function (x) {
            C[x] = $[x](C);
          }),
        C
      );
    }
    function v(C) {
      for (
        var $ = arguments.length, x = new Array($ > 1 ? $ - 1 : 0), j = 1;
        j < $;
        j++
      )
        x[j - 1] = arguments[j];
      var X = 0;
      return C.replace(/%s/g, function () {
        return encodeURIComponent(x[X++]);
      });
    }
    var g = { WithinQueryParameters: 0, WithinHeaders: 1 };
    function I(C, $) {
      var x = C || {},
        j = x.data || {};
      return (
        Object.keys(x).forEach(function (X) {
          [
            'timeout',
            'headers',
            'queryParameters',
            'data',
            'cacheable',
          ].indexOf(X) === -1 && (j[X] = x[X]);
        }),
        {
          data: Object.entries(j).length > 0 ? j : void 0,
          timeout: x.timeout || $,
          headers: x.headers || {},
          queryParameters: x.queryParameters || {},
          cacheable: x.cacheable,
        }
      );
    }
    var W = { Read: 1, Write: 2, Any: 3 },
      F = 1,
      q = 2,
      k = 3;
    function oe(C) {
      var $ =
        arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : F;
      return s(s({}, C), {}, { status: $, lastUpdate: Date.now() });
    }
    function K(C) {
      return typeof C == 'string'
        ? { protocol: 'https', url: C, accept: W.Any }
        : {
            protocol: C.protocol || 'https',
            url: C.url,
            accept: C.accept || W.Any,
          };
    }
    var A = 'GET',
      Y = 'POST';
    function Q(C, $) {
      return Promise.all(
        $.map(function (x) {
          return C.get(x, function () {
            return Promise.resolve(oe(x));
          });
        })
      ).then(function (x) {
        var j = x.filter(function (p) {
            return (function (m) {
              return m.status === F || Date.now() - m.lastUpdate > 12e4;
            })(p);
          }),
          X = x.filter(function (p) {
            return (function (m) {
              return m.status === k && Date.now() - m.lastUpdate <= 12e4;
            })(p);
          }),
          f = [].concat(l(j), l(X));
        return {
          getTimeout: function (p, m) {
            return (X.length === 0 && p === 0 ? 1 : X.length + 3 + p) * m;
          },
          statelessHosts:
            f.length > 0
              ? f.map(function (p) {
                  return K(p);
                })
              : $,
        };
      });
    }
    function B(C, $, x, j) {
      var X = [],
        f = (function (T, D) {
          if (!(T.method === A || (T.data === void 0 && D.data === void 0))) {
            var O = Array.isArray(T.data) ? T.data : s(s({}, T.data), D.data);
            return JSON.stringify(O);
          }
        })(x, j),
        p = (function (T, D) {
          var O = s(s({}, T.headers), D.headers),
            H = {};
          return (
            Object.keys(O).forEach(function (se) {
              var ne = O[se];
              H[se.toLowerCase()] = ne;
            }),
            H
          );
        })(C, j),
        m = x.method,
        b = x.method !== A ? {} : s(s({}, x.data), j.data),
        E = s(
          s(s({ 'x-algolia-agent': C.userAgent.value }, C.queryParameters), b),
          j.queryParameters
        ),
        L = 0,
        V = function T(D, O) {
          var H = D.pop();
          if (H === void 0)
            throw {
              name: 'RetryError',
              message:
                'Unreachable hosts - your application id may be incorrect. If the error persists, contact support@algolia.com.',
              transporterStackTrace: P(X),
            };
          var se = {
              data: f,
              headers: p,
              method: m,
              url: ue(H, x.path, E),
              connectTimeout: O(L, C.timeouts.connect),
              responseTimeout: O(L, j.timeout),
            },
            ne = function (ie) {
              var ce = {
                request: se,
                response: ie,
                host: H,
                triesLeft: D.length,
              };
              return X.push(ce), ce;
            },
            de = {
              onSuccess: function (ie) {
                return (function (ce) {
                  try {
                    return JSON.parse(ce.content);
                  } catch (ge) {
                    throw (function (Oe, Ve) {
                      return {
                        name: 'DeserializationError',
                        message: Oe,
                        response: Ve,
                      };
                    })(ge.message, ce);
                  }
                })(ie);
              },
              onRetry: function (ie) {
                var ce = ne(ie);
                return (
                  ie.isTimedOut && L++,
                  Promise.all([
                    C.logger.info('Retryable failure', S(ce)),
                    C.hostsCache.set(H, oe(H, ie.isTimedOut ? k : q)),
                  ]).then(function () {
                    return T(D, O);
                  })
                );
              },
              onFail: function (ie) {
                throw (
                  (ne(ie),
                  (function (ce, ge) {
                    var Oe = ce.content,
                      Ve = ce.status,
                      st = Oe;
                    try {
                      st = JSON.parse(Oe).message;
                    } catch {}
                    return (function (Wt, Ot, Yn) {
                      return {
                        name: 'ApiError',
                        message: Wt,
                        status: Ot,
                        transporterStackTrace: Yn,
                      };
                    })(st, Ve, ge);
                  })(ie, P(X)))
                );
              },
            };
          return C.requester.send(se).then(function (ie) {
            return (function (ce, ge) {
              return (function (Oe) {
                var Ve = Oe.status;
                return (
                  Oe.isTimedOut ||
                  (function (st) {
                    var Wt = st.isTimedOut,
                      Ot = st.status;
                    return !Wt && ~~Ot == 0;
                  })(Oe) ||
                  (~~(Ve / 100) != 2 && ~~(Ve / 100) != 4)
                );
              })(ce)
                ? ge.onRetry(ce)
                : ~~(ce.status / 100) == 2
                  ? ge.onSuccess(ce)
                  : ge.onFail(ce);
            })(ie, de);
          });
        };
      return Q(C.hostsCache, $).then(function (T) {
        return V(l(T.statelessHosts).reverse(), T.getTimeout);
      });
    }
    function G(C) {
      var $ = {
        value: 'Algolia for JavaScript ('.concat(C, ')'),
        add: function (x) {
          var j = '; '
            .concat(x.segment)
            .concat(x.version !== void 0 ? ' ('.concat(x.version, ')') : '');
          return (
            $.value.indexOf(j) === -1 &&
              ($.value = ''.concat($.value).concat(j)),
            $
          );
        },
      };
      return $;
    }
    function ue(C, $, x) {
      var j = z(x),
        X = ''
          .concat(C.protocol, '://')
          .concat(C.url, '/')
          .concat($.charAt(0) === '/' ? $.substr(1) : $);
      return j.length && (X += '?'.concat(j)), X;
    }
    function z(C) {
      return Object.keys(C)
        .map(function ($) {
          return v(
            '%s=%s',
            $,
            ((x = C[$]),
            Object.prototype.toString.call(x) === '[object Object]' ||
            Object.prototype.toString.call(x) === '[object Array]'
              ? JSON.stringify(C[$])
              : C[$])
          );
          var x;
        })
        .join('&');
    }
    function P(C) {
      return C.map(function ($) {
        return S($);
      });
    }
    function S(C) {
      var $ = C.request.headers['x-algolia-api-key']
        ? { 'x-algolia-api-key': '*****' }
        : {};
      return s(
        s({}, C),
        {},
        {
          request: s(
            s({}, C.request),
            {},
            { headers: s(s({}, C.request.headers), $) }
          ),
        }
      );
    }
    var R = function (C) {
        var $ = C.appId,
          x = (function (X, f, p) {
            var m = { 'x-algolia-api-key': p, 'x-algolia-application-id': f };
            return {
              headers: function () {
                return X === g.WithinHeaders ? m : {};
              },
              queryParameters: function () {
                return X === g.WithinQueryParameters ? m : {};
              },
            };
          })(C.authMode !== void 0 ? C.authMode : g.WithinHeaders, $, C.apiKey),
          j = (function (X) {
            var f = X.hostsCache,
              p = X.logger,
              m = X.requester,
              b = X.requestsCache,
              E = X.responsesCache,
              L = X.timeouts,
              V = X.userAgent,
              T = X.hosts,
              D = X.queryParameters,
              O = {
                hostsCache: f,
                logger: p,
                requester: m,
                requestsCache: b,
                responsesCache: E,
                timeouts: L,
                userAgent: V,
                headers: X.headers,
                queryParameters: D,
                hosts: T.map(function (H) {
                  return K(H);
                }),
                read: function (H, se) {
                  var ne = I(se, O.timeouts.read),
                    de = function () {
                      return B(
                        O,
                        O.hosts.filter(function (ce) {
                          return (ce.accept & W.Read) != 0;
                        }),
                        H,
                        ne
                      );
                    };
                  if (
                    (ne.cacheable !== void 0 ? ne.cacheable : H.cacheable) !==
                    !0
                  )
                    return de();
                  var ie = {
                    request: H,
                    mappedRequestOptions: ne,
                    transporter: {
                      queryParameters: O.queryParameters,
                      headers: O.headers,
                    },
                  };
                  return O.responsesCache.get(
                    ie,
                    function () {
                      return O.requestsCache.get(ie, function () {
                        return O.requestsCache
                          .set(ie, de())
                          .then(
                            function (ce) {
                              return Promise.all([
                                O.requestsCache.delete(ie),
                                ce,
                              ]);
                            },
                            function (ce) {
                              return Promise.all([
                                O.requestsCache.delete(ie),
                                Promise.reject(ce),
                              ]);
                            }
                          )
                          .then(function (ce) {
                            var ge = o(ce, 2);
                            return ge[0], ge[1];
                          });
                      });
                    },
                    {
                      miss: function (ce) {
                        return O.responsesCache.set(ie, ce);
                      },
                    }
                  );
                },
                write: function (H, se) {
                  return B(
                    O,
                    O.hosts.filter(function (ne) {
                      return (ne.accept & W.Write) != 0;
                    }),
                    H,
                    I(se, O.timeouts.write)
                  );
                },
              };
            return O;
          })(
            s(
              s(
                {
                  hosts: [
                    { url: ''.concat($, '-dsn.algolia.net'), accept: W.Read },
                    { url: ''.concat($, '.algolia.net'), accept: W.Write },
                  ].concat(
                    d([
                      { url: ''.concat($, '-1.algolianet.com') },
                      { url: ''.concat($, '-2.algolianet.com') },
                      { url: ''.concat($, '-3.algolianet.com') },
                    ])
                  ),
                },
                C
              ),
              {},
              {
                headers: s(
                  s(s({}, x.headers()), {
                    'content-type': 'application/x-www-form-urlencoded',
                  }),
                  C.headers
                ),
                queryParameters: s(
                  s({}, x.queryParameters()),
                  C.queryParameters
                ),
              }
            )
          );
        return h(
          {
            transporter: j,
            appId: $,
            addAlgoliaAgent: function (X, f) {
              j.userAgent.add({ segment: X, version: f });
            },
            clearCache: function () {
              return Promise.all([
                j.requestsCache.clear(),
                j.responsesCache.clear(),
              ]).then(function () {});
            },
          },
          C.methods
        );
      },
      N = function (C) {
        return function ($, x) {
          return $.method === A
            ? C.transporter.read($, x)
            : C.transporter.write($, x);
        };
      },
      _ = function (C) {
        return function ($) {
          var x =
              arguments.length > 1 && arguments[1] !== void 0
                ? arguments[1]
                : {},
            j = { transporter: C.transporter, appId: C.appId, indexName: $ };
          return h(j, x.methods);
        };
      },
      y = function (C) {
        return function ($, x) {
          var j = $.map(function (X) {
            return s(s({}, X), {}, { params: z(X.params || {}) });
          });
          return C.transporter.read(
            {
              method: Y,
              path: '1/indexes/*/queries',
              data: { requests: j },
              cacheable: !0,
            },
            x
          );
        };
      },
      M = function (C) {
        return function ($, x) {
          return Promise.all(
            $.map(function (j) {
              var X = j.params,
                f = X.facetName,
                p = X.facetQuery,
                m = i(X, ['facetName', 'facetQuery']);
              return _(C)(j.indexName, {
                methods: { searchForFacetValues: he },
              }).searchForFacetValues(f, p, s(s({}, x), m));
            })
          );
        };
      },
      te = function (C) {
        return function ($, x, j) {
          return C.transporter.read(
            {
              method: Y,
              path: v('1/answers/%s/prediction', C.indexName),
              data: { query: $, queryLanguages: x },
              cacheable: !0,
            },
            j
          );
        };
      },
      re = function (C) {
        return function ($, x) {
          return C.transporter.read(
            {
              method: Y,
              path: v('1/indexes/%s/query', C.indexName),
              data: { query: $ },
              cacheable: !0,
            },
            x
          );
        };
      },
      he = function (C) {
        return function ($, x, j) {
          return C.transporter.read(
            {
              method: Y,
              path: v('1/indexes/%s/facets/%s/query', C.indexName, $),
              data: { facetQuery: x },
              cacheable: !0,
            },
            j
          );
        };
      },
      Ue = 1,
      $e = 2,
      wt = 3,
      ut = function (C) {
        return function ($, x) {
          var j = $.map(function (X) {
            return s(s({}, X), {}, { threshold: X.threshold || 0 });
          });
          return C.transporter.read(
            {
              method: Y,
              path: '1/indexes/*/recommendations',
              data: { requests: j },
              cacheable: !0,
            },
            x
          );
        };
      };
    function Bt(C, $, x) {
      var j,
        X = {
          appId: C,
          apiKey: $,
          timeouts: { connect: 1, read: 2, write: 30 },
          requester: {
            send: function (f) {
              return new Promise(function (p) {
                var m = new XMLHttpRequest();
                m.open(f.method, f.url, !0),
                  Object.keys(f.headers).forEach(function (V) {
                    return m.setRequestHeader(V, f.headers[V]);
                  });
                var b,
                  E = function (V, T) {
                    return setTimeout(function () {
                      m.abort(), p({ status: 0, content: T, isTimedOut: !0 });
                    }, 1e3 * V);
                  },
                  L = E(f.connectTimeout, 'Connection timeout');
                (m.onreadystatechange = function () {
                  m.readyState > m.OPENED &&
                    b === void 0 &&
                    (clearTimeout(L),
                    (b = E(f.responseTimeout, 'Socket timeout')));
                }),
                  (m.onerror = function () {
                    m.status === 0 &&
                      (clearTimeout(L),
                      clearTimeout(b),
                      p({
                        content: m.responseText || 'Network request failed',
                        status: m.status,
                        isTimedOut: !1,
                      }));
                  }),
                  (m.onload = function () {
                    clearTimeout(L),
                      clearTimeout(b),
                      p({
                        content: m.responseText,
                        status: m.status,
                        isTimedOut: !1,
                      });
                  }),
                  m.send(f.data);
              });
            },
          },
          logger:
            ((j = wt),
            {
              debug: function (f, p) {
                return Ue >= j && console.debug(f, p), Promise.resolve();
              },
              info: function (f, p) {
                return $e >= j && console.info(f, p), Promise.resolve();
              },
              error: function (f, p) {
                return console.error(f, p), Promise.resolve();
              },
            }),
          responsesCache: u(),
          requestsCache: u({ serializable: !1 }),
          hostsCache: c({
            caches: [a({ key: ''.concat('4.23.3', '-').concat(C) }), u()],
          }),
          userAgent: G('4.23.3').add({ segment: 'Browser', version: 'lite' }),
          authMode: g.WithinQueryParameters,
        };
      return R(
        s(
          s(s({}, X), x),
          {},
          {
            methods: {
              search: y,
              searchForFacetValues: M,
              multipleQueries: y,
              multipleSearchForFacetValues: M,
              customRequest: N,
              initIndex: function (f) {
                return function (p) {
                  return _(f)(p, {
                    methods: {
                      search: re,
                      searchForFacetValues: he,
                      findAnswers: te,
                    },
                  });
                };
              },
              getRecommendations: ut,
            },
          }
        )
      );
    }
    return (Bt.version = '4.23.3'), Bt;
  });
})(wl);
var hh = wl.exports;
const ph = Yr(hh);
class vh extends Error {
  constructor(t, n) {
    super(t), (this.response = n);
  }
}
const me = class me {
  static async request(t, n) {
    const r = await fetch(t, n),
      s = await r.json();
    if (!r.ok) throw new vh(r.statusText, r);
    return s;
  }
  static setPackageJSON(t) {
    me.packageJSON = t;
  }
  static setVSCode(t) {
    me.vscode = t;
  }
  static getSuggestions(t, n) {
    return me.algolia.search(t, {
      analyticsTags: ['idered-vscode'],
      hitsPerPage: Math.min(Math.max(n, 1), 20),
    });
  }
  static getPackageDetails(t) {
    return me.algolia
      .search(t, { analyticsTags: ['idered-vscode'], hitsPerPage: 1 })
      .then(n => n.hits[0]);
  }
  static async getIsPackageDeprecated(t) {
    var r;
    return (r = (
      await me.algolia.search(t, {
        analyticsTags: ['idered-vscode'],
        hitsPerPage: 1,
      })
    ).hits[0]) == null
      ? void 0
      : r.deprecated;
  }
  static getSizeInfo(t) {
    if (me.sizeCache[t] || me.sizeCache[t] === null)
      return Promise.resolve(me.sizeCache[t]);
    if (me.sizeQueryCache[t]) return me.sizeQueryCache[t];
    const n = me
      .request(`https://bundlephobia.com/api/size?package=${t}&record=true`)
      .then(r => ((me.sizeCache[t] = r), r))
      .catch(() => ((me.sizeCache[t] = null), null));
    return (me.sizeQueryCache[t] = n), n;
  }
  static getExportSizes(t, n) {
    return me.request(
      `https://bundlephobia.com/api/exports-sizes?package=${t}@${n}`
    );
  }
  static getPackageVersionsAndTags(t) {
    return me.request(`https://data.jsdelivr.com/v1/package/npm/${t}`);
  }
  static getInstalledPackages() {
    return me.vscode.fetch.post('/installed', { packageJSON: me.packageJSON });
  }
  static installPackage(t) {
    return me.vscode.fetch.post('/install', {
      ...t,
      packageJSON: me.packageJSON,
    });
  }
  static removePackages(t) {
    return me.vscode.fetch.post('/remove', {
      packages: t,
      packageJSON: me.packageJSON,
    });
  }
  static getPackageJSONFiles() {
    return me.vscode.fetch.get('/package-json-files');
  }
  static getDepCheck() {
    return me.vscode.fetch.post('/depcheck', { packageJSON: me.packageJSON });
  }
  static changeVersion(t) {
    return me.vscode.fetch.post('/change-version', {
      ...t,
      packageJSON: me.packageJSON,
    });
  }
  static updatePackages(t) {
    return me.vscode.fetch.post('/update', {
      ...t,
      packageJSON: me.packageJSON,
    });
  }
  static updatePackage(t) {
    return me.updatePackages({ packages: [{ name: t }] });
  }
  static getConfig() {
    return me.vscode.fetch.get('/config');
  }
};
fn(me, 'packageJSON', ''),
  fn(
    me,
    'algolia',
    ph('OFCNCOG2CU', '6fe4476ee5a1832882e326b506d14126').initIndex('npm-search')
  ),
  fn(me, 'vscode'),
  fn(me, 'sizeCache', {}),
  fn(me, 'sizeQueryCache', {});
let Me = me;
const Ol = Symbol('store'),
  Ln = fh({
    state: {
      query: '',
      filterQuery: '',
      filterInputIsFocused: !1,
      analyzeSort: vn.GZIP,
      analyzeOrder: jt.Descending,
      errors: new Map(),
      view: Se.Manage,
      packageJSON: null,
      selectedPackage: null,
      packageJSONFiles: [],
      config: {
        showShortcuts: !0,
        showResultDescription: !0,
        showAnalyzeTab: !0,
        excludeVersions: [],
        showAlgoliaInfo: !0,
        maxNumberOfResults: 4,
        analyze: { columns: ['min', 'gzip'] },
      },
      sizeInfo: {},
      depCheck: null,
      installedPackages: [],
      updatingPackages: [],
    },
    getters: {
      getPackageByName: e => t => e.installedPackages.find(n => n.name === t),
      hasError: e => t => e.errors.has(t),
      getError: e => t => e.errors.get(t),
      totalGZIPSize(e) {
        return Object.values(e.sizeInfo).reduce((t, n) => t + n.gzip, 0);
      },
      isUnused(e) {
        return t => {
          var n;
          return (n = e.depCheck) == null ? void 0 : n.unused.includes(t);
        };
      },
    },
    mutations: {
      setSelectedPackage(e, t) {
        e.selectedPackage = t;
      },
      setFilterQuery(e, t) {
        e.filterQuery = t;
      },
      setFilterInputIsFocused(e, t) {
        e.filterInputIsFocused = t;
      },
      setAnalyzeSort(e, t) {
        e.analyzeSort === t
          ? (e.analyzeOrder =
              e.analyzeOrder === jt.Descending ? jt.Ascending : jt.Descending)
          : (e.analyzeOrder = jt.Descending),
          (e.analyzeSort = t);
      },
      addError(e, t) {
        e.errors.set(t.error, t.details);
      },
      removeError(e, t) {
        e.errors.delete(t);
      },
      setDepCheck(e, t) {
        e.depCheck = t;
      },
      setSizeInfo(e, t) {
        e.sizeInfo = t;
      },
      addSizeInfo(e, t) {
        t && (e.sizeInfo = { ...e.sizeInfo, [t.name]: t });
      },
      navigate(e, t) {
        e.view = t;
      },
      setConfig(e, t) {
        e.config = { ...e.config, ...t };
      },
      addUpdatingPackage(e, t) {
        e.updatingPackages.push(t);
      },
      deleteUpdatingPackage(e, t) {
        e.updatingPackages.splice(e.updatingPackages.indexOf(t), 1);
      },
      addPackage(e, t) {
        e.installedPackages.push(t),
          e.installedPackages.sort((n, r) =>
            n.isDevDependency !== r.isDevDependency
              ? n.isDevDependency
                ? 1
                : -1
              : n.name.localeCompare(r.name)
          );
      },
      setInstalledPackages(e, t) {
        (e.installedPackages = t),
          e.installedPackages.sort((n, r) =>
            n.isDevDependency !== r.isDevDependency
              ? n.isDevDependency
                ? 1
                : -1
              : n.name.localeCompare(r.name)
          );
      },
      removePackages(e, t) {
        e.installedPackages = e.installedPackages.filter(
          n => !t.includes(n.name)
        );
      },
      changeVersion(e, t) {
        const n = e.installedPackages.indexOf(t.item);
        e.installedPackages.splice(n, 1, { ...t.item, version: t.version });
      },
      addInstalledPackage(e, t) {
        e.installedPackages.push(t),
          e.installedPackages.sort((n, r) =>
            n.isDevDependency !== r.isDevDependency
              ? n.isDevDependency
                ? 1
                : -1
              : n.name.localeCompare(r.name)
          );
      },
    },
    actions: {
      async getConfig(e) {
        const t = await Me.getConfig();
        e.commit('setConfig', t);
      },
    },
  });
function vt() {
  return Bd(Ol);
}
const Hn = e => {
    let t, n;
    return (
      Math.log10(e) < 3
        ? ((t = 'B'), (n = e))
        : Math.log10(e) < 6
          ? ((t = 'kB'), (n = e / 1024))
          : ((t = 'MB'), (n = e / 1024 / 1024)),
      { unit: t, size: n, toString: () => `${n.toFixed(1)} ${t}` }
    );
  },
  Ao = e => {
    let t, n;
    return (
      e < 5e-4
        ? ((t = 'μs'), (n = Math.round(e * 1e6)))
        : e < 0.5
          ? ((t = 'ms'), (n = Math.round(e * 1e3)))
          : ((t = 's'), (n = e)),
      { unit: t, size: n }
    );
  },
  Pr = e => ({
    slow3G: e / 1024 / Pn.Slow3G,
    fast3G: e / 1024 / Pn.Fast3G,
    slow4G: e / 1024 / Pn.Slow4G,
    fast4G: e / 1024 / Pn.Fast4G,
  });
function gh(e) {
  return e.startsWith('@types/')
    ? ''
    : `@types/${e.replace(/^@/, '').replace(/\//g, '__')}`;
}
const En = async (e, t) => {
    e &&
      (Array.isArray(e)
        ? e.forEach(n => Ln.commit('addUpdatingPackage', n))
        : Ln.commit('addUpdatingPackage', e),
      await t(),
      Array.isArray(e)
        ? e.forEach(n => Ln.commit('deleteUpdatingPackage', n))
        : Ln.commit('deleteUpdatingPackage', e));
  },
  mh = e =>
    e.reduce((t, n) => {
      var i;
      n = n.replace('\\', '/');
      const r = n.split('/'),
        s = t.find(o => o.group === r[0]);
      return r[0] === 'package.json'
        ? (t.push({ label: 'package.json', value: 'package.json' }), t)
        : (s
            ? (i = s.children) == null ||
              i.push({
                label: r.slice(1).join('/').replace('/package.json', ''),
                value: n,
              })
            : t.push({
                group: r[0],
                children: [
                  {
                    label: r.slice(1).join('/').replace('/package.json', ''),
                    value: n,
                  },
                ],
              }),
          t);
    }, []),
  yh = e =>
    /^file:|^link:|^https?:|^git:|^git\+|^github:|^gist:|^bitbucket:|^gitlab:/.test(
      e
    ) === !1;
var ys = {};
const _h =
  typeof process == 'object' &&
  ys &&
  ys.NODE_DEBUG &&
  /\bsemver\b/i.test(ys.NODE_DEBUG)
    ? (...e) => console.error('SEMVER', ...e)
    : () => {};
var es = _h;
const bh = '2.0.0',
  Sl = 256,
  Ch = Number.MAX_SAFE_INTEGER || 9007199254740991,
  Eh = 16,
  wh = Sl - 6,
  Oh = [
    'major',
    'premajor',
    'minor',
    'preminor',
    'patch',
    'prepatch',
    'prerelease',
  ];
var Ii = {
    MAX_LENGTH: Sl,
    MAX_SAFE_COMPONENT_LENGTH: Eh,
    MAX_SAFE_BUILD_LENGTH: wh,
    MAX_SAFE_INTEGER: Ch,
    RELEASE_TYPES: Oh,
    SEMVER_SPEC_VERSION: bh,
    FLAG_INCLUDE_PRERELEASE: 1,
    FLAG_LOOSE: 2,
  },
  Gs = { exports: {} };
(function (e, t) {
  const {
      MAX_SAFE_COMPONENT_LENGTH: n,
      MAX_SAFE_BUILD_LENGTH: r,
      MAX_LENGTH: s,
    } = Ii,
    i = es;
  t = e.exports = {};
  const o = (t.re = []),
    l = (t.safeRe = []),
    a = (t.src = []),
    c = (t.t = {});
  let u = 0;
  const d = '[a-zA-Z0-9-]',
    h = [
      ['\\s', 1],
      ['\\d', s],
      [d, r],
    ],
    v = I => {
      for (const [W, F] of h)
        I = I.split(`${W}*`)
          .join(`${W}{0,${F}}`)
          .split(`${W}+`)
          .join(`${W}{1,${F}}`);
      return I;
    },
    g = (I, W, F) => {
      const q = v(W),
        k = u++;
      i(I, k, W),
        (c[I] = k),
        (a[k] = W),
        (o[k] = new RegExp(W, F ? 'g' : void 0)),
        (l[k] = new RegExp(q, F ? 'g' : void 0));
    };
  g('NUMERICIDENTIFIER', '0|[1-9]\\d*'),
    g('NUMERICIDENTIFIERLOOSE', '\\d+'),
    g('NONNUMERICIDENTIFIER', `\\d*[a-zA-Z-]${d}*`),
    g(
      'MAINVERSION',
      `(${a[c.NUMERICIDENTIFIER]})\\.(${a[c.NUMERICIDENTIFIER]})\\.(${a[c.NUMERICIDENTIFIER]})`
    ),
    g(
      'MAINVERSIONLOOSE',
      `(${a[c.NUMERICIDENTIFIERLOOSE]})\\.(${a[c.NUMERICIDENTIFIERLOOSE]})\\.(${a[c.NUMERICIDENTIFIERLOOSE]})`
    ),
    g(
      'PRERELEASEIDENTIFIER',
      `(?:${a[c.NUMERICIDENTIFIER]}|${a[c.NONNUMERICIDENTIFIER]})`
    ),
    g(
      'PRERELEASEIDENTIFIERLOOSE',
      `(?:${a[c.NUMERICIDENTIFIERLOOSE]}|${a[c.NONNUMERICIDENTIFIER]})`
    ),
    g(
      'PRERELEASE',
      `(?:-(${a[c.PRERELEASEIDENTIFIER]}(?:\\.${a[c.PRERELEASEIDENTIFIER]})*))`
    ),
    g(
      'PRERELEASELOOSE',
      `(?:-?(${a[c.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${a[c.PRERELEASEIDENTIFIERLOOSE]})*))`
    ),
    g('BUILDIDENTIFIER', `${d}+`),
    g(
      'BUILD',
      `(?:\\+(${a[c.BUILDIDENTIFIER]}(?:\\.${a[c.BUILDIDENTIFIER]})*))`
    ),
    g('FULLPLAIN', `v?${a[c.MAINVERSION]}${a[c.PRERELEASE]}?${a[c.BUILD]}?`),
    g('FULL', `^${a[c.FULLPLAIN]}$`),
    g(
      'LOOSEPLAIN',
      `[v=\\s]*${a[c.MAINVERSIONLOOSE]}${a[c.PRERELEASELOOSE]}?${a[c.BUILD]}?`
    ),
    g('LOOSE', `^${a[c.LOOSEPLAIN]}$`),
    g('GTLT', '((?:<|>)?=?)'),
    g('XRANGEIDENTIFIERLOOSE', `${a[c.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`),
    g('XRANGEIDENTIFIER', `${a[c.NUMERICIDENTIFIER]}|x|X|\\*`),
    g(
      'XRANGEPLAIN',
      `[v=\\s]*(${a[c.XRANGEIDENTIFIER]})(?:\\.(${a[c.XRANGEIDENTIFIER]})(?:\\.(${a[c.XRANGEIDENTIFIER]})(?:${a[c.PRERELEASE]})?${a[c.BUILD]}?)?)?`
    ),
    g(
      'XRANGEPLAINLOOSE',
      `[v=\\s]*(${a[c.XRANGEIDENTIFIERLOOSE]})(?:\\.(${a[c.XRANGEIDENTIFIERLOOSE]})(?:\\.(${a[c.XRANGEIDENTIFIERLOOSE]})(?:${a[c.PRERELEASELOOSE]})?${a[c.BUILD]}?)?)?`
    ),
    g('XRANGE', `^${a[c.GTLT]}\\s*${a[c.XRANGEPLAIN]}$`),
    g('XRANGELOOSE', `^${a[c.GTLT]}\\s*${a[c.XRANGEPLAINLOOSE]}$`),
    g(
      'COERCEPLAIN',
      `(^|[^\\d])(\\d{1,${n}})(?:\\.(\\d{1,${n}}))?(?:\\.(\\d{1,${n}}))?`
    ),
    g('COERCE', `${a[c.COERCEPLAIN]}(?:$|[^\\d])`),
    g(
      'COERCEFULL',
      a[c.COERCEPLAIN] + `(?:${a[c.PRERELEASE]})?(?:${a[c.BUILD]})?(?:$|[^\\d])`
    ),
    g('COERCERTL', a[c.COERCE], !0),
    g('COERCERTLFULL', a[c.COERCEFULL], !0),
    g('LONETILDE', '(?:~>?)'),
    g('TILDETRIM', `(\\s*)${a[c.LONETILDE]}\\s+`, !0),
    (t.tildeTrimReplace = '$1~'),
    g('TILDE', `^${a[c.LONETILDE]}${a[c.XRANGEPLAIN]}$`),
    g('TILDELOOSE', `^${a[c.LONETILDE]}${a[c.XRANGEPLAINLOOSE]}$`),
    g('LONECARET', '(?:\\^)'),
    g('CARETTRIM', `(\\s*)${a[c.LONECARET]}\\s+`, !0),
    (t.caretTrimReplace = '$1^'),
    g('CARET', `^${a[c.LONECARET]}${a[c.XRANGEPLAIN]}$`),
    g('CARETLOOSE', `^${a[c.LONECARET]}${a[c.XRANGEPLAINLOOSE]}$`),
    g('COMPARATORLOOSE', `^${a[c.GTLT]}\\s*(${a[c.LOOSEPLAIN]})$|^$`),
    g('COMPARATOR', `^${a[c.GTLT]}\\s*(${a[c.FULLPLAIN]})$|^$`),
    g(
      'COMPARATORTRIM',
      `(\\s*)${a[c.GTLT]}\\s*(${a[c.LOOSEPLAIN]}|${a[c.XRANGEPLAIN]})`,
      !0
    ),
    (t.comparatorTrimReplace = '$1$2$3'),
    g(
      'HYPHENRANGE',
      `^\\s*(${a[c.XRANGEPLAIN]})\\s+-\\s+(${a[c.XRANGEPLAIN]})\\s*$`
    ),
    g(
      'HYPHENRANGELOOSE',
      `^\\s*(${a[c.XRANGEPLAINLOOSE]})\\s+-\\s+(${a[c.XRANGEPLAINLOOSE]})\\s*$`
    ),
    g('STAR', '(<|>)?=?\\s*\\*'),
    g('GTE0', '^\\s*>=\\s*0\\.0\\.0\\s*$'),
    g('GTE0PRE', '^\\s*>=\\s*0\\.0\\.0-0\\s*$');
})(Gs, Gs.exports);
var ts = Gs.exports;
const Sh = Object.freeze({ loose: !0 }),
  Ih = Object.freeze({}),
  $h = e => (e ? (typeof e != 'object' ? Sh : e) : Ih);
var $i = $h;
const Po = /^[0-9]+$/,
  Il = (e, t) => {
    const n = Po.test(e),
      r = Po.test(t);
    return (
      n && r && ((e = +e), (t = +t)),
      e === t ? 0 : n && !r ? -1 : r && !n ? 1 : e < t ? -1 : 1
    );
  },
  xh = (e, t) => Il(t, e);
var Ah = { compareIdentifiers: Il, rcompareIdentifiers: xh };
const lr = es,
  { MAX_LENGTH: Lo, MAX_SAFE_INTEGER: cr } = Ii,
  { safeRe: Ro, t: To } = ts,
  Ph = $i,
  { compareIdentifiers: pn } = Ah;
let Lh = class yt {
  constructor(t, n) {
    if (((n = Ph(n)), t instanceof yt)) {
      if (
        t.loose === !!n.loose &&
        t.includePrerelease === !!n.includePrerelease
      )
        return t;
      t = t.version;
    } else if (typeof t != 'string')
      throw new TypeError(
        `Invalid version. Must be a string. Got type "${typeof t}".`
      );
    if (t.length > Lo)
      throw new TypeError(`version is longer than ${Lo} characters`);
    lr('SemVer', t, n),
      (this.options = n),
      (this.loose = !!n.loose),
      (this.includePrerelease = !!n.includePrerelease);
    const r = t.trim().match(n.loose ? Ro[To.LOOSE] : Ro[To.FULL]);
    if (!r) throw new TypeError(`Invalid Version: ${t}`);
    if (
      ((this.raw = t),
      (this.major = +r[1]),
      (this.minor = +r[2]),
      (this.patch = +r[3]),
      this.major > cr || this.major < 0)
    )
      throw new TypeError('Invalid major version');
    if (this.minor > cr || this.minor < 0)
      throw new TypeError('Invalid minor version');
    if (this.patch > cr || this.patch < 0)
      throw new TypeError('Invalid patch version');
    r[4]
      ? (this.prerelease = r[4].split('.').map(s => {
          if (/^[0-9]+$/.test(s)) {
            const i = +s;
            if (i >= 0 && i < cr) return i;
          }
          return s;
        }))
      : (this.prerelease = []),
      (this.build = r[5] ? r[5].split('.') : []),
      this.format();
  }
  format() {
    return (
      (this.version = `${this.major}.${this.minor}.${this.patch}`),
      this.prerelease.length &&
        (this.version += `-${this.prerelease.join('.')}`),
      this.version
    );
  }
  toString() {
    return this.version;
  }
  compare(t) {
    if (
      (lr('SemVer.compare', this.version, this.options, t), !(t instanceof yt))
    ) {
      if (typeof t == 'string' && t === this.version) return 0;
      t = new yt(t, this.options);
    }
    return t.version === this.version
      ? 0
      : this.compareMain(t) || this.comparePre(t);
  }
  compareMain(t) {
    return (
      t instanceof yt || (t = new yt(t, this.options)),
      pn(this.major, t.major) ||
        pn(this.minor, t.minor) ||
        pn(this.patch, t.patch)
    );
  }
  comparePre(t) {
    if (
      (t instanceof yt || (t = new yt(t, this.options)),
      this.prerelease.length && !t.prerelease.length)
    )
      return -1;
    if (!this.prerelease.length && t.prerelease.length) return 1;
    if (!this.prerelease.length && !t.prerelease.length) return 0;
    let n = 0;
    do {
      const r = this.prerelease[n],
        s = t.prerelease[n];
      if ((lr('prerelease compare', n, r, s), r === void 0 && s === void 0))
        return 0;
      if (s === void 0) return 1;
      if (r === void 0) return -1;
      if (r === s) continue;
      return pn(r, s);
    } while (++n);
  }
  compareBuild(t) {
    t instanceof yt || (t = new yt(t, this.options));
    let n = 0;
    do {
      const r = this.build[n],
        s = t.build[n];
      if ((lr('build compare', n, r, s), r === void 0 && s === void 0))
        return 0;
      if (s === void 0) return 1;
      if (r === void 0) return -1;
      if (r === s) continue;
      return pn(r, s);
    } while (++n);
  }
  inc(t, n, r) {
    switch (t) {
      case 'premajor':
        (this.prerelease.length = 0),
          (this.patch = 0),
          (this.minor = 0),
          this.major++,
          this.inc('pre', n, r);
        break;
      case 'preminor':
        (this.prerelease.length = 0),
          (this.patch = 0),
          this.minor++,
          this.inc('pre', n, r);
        break;
      case 'prepatch':
        (this.prerelease.length = 0),
          this.inc('patch', n, r),
          this.inc('pre', n, r);
        break;
      case 'prerelease':
        this.prerelease.length === 0 && this.inc('patch', n, r),
          this.inc('pre', n, r);
        break;
      case 'major':
        (this.minor !== 0 ||
          this.patch !== 0 ||
          this.prerelease.length === 0) &&
          this.major++,
          (this.minor = 0),
          (this.patch = 0),
          (this.prerelease = []);
        break;
      case 'minor':
        (this.patch !== 0 || this.prerelease.length === 0) && this.minor++,
          (this.patch = 0),
          (this.prerelease = []);
        break;
      case 'patch':
        this.prerelease.length === 0 && this.patch++, (this.prerelease = []);
        break;
      case 'pre': {
        const s = Number(r) ? 1 : 0;
        if (!n && r === !1)
          throw new Error('invalid increment argument: identifier is empty');
        if (this.prerelease.length === 0) this.prerelease = [s];
        else {
          let i = this.prerelease.length;
          for (; --i >= 0; )
            typeof this.prerelease[i] == 'number' &&
              (this.prerelease[i]++, (i = -2));
          if (i === -1) {
            if (n === this.prerelease.join('.') && r === !1)
              throw new Error(
                'invalid increment argument: identifier already exists'
              );
            this.prerelease.push(s);
          }
        }
        if (n) {
          let i = [n, s];
          r === !1 && (i = [n]),
            pn(this.prerelease[0], n) === 0
              ? isNaN(this.prerelease[1]) && (this.prerelease = i)
              : (this.prerelease = i);
        }
        break;
      }
      default:
        throw new Error(`invalid increment argument: ${t}`);
    }
    return (
      (this.raw = this.format()),
      this.build.length && (this.raw += `+${this.build.join('.')}`),
      this
    );
  }
};
var un = Lh;
const Mo = un,
  Rh = (e, t, n = !1) => {
    if (e instanceof Mo) return e;
    try {
      return new Mo(e, t);
    } catch (r) {
      if (!n) return null;
      throw r;
    }
  };
var Th = Rh;
const Mh = un,
  Nh = Th,
  { safeRe: ur, t: fr } = ts,
  Fh = (e, t) => {
    if (e instanceof Mh) return e;
    if ((typeof e == 'number' && (e = String(e)), typeof e != 'string'))
      return null;
    t = t || {};
    let n = null;
    if (!t.rtl)
      n = e.match(t.includePrerelease ? ur[fr.COERCEFULL] : ur[fr.COERCE]);
    else {
      const a = t.includePrerelease ? ur[fr.COERCERTLFULL] : ur[fr.COERCERTL];
      let c;
      for (; (c = a.exec(e)) && (!n || n.index + n[0].length !== e.length); )
        (!n || c.index + c[0].length !== n.index + n[0].length) && (n = c),
          (a.lastIndex = c.index + c[1].length + c[2].length);
      a.lastIndex = -1;
    }
    if (n === null) return null;
    const r = n[2],
      s = n[3] || '0',
      i = n[4] || '0',
      o = t.includePrerelease && n[5] ? `-${n[5]}` : '',
      l = t.includePrerelease && n[6] ? `+${n[6]}` : '';
    return Nh(`${r}.${s}.${i}${o}${l}`, t);
  };
var kh = Fh;
const Ct = Yr(kh);
class Dh {
  constructor() {
    (this.max = 1e3), (this.map = new Map());
  }
  get(t) {
    const n = this.map.get(t);
    if (n !== void 0) return this.map.delete(t), this.map.set(t, n), n;
  }
  delete(t) {
    return this.map.delete(t);
  }
  set(t, n) {
    if (!this.delete(t) && n !== void 0) {
      if (this.map.size >= this.max) {
        const s = this.map.keys().next().value;
        this.delete(s);
      }
      this.map.set(t, n);
    }
    return this;
  }
}
var jh = Dh;
const No = un,
  Uh = (e, t, n) => new No(e, n).compare(new No(t, n));
var In = Uh;
const Vh = In,
  Qh = (e, t, n) => Vh(e, t, n) === 0;
var qh = Qh;
const zh = In,
  Gh = (e, t, n) => zh(e, t, n) !== 0;
var Hh = Gh;
const Kh = In,
  Bh = (e, t, n) => Kh(e, t, n) > 0;
var Wh = Bh;
const Jh = In,
  Xh = (e, t, n) => Jh(e, t, n) >= 0;
var Zh = Xh;
const Yh = In,
  e1 = (e, t, n) => Yh(e, t, n) < 0;
var t1 = e1;
const n1 = In,
  r1 = (e, t, n) => n1(e, t, n) <= 0;
var s1 = r1;
const i1 = qh,
  o1 = Hh,
  a1 = Wh,
  l1 = Zh,
  c1 = t1,
  u1 = s1,
  f1 = (e, t, n, r) => {
    switch (t) {
      case '===':
        return (
          typeof e == 'object' && (e = e.version),
          typeof n == 'object' && (n = n.version),
          e === n
        );
      case '!==':
        return (
          typeof e == 'object' && (e = e.version),
          typeof n == 'object' && (n = n.version),
          e !== n
        );
      case '':
      case '=':
      case '==':
        return i1(e, n, r);
      case '!=':
        return o1(e, n, r);
      case '>':
        return a1(e, n, r);
      case '>=':
        return l1(e, n, r);
      case '<':
        return c1(e, n, r);
      case '<=':
        return u1(e, n, r);
      default:
        throw new TypeError(`Invalid operator: ${t}`);
    }
  };
var d1 = f1,
  _s,
  Fo;
function h1() {
  if (Fo) return _s;
  Fo = 1;
  const e = Symbol('SemVer ANY');
  class t {
    static get ANY() {
      return e;
    }
    constructor(u, d) {
      if (((d = n(d)), u instanceof t)) {
        if (u.loose === !!d.loose) return u;
        u = u.value;
      }
      (u = u.trim().split(/\s+/).join(' ')),
        o('comparator', u, d),
        (this.options = d),
        (this.loose = !!d.loose),
        this.parse(u),
        this.semver === e
          ? (this.value = '')
          : (this.value = this.operator + this.semver.version),
        o('comp', this);
    }
    parse(u) {
      const d = this.options.loose ? r[s.COMPARATORLOOSE] : r[s.COMPARATOR],
        h = u.match(d);
      if (!h) throw new TypeError(`Invalid comparator: ${u}`);
      (this.operator = h[1] !== void 0 ? h[1] : ''),
        this.operator === '=' && (this.operator = ''),
        h[2]
          ? (this.semver = new l(h[2], this.options.loose))
          : (this.semver = e);
    }
    toString() {
      return this.value;
    }
    test(u) {
      if (
        (o('Comparator.test', u, this.options.loose),
        this.semver === e || u === e)
      )
        return !0;
      if (typeof u == 'string')
        try {
          u = new l(u, this.options);
        } catch {
          return !1;
        }
      return i(u, this.operator, this.semver, this.options);
    }
    intersects(u, d) {
      if (!(u instanceof t)) throw new TypeError('a Comparator is required');
      return this.operator === ''
        ? this.value === ''
          ? !0
          : new a(u.value, d).test(this.value)
        : u.operator === ''
          ? u.value === ''
            ? !0
            : new a(this.value, d).test(u.semver)
          : ((d = n(d)),
            (d.includePrerelease &&
              (this.value === '<0.0.0-0' || u.value === '<0.0.0-0')) ||
            (!d.includePrerelease &&
              (this.value.startsWith('<0.0.0') || u.value.startsWith('<0.0.0')))
              ? !1
              : !!(
                  (this.operator.startsWith('>') &&
                    u.operator.startsWith('>')) ||
                  (this.operator.startsWith('<') &&
                    u.operator.startsWith('<')) ||
                  (this.semver.version === u.semver.version &&
                    this.operator.includes('=') &&
                    u.operator.includes('=')) ||
                  (i(this.semver, '<', u.semver, d) &&
                    this.operator.startsWith('>') &&
                    u.operator.startsWith('<')) ||
                  (i(this.semver, '>', u.semver, d) &&
                    this.operator.startsWith('<') &&
                    u.operator.startsWith('>'))
                ));
    }
  }
  _s = t;
  const n = $i,
    { safeRe: r, t: s } = ts,
    i = d1,
    o = es,
    l = un,
    a = xi();
  return _s;
}
var bs, ko;
function xi() {
  if (ko) return bs;
  ko = 1;
  class e {
    constructor(S, R) {
      if (((R = r(R)), S instanceof e))
        return S.loose === !!R.loose &&
          S.includePrerelease === !!R.includePrerelease
          ? S
          : new e(S.raw, R);
      if (S instanceof s)
        return (this.raw = S.value), (this.set = [[S]]), this.format(), this;
      if (
        ((this.options = R),
        (this.loose = !!R.loose),
        (this.includePrerelease = !!R.includePrerelease),
        (this.raw = S.trim().split(/\s+/).join(' ')),
        (this.set = this.raw
          .split('||')
          .map(N => this.parseRange(N.trim()))
          .filter(N => N.length)),
        !this.set.length)
      )
        throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
      if (this.set.length > 1) {
        const N = this.set[0];
        if (
          ((this.set = this.set.filter(_ => !g(_[0]))), this.set.length === 0)
        )
          this.set = [N];
        else if (this.set.length > 1) {
          for (const _ of this.set)
            if (_.length === 1 && I(_[0])) {
              this.set = [_];
              break;
            }
        }
      }
      this.format();
    }
    format() {
      return (
        (this.range = this.set
          .map(S => S.join(' ').trim())
          .join('||')
          .trim()),
        this.range
      );
    }
    toString() {
      return this.range;
    }
    parseRange(S) {
      const N =
          ((this.options.includePrerelease && h) | (this.options.loose && v)) +
          ':' +
          S,
        _ = n.get(N);
      if (_) return _;
      const y = this.options.loose,
        M = y ? l[a.HYPHENRANGELOOSE] : l[a.HYPHENRANGE];
      (S = S.replace(M, ue(this.options.includePrerelease))),
        i('hyphen replace', S),
        (S = S.replace(l[a.COMPARATORTRIM], c)),
        i('comparator trim', S),
        (S = S.replace(l[a.TILDETRIM], u)),
        i('tilde trim', S),
        (S = S.replace(l[a.CARETTRIM], d)),
        i('caret trim', S);
      let te = S.split(' ')
        .map($e => F($e, this.options))
        .join(' ')
        .split(/\s+/)
        .map($e => G($e, this.options));
      y &&
        (te = te.filter(
          $e => (
            i('loose invalid filter', $e, this.options),
            !!$e.match(l[a.COMPARATORLOOSE])
          )
        )),
        i('range list', te);
      const re = new Map(),
        he = te.map($e => new s($e, this.options));
      for (const $e of he) {
        if (g($e)) return [$e];
        re.set($e.value, $e);
      }
      re.size > 1 && re.has('') && re.delete('');
      const Ue = [...re.values()];
      return n.set(N, Ue), Ue;
    }
    intersects(S, R) {
      if (!(S instanceof e)) throw new TypeError('a Range is required');
      return this.set.some(
        N =>
          W(N, R) &&
          S.set.some(
            _ => W(_, R) && N.every(y => _.every(M => y.intersects(M, R)))
          )
      );
    }
    test(S) {
      if (!S) return !1;
      if (typeof S == 'string')
        try {
          S = new o(S, this.options);
        } catch {
          return !1;
        }
      for (let R = 0; R < this.set.length; R++)
        if (z(this.set[R], S, this.options)) return !0;
      return !1;
    }
  }
  bs = e;
  const t = jh,
    n = new t(),
    r = $i,
    s = h1(),
    i = es,
    o = un,
    {
      safeRe: l,
      t: a,
      comparatorTrimReplace: c,
      tildeTrimReplace: u,
      caretTrimReplace: d,
    } = ts,
    { FLAG_INCLUDE_PRERELEASE: h, FLAG_LOOSE: v } = Ii,
    g = P => P.value === '<0.0.0-0',
    I = P => P.value === '',
    W = (P, S) => {
      let R = !0;
      const N = P.slice();
      let _ = N.pop();
      for (; R && N.length; )
        (R = N.every(y => _.intersects(y, S))), (_ = N.pop());
      return R;
    },
    F = (P, S) => (
      i('comp', P, S),
      (P = K(P, S)),
      i('caret', P),
      (P = k(P, S)),
      i('tildes', P),
      (P = Y(P, S)),
      i('xrange', P),
      (P = B(P, S)),
      i('stars', P),
      P
    ),
    q = P => !P || P.toLowerCase() === 'x' || P === '*',
    k = (P, S) =>
      P.trim()
        .split(/\s+/)
        .map(R => oe(R, S))
        .join(' '),
    oe = (P, S) => {
      const R = S.loose ? l[a.TILDELOOSE] : l[a.TILDE];
      return P.replace(R, (N, _, y, M, te) => {
        i('tilde', P, N, _, y, M, te);
        let re;
        return (
          q(_)
            ? (re = '')
            : q(y)
              ? (re = `>=${_}.0.0 <${+_ + 1}.0.0-0`)
              : q(M)
                ? (re = `>=${_}.${y}.0 <${_}.${+y + 1}.0-0`)
                : te
                  ? (i('replaceTilde pr', te),
                    (re = `>=${_}.${y}.${M}-${te} <${_}.${+y + 1}.0-0`))
                  : (re = `>=${_}.${y}.${M} <${_}.${+y + 1}.0-0`),
          i('tilde return', re),
          re
        );
      });
    },
    K = (P, S) =>
      P.trim()
        .split(/\s+/)
        .map(R => A(R, S))
        .join(' '),
    A = (P, S) => {
      i('caret', P, S);
      const R = S.loose ? l[a.CARETLOOSE] : l[a.CARET],
        N = S.includePrerelease ? '-0' : '';
      return P.replace(R, (_, y, M, te, re) => {
        i('caret', P, _, y, M, te, re);
        let he;
        return (
          q(y)
            ? (he = '')
            : q(M)
              ? (he = `>=${y}.0.0${N} <${+y + 1}.0.0-0`)
              : q(te)
                ? y === '0'
                  ? (he = `>=${y}.${M}.0${N} <${y}.${+M + 1}.0-0`)
                  : (he = `>=${y}.${M}.0${N} <${+y + 1}.0.0-0`)
                : re
                  ? (i('replaceCaret pr', re),
                    y === '0'
                      ? M === '0'
                        ? (he = `>=${y}.${M}.${te}-${re} <${y}.${M}.${+te + 1}-0`)
                        : (he = `>=${y}.${M}.${te}-${re} <${y}.${+M + 1}.0-0`)
                      : (he = `>=${y}.${M}.${te}-${re} <${+y + 1}.0.0-0`))
                  : (i('no pr'),
                    y === '0'
                      ? M === '0'
                        ? (he = `>=${y}.${M}.${te}${N} <${y}.${M}.${+te + 1}-0`)
                        : (he = `>=${y}.${M}.${te}${N} <${y}.${+M + 1}.0-0`)
                      : (he = `>=${y}.${M}.${te} <${+y + 1}.0.0-0`)),
          i('caret return', he),
          he
        );
      });
    },
    Y = (P, S) => (
      i('replaceXRanges', P, S),
      P.split(/\s+/)
        .map(R => Q(R, S))
        .join(' ')
    ),
    Q = (P, S) => {
      P = P.trim();
      const R = S.loose ? l[a.XRANGELOOSE] : l[a.XRANGE];
      return P.replace(R, (N, _, y, M, te, re) => {
        i('xRange', P, N, _, y, M, te, re);
        const he = q(y),
          Ue = he || q(M),
          $e = Ue || q(te),
          wt = $e;
        return (
          _ === '=' && wt && (_ = ''),
          (re = S.includePrerelease ? '-0' : ''),
          he
            ? _ === '>' || _ === '<'
              ? (N = '<0.0.0-0')
              : (N = '*')
            : _ && wt
              ? (Ue && (M = 0),
                (te = 0),
                _ === '>'
                  ? ((_ = '>='),
                    Ue
                      ? ((y = +y + 1), (M = 0), (te = 0))
                      : ((M = +M + 1), (te = 0)))
                  : _ === '<=' && ((_ = '<'), Ue ? (y = +y + 1) : (M = +M + 1)),
                _ === '<' && (re = '-0'),
                (N = `${_ + y}.${M}.${te}${re}`))
              : Ue
                ? (N = `>=${y}.0.0${re} <${+y + 1}.0.0-0`)
                : $e && (N = `>=${y}.${M}.0${re} <${y}.${+M + 1}.0-0`),
          i('xRange return', N),
          N
        );
      });
    },
    B = (P, S) => (i('replaceStars', P, S), P.trim().replace(l[a.STAR], '')),
    G = (P, S) => (
      i('replaceGTE0', P, S),
      P.trim().replace(l[S.includePrerelease ? a.GTE0PRE : a.GTE0], '')
    ),
    ue = P => (S, R, N, _, y, M, te, re, he, Ue, $e, wt) => (
      q(N)
        ? (R = '')
        : q(_)
          ? (R = `>=${N}.0.0${P ? '-0' : ''}`)
          : q(y)
            ? (R = `>=${N}.${_}.0${P ? '-0' : ''}`)
            : M
              ? (R = `>=${R}`)
              : (R = `>=${R}${P ? '-0' : ''}`),
      q(he)
        ? (re = '')
        : q(Ue)
          ? (re = `<${+he + 1}.0.0-0`)
          : q($e)
            ? (re = `<${he}.${+Ue + 1}.0-0`)
            : wt
              ? (re = `<=${he}.${Ue}.${$e}-${wt}`)
              : P
                ? (re = `<${he}.${Ue}.${+$e + 1}-0`)
                : (re = `<=${re}`),
      `${R} ${re}`.trim()
    ),
    z = (P, S, R) => {
      for (let N = 0; N < P.length; N++) if (!P[N].test(S)) return !1;
      if (S.prerelease.length && !R.includePrerelease) {
        for (let N = 0; N < P.length; N++)
          if (
            (i(P[N].semver),
            P[N].semver !== s.ANY && P[N].semver.prerelease.length > 0)
          ) {
            const _ = P[N].semver;
            if (
              _.major === S.major &&
              _.minor === S.minor &&
              _.patch === S.patch
            )
              return !0;
          }
        return !1;
      }
      return !0;
    };
  return bs;
}
const p1 = un,
  v1 = xi(),
  g1 = (e, t, n) => {
    let r = null,
      s = null,
      i = null;
    try {
      i = new v1(t, n);
    } catch {
      return null;
    }
    return (
      e.forEach(o => {
        i.test(o) &&
          (!r || s.compare(o) === -1) &&
          ((r = o), (s = new p1(r, n)));
      }),
      r
    );
  };
var m1 = g1;
const $l = Yr(m1),
  y1 = un,
  _1 = xi(),
  b1 = (e, t, n) => {
    let r = null,
      s = null,
      i = null;
    try {
      i = new _1(t, n);
    } catch {
      return null;
    }
    return (
      e.forEach(o => {
        i.test(o) &&
          (!r || s.compare(o) === 1) &&
          ((r = o), (s = new y1(r, n)));
      }),
      r
    );
  };
var C1 = b1;
const Ai = Yr(C1),
  xl = e => (Bn('data-v-bbf2956d'), (e = e()), Wn(), e),
  E1 = { class: 'footer' },
  w1 = { class: 'footer__item' },
  O1 = { class: 'footer__item' },
  S1 = ['title'],
  I1 = xl(() =>
    w(
      'svg',
      {
        width: '16',
        height: '16',
        viewBox: '0 0 16 16',
        fill: 'none',
        xmlns: 'http://www.w3.org/2000/svg',
      },
      [
        w('path', {
          'fill-rule': 'evenodd',
          'clip-rule': 'evenodd',
          d: 'M8.61 3L14.35 4.53L15 5V11.74L14.63 12.22L8.5 13.91L2.36 12.22L2 11.74V5L2.61 4.53L8.34 3H8.61ZM8.52 4L4.52 5L5.07 5.2L8.5 6.1L11.5 5.29L12.45 5L8.52 4ZM3 11.36L8 12.73V7L3 5.66V11.36ZM9 7V12.73L14 11.36V5.63L11.98 6.18348V8.75001L10.98 9.01001V6.45748L9 7Z',
          fill: 'currentColor',
        }),
      ],
      -1
    )
  ),
  $1 = { class: 'footer__item' },
  x1 = ['title'],
  A1 = xl(() =>
    w(
      'svg',
      {
        width: '16',
        height: '16',
        viewBox: '0 0 16 16',
        fill: 'none',
        xmlns: 'http://www.w3.org/2000/svg',
      },
      [
        w('path', {
          'fill-rule': 'evenodd',
          'clip-rule': 'evenodd',
          d: 'M2.00583 8.26691L0.78 9.50003L0 8.73003L2.09 6.66003L2.85 6.67003L4.94 8.79003L4.18 9.55003L3.01348 8.36995C3.2028 10.9586 5.363 13 8 13C9.91062 13 11.571 11.9283 12.4127 10.3533L13.226 10.9499C12.1959 12.7709 10.2415 14 8 14C4.77573 14 2.14547 11.4568 2.00583 8.26691ZM12.9961 7.80051L11.76 6.55005L11 7.31005L13.09 9.42005L13.85 9.43005L15.94 7.36005L15.19 6.60005L13.996 7.78004C13.8803 4.56823 11.2401 2 8 2C5.83727 2 3.94179 3.14427 2.88597 4.86043L3.69563 5.45436C4.56647 3.98506 6.1682 3 8 3C10.6946 3 12.8914 5.13157 12.9961 7.80051Z',
          fill: 'currentColor',
        }),
      ],
      -1
    )
  ),
  P1 = De({
    __name: 'ManageViewFooter',
    props: {
      installedPackages: { type: Array, required: !0 },
      installedPackagesTags: { type: Object, required: !0 },
      installedPackagesVersions: { type: Object, required: !0 },
    },
    emits: ['updateStart', 'updateEnd', 'updateAll'],
    setup(e, { emit: t }) {
      const n = t,
        r = e,
        s = vt(),
        i = $t('vscode'),
        o = ee(() =>
          r.installedPackages.reduce(
            (h, v) => (v.isDevDependency ? h : h + 1),
            0
          )
        );
      ee(() => r.installedPackages.length - o.value);
      const l = ee(() =>
          r.installedPackages
            .map(h => {
              const v = r.installedPackagesVersions[h.name] || [];
              return (h.maxSatisfyingVersion = $l(v, h.version)), h;
            })
            .filter(h => {
              var I;
              const v = r.installedPackagesVersions[h.name] || [],
                g =
                  Ai(v, h.version) ||
                  ((I = Ct(h.version)) == null ? void 0 : I.raw) ||
                  '0.0.0';
              return (
                typeof h.maxSatisfyingVersion == 'string' &&
                h.maxSatisfyingVersion !== g
              );
            })
        ),
        a = ee(() => l.value.length);
      ee(() =>
        l.value.map(h => ({
          ...h,
          version: r.installedPackagesTags[h.name].latest,
        }))
      );
      const c = async () => {
          if (a.value === 0) return;
          (await (i == null
            ? void 0
            : i.fetch.post('/update-confirmation'))) === 'Update all' &&
            n('updateAll', l.value);
        },
        u = h => s.commit('navigate', h),
        d = ee(() => Hn(s.getters.totalGZIPSize));
      return (h, v) => (
        U(),
        Z('div', E1, [
          w('div', w1, [
            w(
              'a',
              {
                class: 'footer__item-link',
                role: 'button',
                'aria-label': 'Size view',
                onClick:
                  v[0] ||
                  (v[0] = g =>
                    u(
                      J(s).state.view === J(Se).Analyze
                        ? J(Se).Manage
                        : J(Se).Analyze
                    )),
              },
              [
                w(
                  'div',
                  null,
                  Ee(d.value.size.toFixed(1)) + ' ' + Ee(d.value.unit),
                  1
                ),
              ]
            ),
          ]),
          w('div', O1, [
            w(
              'a',
              {
                class: 'footer__item-link',
                role: 'button',
                title: `${o.value} ${o.value === 1 ? 'dependency' : 'dependencies'}`,
              },
              [I1, zn(' ' + Ee(o.value), 1)],
              8,
              S1
            ),
          ]),
          w('div', $1, [
            w(
              'a',
              {
                onClick: c,
                class: 'footer__item-link',
                role: 'button',
                title: `${a.value} outdated ${a.value === 1 ? 'dependency' : 'dependencies'}`,
              },
              [A1, zn(' ' + Ee(a.value), 1)],
              8,
              x1
            ),
          ]),
        ])
      );
    },
  }),
  L1 = Ae(P1, [['__scopeId', 'data-v-bbf2956d']]),
  R1 = {
    key: 0,
    class:
      'grid grid-cols-[32px_1fr_32px] justify-items-center items-center px-3 border-b border-b-[color:var(--vscode-panel-border)]',
  },
  T1 = w(
    'svg',
    { width: '16', height: '16', viewBox: '0 0 16 16' },
    [
      w('path', {
        fill: 'currentColor',
        'fill-rule': 'evenodd',
        d: 'm7 3.093l-5 5V8.8l5 5l.707-.707l-4.146-4.147H14v-1H3.56L7.708 3.8L7 3.093z',
        'clip-rule': 'evenodd',
      }),
    ],
    -1
  ),
  M1 = [T1],
  N1 = w(
    'div',
    { class: 'uppercase tracking-wider text-xs font-bold' },
    'Analyze',
    -1
  ),
  F1 = De({
    __name: 'NavBar',
    setup(e) {
      const t = vt(),
        n = ee(() => t.state.view),
        r = s => t.commit('navigate', s);
      return (s, i) =>
        n.value === J(Se).Analyze
          ? (U(),
            Z('div', R1, [
              w(
                'a',
                {
                  class: 'flex items-center h-8 w-8',
                  onClick: i[0] || (i[0] = o => r(J(Se).Manage)),
                  role: 'button',
                  'aria-label': 'Go back',
                },
                M1
              ),
              N1,
            ]))
          : le('', !0);
    },
  }),
  k1 = De({
    name: 'Stat',
    props: {
      type: { type: String },
      label: { type: String },
      value: { type: Number, required: !0 },
    },
    setup(e) {
      const t = ee(() =>
          e.type === 'size'
            ? parseFloat(Hn(e.value).size.toFixed(1))
            : parseFloat(Ao(e.value).size.toFixed(2))
        ),
        n = ee(() => (e.type === 'size' ? Hn(e.value).unit : Ao(e.value).unit));
      return { value: t, unit: n };
    },
  }),
  D1 = { class: 'stat' },
  j1 = { class: 'value' },
  U1 = { class: 'unit' };
function V1(e, t, n, r, s, i) {
  return (
    U(),
    Z('div', D1, [
      w('span', j1, Ee(e.value), 1),
      zn(),
      w('span', U1, Ee(e.unit), 1),
    ])
  );
}
const Ut = Ae(k1, [
    ['render', V1],
    ['__scopeId', 'data-v-0820d0f4'],
  ]),
  Q1 = w('div', null, null, -1),
  q1 = De({
    __name: 'AnalyzeViewFooter',
    props: { sizeInfo: { type: Object, required: !0 } },
    setup(e) {
      const t = vt(),
        n = ee(() => t.state.config.analyze.columns),
        r = e,
        s = ee(() => Object.values(r.sizeInfo).reduce((o, l) => o + l.size, 0)),
        i = ee(() => Object.values(r.sizeInfo).reduce((o, l) => o + l.gzip, 0));
      return (o, l) => (
        U(),
        Z(
          'div',
          {
            class:
              'px-3 py-2 grid text-xs border-t mt-2 border-t-[color:var(--vscode-panel-border)]',
            style: ht({ gridTemplateColumns: `1fr ${n.value.length * 65}px` }),
          },
          [
            Q1,
            w(
              'div',
              {
                class: 'grid',
                style: ht({
                  gridTemplateColumns: `repeat(${n.value.length}, minmax(0, 1fr))`,
                }),
              },
              [
                n.value.includes('min')
                  ? (U(),
                    Pe(
                      Ut,
                      { key: 0, value: s.value, type: 'size', label: 'Min' },
                      null,
                      8,
                      ['value']
                    ))
                  : le('', !0),
                n.value.includes('gzip')
                  ? (U(),
                    Pe(
                      Ut,
                      {
                        key: 1,
                        value: i.value,
                        type: 'size',
                        label: 'Min + GZIP',
                      },
                      null,
                      8,
                      ['value']
                    ))
                  : le('', !0),
                n.value.includes('slow3G')
                  ? (U(),
                    Pe(
                      Ut,
                      {
                        key: 2,
                        value: J(Pr)(i.value).slow3G,
                        type: 'time',
                        label: 'Slow 3G',
                      },
                      null,
                      8,
                      ['value']
                    ))
                  : le('', !0),
                n.value.includes('slow4G')
                  ? (U(),
                    Pe(
                      Ut,
                      {
                        key: 3,
                        value: J(Pr)(i.value).slow4G,
                        type: 'time',
                        label: 'Slow 4G',
                      },
                      null,
                      8,
                      ['value']
                    ))
                  : le('', !0),
              ],
              4
            ),
          ],
          4
        )
      );
    },
  }),
  z1 = De({ name: 'EmptyView' }),
  G1 = { class: 'empty' };
function H1(e, t, n, r, s, i) {
  return U(), Z('div', G1, 'No package.json files found.');
}
const K1 = Ae(z1, [
    ['render', H1],
    ['__scopeId', 'data-v-13b07066'],
  ]),
  B1 = De({
    name: 'TableHeader',
    props: {
      label: { type: String, required: !0 },
      type: { type: String, required: !0 },
    },
    setup() {
      const e = vt();
      return {
        Order: jt,
        sort: ee(() => e.state.analyzeSort),
        order: ee(() => e.state.analyzeOrder),
        setAnalyzeSort: t => {
          e.commit('setAnalyzeSort', t);
        },
      };
    },
  }),
  W1 = e => (Bn('data-v-05ebc449'), (e = e()), Wn(), e),
  J1 = W1(() =>
    w(
      'path',
      {
        d: 'M2 5.55973L2.41344 5L13.6067 5L14 5.53925L8.37311 11H7.54622L2 5.55973Z',
        fill: '#C5C5C5',
      },
      null,
      -1
    )
  ),
  X1 = [J1];
function Z1(e, t, n, r, s, i) {
  return (
    U(),
    Z('div', { onClick: t[0] || (t[0] = o => e.setAnalyzeSort(e.type)) }, [
      e.type === e.sort
        ? (U(),
          Z(
            'svg',
            {
              key: 0,
              class: Te({
                'sort-icon': !0,
                'sort-icon--asc': e.order === e.Order.Ascending,
                'sort-icon--desc': e.order === e.Order.Descending,
              }),
              width: '10',
              height: '10',
              viewBox: '0 0 16 16',
              fill: 'none',
              xmlns: 'http://www.w3.org/2000/svg',
            },
            X1,
            2
          ))
        : le('', !0),
      zn(' ' + Ee(e.label), 1),
    ])
  );
}
const dr = Ae(B1, [
    ['render', Z1],
    ['__scopeId', 'data-v-05ebc449'],
  ]),
  Y1 = w('div', null, null, -1),
  ep = De({
    __name: 'AnalyzeViewHeader',
    setup(e) {
      const t = vt(),
        n = ee(() => t.state.config.analyze.columns);
      return (r, s) => (
        U(),
        Z(
          'div',
          {
            class: 'grid mt-2',
            style: ht({ gridTemplateColumns: `1fr ${n.value.length * 65}px` }),
          },
          [
            Y1,
            w(
              'div',
              {
                class:
                  'grid justify-items-end uppercase text-[11px] font-medium',
                style: ht({
                  gridTemplateColumns: `repeat(${n.value.length}, minmax(0, 1fr))`,
                }),
              },
              [
                n.value.includes('min')
                  ? (U(),
                    Pe(dr, { key: 0, label: 'Min', type: J(vn).Min }, null, 8, [
                      'type',
                    ]))
                  : le('', !0),
                n.value.includes('gzip')
                  ? (U(),
                    Pe(
                      dr,
                      { key: 1, label: 'GZIP', type: J(vn).GZIP },
                      null,
                      8,
                      ['type']
                    ))
                  : le('', !0),
                n.value.includes('slow3G')
                  ? (U(),
                    Pe(
                      dr,
                      { key: 2, label: 'Slow 3G', type: J(vn).Slow3G },
                      null,
                      8,
                      ['type']
                    ))
                  : le('', !0),
                n.value.includes('slow4G')
                  ? (U(),
                    Pe(
                      dr,
                      { key: 3, label: 'Slow 4G', type: J(vn).Slow4G },
                      null,
                      8,
                      ['type']
                    ))
                  : le('', !0),
              ],
              4
            ),
          ],
          4
        )
      );
    },
  }),
  tp = De({ name: 'SearchIcon' }),
  np = {
    xmlns: 'http://www.w3.org/2000/svg',
    'aria-hidden': 'true',
    role: 'img',
    width: '16',
    height: '16',
    viewBox: '0 0 24 24',
  },
  rp = w(
    'path',
    {
      fill: 'currentColor',
      d: 'M21.71 20.29L18 16.61A9 9 0 1 0 16.61 18l3.68 3.68a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.39zM11 18a7 7 0 1 1 7-7 7 7 0 0 1-7 7z',
    },
    null,
    -1
  ),
  sp = [rp];
function ip(e, t, n, r, s, i) {
  return U(), Z('svg', np, sp);
}
const op = Ae(tp, [['render', ip]]),
  ap = De({ name: 'Loader' }),
  lp = { class: 'container' },
  cp = Mu(
    '<svg width="12" height="12" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" data-v-8fc50dae><g fill="none" fill-rule="evenodd" data-v-8fc50dae><g transform="translate(1 1)" stroke-width="2" data-v-8fc50dae><circle stroke-opacity=".5" cx="18" cy="18" r="18" data-v-8fc50dae></circle><path d="M36 18c0-9.94-8.06-18-18-18" data-v-8fc50dae><animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="1s" repeatCount="indefinite" data-v-8fc50dae></animateTransform></path></g></g></svg>',
    1
  ),
  up = [cp];
function fp(e, t, n, r, s, i) {
  return U(), Z('div', lp, up);
}
const Al = Ae(ap, [
    ['render', fp],
    ['__scopeId', 'data-v-8fc50dae'],
  ]),
  dp = {},
  hp = {
    height: '16',
    viewBox: '0 0 92 24',
    fill: 'currentColor',
    xmlns: 'http://www.w3.org/2000/svg',
  },
  pp = w(
    'path',
    {
      d: 'M44.925 18.804C40.539 18.824 40.539 15.264 40.539 14.698L40.532 1.362L43.207 0.938004V14.192C43.207 14.514 43.207 16.55 44.925 16.556V18.804ZM34.079 16.624C34.9 16.624 35.509 16.577 35.934 16.495V13.776C35.4197 13.644 34.8909 13.5771 34.36 13.577C34.0596 13.5763 33.7597 13.5994 33.463 13.646C33.1807 13.6826 32.906 13.7636 32.649 13.886C32.409 14.002 32.21 14.166 32.067 14.377C31.917 14.589 31.848 14.712 31.848 15.033C31.848 15.661 32.067 16.024 32.464 16.263C32.861 16.502 33.402 16.624 34.079 16.624ZM33.846 6.924C34.729 6.924 35.475 7.033 36.077 7.252C36.679 7.47 37.165 7.777 37.521 8.167C37.884 8.563 38.13 9.089 38.281 9.65C38.438 10.21 38.513 10.825 38.513 11.5V18.374C37.8935 18.4968 37.2706 18.6015 36.645 18.688C35.811 18.811 34.873 18.873 33.832 18.873C33.142 18.873 32.505 18.804 31.937 18.675C31.4088 18.5644 30.9084 18.348 30.466 18.039C30.0617 17.7438 29.7353 17.3546 29.515 16.905C29.289 16.44 29.172 15.785 29.172 15.102C29.172 14.446 29.302 14.029 29.556 13.577C29.8122 13.1304 30.1711 12.7512 30.603 12.471C31.048 12.184 31.553 11.979 32.135 11.856C32.7336 11.7313 33.3436 11.6693 33.955 11.671C34.6195 11.6728 35.2815 11.7533 35.927 11.911V11.473C35.927 11.166 35.892 10.873 35.817 10.599C35.7446 10.3302 35.6135 10.0809 35.433 9.869C35.2364 9.64706 34.9876 9.47762 34.709 9.376C34.3439 9.23774 33.9564 9.16824 33.566 9.171C32.95 9.171 32.389 9.246 31.876 9.335C31.4481 9.40189 31.0267 9.50458 30.616 9.642L30.295 7.45C30.63 7.333 31.129 7.217 31.773 7.101C32.4568 6.97619 33.1509 6.91759 33.846 6.924ZM86.688 16.55C87.51 16.55 88.118 16.502 88.542 16.42V13.7C88.0277 13.5681 87.4989 13.5012 86.968 13.501C86.674 13.501 86.373 13.522 86.072 13.57C85.7897 13.6066 85.515 13.6876 85.258 13.81C85.024 13.9193 84.8231 14.0887 84.676 14.301C84.526 14.513 84.458 14.636 84.458 14.957C84.458 15.585 84.676 15.948 85.073 16.187C85.477 16.432 86.011 16.55 86.688 16.55ZM86.462 6.856C87.345 6.856 88.091 6.964 88.693 7.183C89.295 7.402 89.781 7.709 90.137 8.098C90.492 8.488 90.746 9.021 90.896 9.581C91.0584 10.1847 91.1368 10.8079 91.129 11.433V18.306C90.719 18.394 90.095 18.496 89.261 18.62C88.427 18.743 87.489 18.804 86.448 18.804C85.758 18.804 85.121 18.736 84.553 18.606C84.0249 18.4957 83.5245 18.2797 83.082 17.971C82.6777 17.6758 82.3513 17.2866 82.131 16.837C81.905 16.372 81.788 15.717 81.788 15.033C81.788 14.377 81.918 13.96 82.172 13.509C82.432 13.059 82.78 12.689 83.219 12.402C83.664 12.116 84.169 11.911 84.751 11.788C85.6555 11.6006 86.5839 11.5567 87.502 11.658C87.831 11.692 88.173 11.754 88.542 11.843V11.406C88.545 11.1108 88.5083 10.8165 88.433 10.531C88.361 10.2618 88.2298 10.0121 88.049 9.8C87.8523 9.57842 87.6034 9.40933 87.325 9.308C86.9599 9.16976 86.5724 9.10026 86.182 9.103C85.566 9.103 85.005 9.178 84.492 9.267C84.0642 9.33396 83.6427 9.43665 83.232 9.574L82.911 7.381C83.246 7.265 83.745 7.149 84.389 7.033C85.0733 6.91221 85.7671 6.85297 86.462 6.856ZM78.428 5.585C77.9974 5.58554 77.5843 5.41528 77.2791 5.11159C76.9739 4.80789 76.8016 4.39555 76.8 3.965C76.8 3.07 77.525 2.345 78.428 2.345C79.332 2.345 80.058 3.07 80.058 3.965C80.058 4.86 79.325 5.585 78.428 5.585ZM79.776 18.805H77.087V7.27L79.777 6.847V18.803L79.776 18.805ZM75.062 18.805C70.676 18.825 70.676 15.265 70.676 14.698L70.668 1.362L73.344 0.938004V14.192C73.344 14.514 73.344 16.55 75.062 16.556V18.805ZM66.364 12.902C66.364 11.746 66.111 10.783 65.618 10.114C65.125 9.437 64.435 9.104 63.551 9.104C62.669 9.104 61.977 9.437 61.486 10.114C60.993 10.79 60.753 11.746 60.753 12.902C60.753 14.07 60.999 14.855 61.493 15.532C61.985 16.215 62.676 16.55 63.559 16.55C64.441 16.55 65.133 16.208 65.626 15.531C66.118 14.848 66.364 14.071 66.364 12.901V12.902ZM69.101 12.895C69.101 13.797 68.971 14.479 68.704 15.225C68.4606 15.93 68.0769 16.5784 67.576 17.131C67.0872 17.6605 66.4895 18.0777 65.824 18.354C65.139 18.64 64.085 18.804 63.559 18.804C63.031 18.798 61.985 18.647 61.307 18.354C60.646 18.0737 60.0517 17.657 59.563 17.131C59.076 16.604 58.7 15.969 58.426 15.225C58.1445 14.4809 58.0054 13.6905 58.016 12.895C58.016 11.993 58.139 11.125 58.413 10.387C58.6655 9.68555 59.0566 9.0421 59.563 8.495C60.0548 7.97171 60.651 7.55745 61.313 7.279C61.992 6.992 62.738 6.856 63.545 6.856C64.353 6.856 65.098 6.998 65.782 7.279C66.4489 7.55008 67.0475 7.96534 67.535 8.495C68.0341 9.04486 68.4198 9.68781 68.67 10.387C68.957 11.125 69.101 11.993 69.101 12.895ZM48.963 12.895C48.963 14.015 49.209 15.258 49.701 15.777C50.194 16.297 50.831 16.557 51.611 16.557C52.035 16.557 52.439 16.495 52.815 16.379C53.192 16.263 53.492 16.126 53.732 15.962V9.33C53.1508 9.20469 52.56 9.12909 51.966 9.104C50.995 9.076 50.256 9.474 49.736 10.108C49.223 10.744 48.963 11.857 48.963 12.895ZM56.401 18.169C56.401 19.993 55.935 21.325 54.997 22.173C54.061 23.019 52.63 23.443 50.701 23.443C49.996 23.443 48.531 23.306 47.361 23.047L47.792 20.929C48.772 21.134 50.064 21.189 50.742 21.189C51.816 21.189 52.582 20.97 53.041 20.533C53.5 20.096 53.725 19.447 53.725 18.585V18.148C53.3856 18.3044 53.0358 18.4371 52.678 18.545C52.248 18.675 51.748 18.743 51.186 18.743C50.447 18.743 49.776 18.627 49.168 18.394C48.5753 18.1744 48.0397 17.8241 47.601 17.369C47.17 16.919 46.827 16.352 46.588 15.675C46.348 14.998 46.225 13.79 46.225 12.902C46.225 12.068 46.355 11.022 46.609 10.325C46.869 9.629 47.238 9.027 47.738 8.529C48.231 8.031 48.833 7.648 49.538 7.367C50.3114 7.06331 51.1351 6.90827 51.966 6.91C52.836 6.91 53.636 7.019 54.416 7.15C55.196 7.279 55.86 7.415 56.401 7.565V18.169Z',
    },
    null,
    -1
  ),
  vp = w(
    'path',
    {
      'fill-rule': 'evenodd',
      'clip-rule': 'evenodd',
      d: 'M2.988 0.938H19.582C20.3685 0.93853 21.1226 1.25119 21.6787 1.80731C22.2348 2.36342 22.5475 3.11753 22.548 3.904V20.5C22.5472 21.2862 22.2344 22.04 21.6783 22.5957C21.1222 23.1514 20.3682 23.4637 19.582 23.464H2.988C2.20179 23.4637 1.44784 23.1514 0.891724 22.5957C0.335606 22.04 0.0227981 21.2862 0.0220032 20.5V3.897C0.0222654 3.5079 0.0992092 3.12267 0.248444 2.76333C0.397678 2.40399 0.616273 2.07759 0.891731 1.80278C1.16719 1.52797 1.49411 1.31015 1.8538 1.16177C2.21349 1.01338 2.5989 0.937343 2.988 0.938ZM13.632 5.195V5.967C13.632 6.057 13.55 6.117 13.468 6.097C12.846 5.926 12.201 5.838 11.551 5.838C10.8798 5.83744 10.2119 5.93171 9.56702 6.118C9.47802 6.138 9.39603 6.076 9.39603 5.988V5.195C9.39629 4.93579 9.49944 4.68729 9.68282 4.5041C9.86621 4.3209 10.1148 4.218 10.374 4.218H12.654C12.9132 4.218 13.1618 4.3209 13.3452 4.5041C13.5286 4.68729 13.6318 4.93579 13.632 5.195ZM6.99403 6.588L7.38403 6.977C7.43903 7.04 7.43202 7.135 7.36402 7.177C7.04902 7.402 6.76203 7.648 6.48103 7.928C6.20703 8.201 5.96102 8.495 5.73502 8.802C5.68002 8.863 5.59202 8.877 5.53002 8.816L5.14703 8.433C5.05608 8.34258 4.9839 8.23507 4.93465 8.11665C4.8854 7.99824 4.86005 7.87125 4.86005 7.743C4.86005 7.61475 4.8854 7.48777 4.93465 7.36935C4.9839 7.25094 5.05608 7.14343 5.14703 7.053L5.61202 6.588C5.70275 6.49723 5.81047 6.42523 5.92904 6.3761C6.0476 6.32697 6.17469 6.30169 6.30302 6.30169C6.43136 6.30169 6.55845 6.32697 6.67701 6.3761C6.79557 6.42523 6.9033 6.49723 6.99403 6.588ZM11.544 12.771V9.43L11.545 9.431C11.545 9.355 11.613 9.301 11.681 9.301C12.3109 9.32351 12.9246 9.50678 13.4637 9.83339C14.0028 10.16 14.4494 10.6191 14.761 11.167C14.795 11.234 14.774 11.317 14.706 11.351L11.736 12.888C11.648 12.936 11.544 12.867 11.544 12.771ZM8.37265 16.167C9.2143 17.0072 10.3549 17.479 11.5441 17.479C12.1333 17.4798 12.7168 17.3644 13.2614 17.1396C13.8059 16.9147 14.3009 16.5847 14.7179 16.1685C15.1349 15.7523 15.4657 15.2579 15.6916 14.7137C15.9174 14.1695 16.0338 13.5862 16.034 12.997C16.0324 11.8076 15.5588 10.6674 14.717 9.82703C13.8753 8.98664 12.7344 8.51474 11.545 8.515C10.3554 8.51447 9.21428 8.98626 8.37235 9.82668C7.53043 10.6671 7.05661 11.8074 7.05502 12.997C7.05688 14.1865 7.53078 15.3267 8.37265 16.167ZM7.04364 8.49312C8.23722 7.29955 9.85605 6.629 11.544 6.629L11.545 6.63C12.3812 6.62829 13.2096 6.79155 13.9826 7.11043C14.7556 7.42931 15.4581 7.89754 16.0499 8.48832C16.6417 9.0791 17.1112 9.78081 17.4314 10.5533C17.7516 11.3257 17.9163 12.1538 17.916 12.99C17.9158 13.8265 17.7507 14.6548 17.4304 15.4275C17.11 16.2003 16.6406 16.9024 16.0489 17.4937C15.4572 18.085 14.7548 18.554 13.9819 18.8739C13.2089 19.1938 12.3805 19.3583 11.544 19.358C9.85605 19.358 8.23722 18.6875 7.04364 17.4939C5.85006 16.3003 5.17952 14.6815 5.17952 12.9935C5.17952 11.3055 5.85006 9.6867 7.04364 8.49312Z',
    },
    null,
    -1
  ),
  gp = [pp, vp];
function mp(e, t) {
  return U(), Z('svg', hp, gp);
}
const yp = Ae(dp, [['render', mp]]);
function _p() {
  return $t('vscode');
}
const bp = {},
  Cp = { viewBox: '0 0 16 16' },
  Ep = w(
    'path',
    {
      fill: 'currentColor',
      'fill-rule': 'evenodd',
      d: 'M11.957 6h.05a2.99 2.99 0 0 1 2.116.879a3.003 3.003 0 0 1 0 4.242a2.99 2.99 0 0 1-2.117.879v-1a2.002 2.002 0 0 0 0-4h-.914l-.123-.857a2.49 2.49 0 0 0-2.126-2.122A2.478 2.478 0 0 0 6.231 5.5l-.333.762l-.809-.189A2.49 2.49 0 0 0 4.523 6c-.662 0-1.297.263-1.764.732A2.503 2.503 0 0 0 4.523 11h.498v1h-.498a3.486 3.486 0 0 1-2.628-1.16a3.502 3.502 0 0 1 1.958-5.78a3.462 3.462 0 0 1 1.468.04a3.486 3.486 0 0 1 3.657-2.06A3.479 3.479 0 0 1 11.957 6zm-5.25 5.121l1.314 1.314V7h.994v5.4l1.278-1.279l.707.707l-2.146 2.147h-.708L6 11.829l.707-.708z',
      'clip-rule': 'evenodd',
    },
    null,
    -1
  ),
  wp = [Ep];
function Op(e, t) {
  return U(), Z('svg', Cp, wp);
}
const Sp = Ae(bp, [['render', Op]]),
  Ip = De({ name: 'WeightIcon' }),
  $p = {
    width: '16',
    height: '16',
    viewBox: '0 0 16 16',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
  },
  xp = w(
    'path',
    {
      d: 'M15.9471 13.9331L13.6649 4.80406C13.5461 4.32937 13.1511 4.00031 12.7002 4.00031H9.98958C10.3061 3.58125 10.5008 3.06531 10.5008 2.5C10.5008 1.11937 9.38145 0 8.00083 0C6.6202 0 5.50083 1.11937 5.50083 2.5C5.50083 3.06531 5.69552 3.58125 6.01208 4H3.30145C2.85052 4 2.4552 4.32938 2.33677 4.80375L0.0545784 13.9331C-0.205734 14.9741 0.512703 16 1.50177 16H14.5002C15.489 16 16.2074 14.9741 15.9471 13.9331V13.9331ZM6.50083 2.5C6.50083 1.67281 7.17364 1 8.00083 1C8.82802 1 9.50083 1.67281 9.50083 2.5C9.50083 3.32719 8.82802 4 8.00083 4C7.17364 4 6.50083 3.32719 6.50083 2.5ZM14.853 14.81C14.7852 14.8966 14.6693 15 14.4999 15H1.50177C1.33239 15 1.21645 14.8969 1.14864 14.81C1.01458 14.6384 0.968328 14.4012 1.02489 14.1756L3.30708 5.04656C3.31364 5.02063 3.32333 5.00531 3.32052 5.00031H12.674C12.6802 5.00844 12.6886 5.02281 12.6946 5.04656L14.9768 14.1756C15.0333 14.4012 14.9871 14.6384 14.853 14.81V14.81Z',
      fill: 'currentColor',
    },
    null,
    -1
  ),
  Ap = [xp];
function Pp(e, t, n, r, s, i) {
  return U(), Z('svg', $p, Ap);
}
const Lp = Ae(Ip, [['render', Pp]]),
  Rp = De({ name: 'FlameIcon' }),
  Tp = {
    width: '16',
    height: '16',
    viewBox: '0 0 16 16',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
  },
  Mp = w(
    'path',
    {
      d: 'M9.12994 15L8.59994 14.23C8.88894 13.8519 9.0211 13.3769 8.96895 12.9039C8.9168 12.4308 8.68436 11.9961 8.31994 11.69C7.70737 11.1781 7.28762 10.4726 7.12994 9.69C5.56994 11.92 6.37994 13.15 7.12994 14.24L6.57994 15C5.53554 14.8032 4.59766 14.2351 3.93959 13.4005C3.28152 12.566 2.94775 11.5215 2.99994 10.46C2.99994 10.46 2.78994 8.3 5.27994 6.19C5.27994 6.19 8.09994 3.58 7.11994 1.65L7.82994 1C8.91313 1.75952 9.7418 2.82836 10.2075 4.06664C10.6732 5.30491 10.7542 6.65492 10.4399 7.94C10.6771 7.70862 10.8672 7.43357 10.9999 7.13L11.8699 7.06C11.9399 7.18 13.7099 9.99 12.7599 12.36C12.4216 13.0668 11.9126 13.6782 11.2788 14.1391C10.6451 14.6 9.9066 14.8959 9.12994 15V15ZM7.12994 8.05L7.99994 8.44C7.95356 8.89619 8.01237 9.35695 8.17186 9.78687C8.33134 10.2168 8.58726 10.6044 8.91994 10.92C9.34857 11.2323 9.67322 11.6664 9.85159 12.1658C10.03 12.6653 10.0538 13.2068 9.91994 13.72C10.3333 13.5752 10.713 13.3482 11.0361 13.0526C11.3593 12.7569 11.6191 12.3989 11.7999 12C12.1395 10.7826 11.9924 9.48096 11.3899 8.37C11.2006 8.67719 10.9254 8.92228 10.5985 9.07509C10.2716 9.22789 9.90709 9.28174 9.54994 9.23L9.19994 8.55C9.63797 7.60276 9.78716 6.54744 9.62887 5.5159C9.47058 4.48435 9.01183 3.52232 8.30994 2.75C8.16994 4.87 5.99994 6.83 5.92994 6.94C3.85994 8.7 3.99994 10.33 3.99994 10.4C3.96089 11.0176 4.08772 11.6344 4.36729 12.1865C4.64686 12.7387 5.06899 13.2059 5.58994 13.54C4.99994 12.14 4.99994 10.46 7.15994 8.05H7.12994Z',
      fill: 'currentColor',
    },
    null,
    -1
  ),
  Np = [Mp];
function Fp(e, t, n, r, s, i) {
  return U(), Z('svg', Tp, Np);
}
const kp = Ae(Rp, [['render', Fp]]),
  qe = e => (Bn('data-v-49af20aa'), (e = e()), Wn(), e),
  Dp = { class: 'autocomplete' },
  jp = { class: 'search-input' },
  Up = ['value', 'onKeyup', 'onKeydown'],
  Vp = { key: 0, class: 'results__loading' },
  Qp = qe(() => w('span', null, 'Fetching suggestions...', -1)),
  qp = { key: 1, class: 'results__empty' },
  zp = qe(() => w('span', null, 'No results...', -1)),
  Gp = [zp],
  Hp = ['onMouseenter'],
  Kp = { class: 'results__item--version' },
  Bp = ['textContent'],
  Wp = ['textContent'],
  Jp = ['onMouseenter'],
  Xp = { class: 'results__item-header' },
  Zp = ['innerHTML'],
  Yp = ['title'],
  ev = {
    key: 0,
    width: '14',
    height: '14',
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: '0 0 256 256',
  },
  tv = qe(() =>
    w('rect', { fill: '#3178c6', width: '256', height: '256' }, null, -1)
  ),
  nv = qe(() =>
    w(
      'rect',
      { x: '6', y: '6', fill: '#ffffff', width: '244', height: '244' },
      null,
      -1
    )
  ),
  rv = qe(() =>
    w(
      'path',
      {
        fill: '#3178c6',
        d: `M41.8,111.5c8.6-1.6,19.9-2.5,31.8-2.5c19.7,0,32.6,4.2,42.6,13c10.8,9.4,17.6,24.5,17.6,46
	c0,23.4-7.3,39.5-17.3,49.5c-11,10.7-27.6,15.8-48,15.8c-12.2,0-20.8-0.9-26.7-1.8V111.5z M65.4,211.2c2,0.5,5.2,0.5,8.2,0.5
	c21.3,0.2,35.2-13.6,35.2-42.7c0.2-25.4-12.5-38.8-32.7-38.8c-5.2,0-8.6,0.5-10.6,1.1V211.2z`,
      },
      null,
      -1
    )
  ),
  sv = qe(() =>
    w(
      'path',
      {
        fill: '#3178c6',
        d: 'M169.4,134.7h-32.2v-22.8h92.3v22.8h-32.8V232h-27.3V134.7z',
      },
      null,
      -1
    )
  ),
  iv = [tv, nv, rv, sv],
  ov = {
    key: 1,
    width: '14',
    height: '14',
    viewBox: '0 0 256 256',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
  },
  av = qe(() =>
    w('path', { d: 'M256 0H0V256H256V0Z', fill: '#3178C6' }, null, -1)
  ),
  lv = qe(() =>
    w(
      'path',
      {
        'fill-rule': 'evenodd',
        'clip-rule': 'evenodd',
        d: 'M150.5 200.5V228.1C155 230.4 160.3 232.1 166.4 233.3C172.5 234.5 179 235 185.8 235C192.4 235 198.7 234.4 204.7 233.1C210.7 231.8 215.9 229.7 220.4 226.8C224.9 223.9 228.4 220.1 231.1 215.4C233.7 210.7 235 204.9 235 198C235 193 234.3 188.6 232.8 184.8C231.3 181 229.1 177.7 226.3 174.7C223.5 171.8 220.1 169.1 216.2 166.8C212.3 164.5 207.8 162.3 202.9 160.2C199.3 158.7 196 157.3 193.1 155.8C190.2 154.4 187.8 153 185.8 151.5C183.8 150 182.2 148.5 181.1 146.8C180 145.1 179.5 143.3 179.5 141.2C179.5 139.3 180 137.6 181 136.1C182 134.6 183.4 133.3 185.1 132.2C186.9 131.1 189.1 130.3 191.7 129.7C194.3 129.1 197.2 128.8 200.3 128.8C202.6 128.8 205 129 207.6 129.3C210.2 129.6 212.7 130.2 215.3 130.9C217.9 131.6 220.4 132.5 222.9 133.6C225.3 134.7 227.6 136 229.7 137.4V111.6C225.5 110 220.9 108.8 215.9 108C210.9 107.2 205.2 106.8 198.8 106.8C192.2 106.8 186 107.5 180.1 108.9C174.2 110.3 169.1 112.5 164.6 115.5C160.1 118.5 156.6 122.3 154 126.9C151.4 131.5 150.1 137.1 150.1 143.5C150.1 151.7 152.5 158.7 157.2 164.6C162 170.4 169.2 175.3 178.8 179.4C182.6 181 186.1 182.5 189.4 184C192.7 185.5 195.5 187 197.9 188.7C200.3 190.4 202.2 192.1 203.6 194C205 195.9 205.7 198.1 205.7 200.5C205.7 202.3 205.3 203.9 204.4 205.5C203.5 207 202.2 208.3 200.5 209.5C198.8 210.7 196.6 211.5 193.9 212.1C191.2 212.7 188.2 213 184.7 213C178.7 213 172.8 211.9 166.9 209.8C161 207.8 155.5 204.7 150.5 200.5ZM104.5 131.7H140V109H41V131.7H76.3V233H104.4V131.7H104.5Z',
        fill: 'white',
      },
      null,
      -1
    )
  ),
  cv = [av, lv],
  uv = { key: 0, class: 'results__item-description' },
  fv = {
    class:
      'flex items-center text-[color:var(--vscode-descriptionForeground)] text-xs mt-1',
  },
  dv = { class: 'ml-1' },
  hv = { class: 'ml-1' },
  pv = qe(() => w('span', { class: 'ml-1' }, 'Deprecated', -1)),
  vv = { key: 2, class: 'results__error' },
  gv = qe(() =>
    w(
      'span',
      null,
      ' The suggestions service is not responding. Please try again later. ',
      -1
    )
  ),
  mv = [gv],
  yv = { key: 3, class: 'results__shortcuts' },
  _v = {
    key: 0,
    class:
      'px-3 mb-0.5 border-t opacity-50 border-[color:var(--vscode-focusBorder)] codesandbox:border-[color:var(--vscode-sideBySideEditor-horizontalBorder)]',
  },
  bv = { key: 1, class: 'results__shortcut px-3' },
  Cv = qe(() => w('div', null, 'Show versions', -1)),
  Ev = qe(() =>
    w('div', { class: 'results__shortcut-keys' }, [w('kbd', null, '@')], -1)
  ),
  wv = [Cv, Ev],
  Ov = { key: 2, class: 'results__shortcut px-3' },
  Sv = qe(() => w('div', null, 'Show tags', -1)),
  Iv = qe(() =>
    w(
      'div',
      { class: 'results__shortcut-keys' },
      [w('kbd', null, '@'), w('kbd', null, '@')],
      -1
    )
  ),
  $v = [Sv, Iv],
  xv = { key: 3, class: 'results__shortcut px-3' },
  Av = qe(() => w('div', null, 'Add as devDependency', -1)),
  Pv = qe(() =>
    w(
      'div',
      { class: 'results__shortcut-keys' },
      [w('kbd', null, 'Alt'), w('kbd', null, 'Enter')],
      -1
    )
  ),
  Lv = [Av, Pv],
  Rv = qe(() =>
    w(
      'hr',
      {
        class:
          'mt-0.5 border-t opacity-50 border-[color:var(--vscode-focusBorder)] codesandbox:border-[color:var(--vscode-sideBySideEditor-horizontalBorder)]',
      },
      null,
      -1
    )
  ),
  Tv = { key: 4, class: 'results__algolia pb-2 px-3' },
  Mv = qe(() => w('span', null, 'Search results by', -1)),
  Nv = De({
    __name: 'AutocompleteInput',
    setup(e) {
      const t = vt(),
        n = _p(),
        r = ee(() => t.state.config),
        s = ye(),
        i = ye(),
        o = ye(0),
        l = ye(0),
        a = ye(''),
        c = ye(null),
        u = ye(0),
        d = ye(0),
        h = ee(() => d.value > 0),
        v = ye(0),
        g = ee(() => {
          const _ = a.value.indexOf('@', 1);
          return _ === -1 ? a.value : a.value.substring(0, _);
        }),
        I = ye([]),
        W = ye({}),
        F = ye([]),
        q = _ => {
          const y = _.target;
          (a.value = y.value),
            (v.value = y.selectionStart || 0),
            u.value > F.value.length - 1 && (u.value = 0);
        },
        k = _ => {
          const y = _.target;
          v.value = y.selectionStart || 0;
        },
        oe = _ => {
          var y;
          return (y = Object.entries(W.value).find(([M, te]) => te === _)) ==
            null
            ? void 0
            : y[0];
        },
        K = ee(() =>
          I.value
            .filter(_ => !r.value.excludeVersions.some(y => _.includes(y)))
            .map(_ => ({ version: _, tag: oe(_) }))
        ),
        A = ee(() => {
          const _ = a.value.indexOf('@', 1),
            y = _ === -1 ? null : a.value.substring(_ + 1);
          return y
            ? K.value.filter(M => {
                var te;
                return (
                  M.version.startsWith(y) ||
                  ((te = M.tag) == null ? void 0 : te.startsWith(y)) ||
                  (M.tag && y.startsWith('@'))
                );
              })
            : K.value;
        }),
        Y = ee(() =>
          a.value.indexOf('@', 1) === -1 ? null : A.value[u.value].version
        ),
        Q = ee(() => {
          const _ = a.value.indexOf('@', 1);
          return _ > -1 && v.value > _;
        }),
        B = () => {
          const _ = Q.value ? A.value.length : F.value.length;
          u.value = u.value === 0 ? _ - 1 : u.value - 1;
        },
        G = () => {
          const _ = Q.value ? A.value.length : F.value.length;
          u.value = (u.value + 1) % _;
        },
        ue = _ => {
          u.value = _;
        },
        z = () => {
          var _;
          (o.value = 0),
            (u.value = 0),
            (a.value = ''),
            (F.value = []),
            (_ = s.value) == null || _.blur();
        },
        P = async ({ dev: _ } = { dev: !1 }) => {
          const y = F.value.find((re, he) =>
            Y.value ? re.name === g.value : he === u.value
          );
          if (!y) return;
          const M = {
            name: y.name,
            version: Y.value || y.version,
            isDevDependency: _,
          };
          await En(M.name, async () => {
            (a.value = ''),
              t.state.installedPackages.some(he => he.name === y.name) ||
                t.commit('addPackage', M),
              await Me.installPackage({ packages: [M], dev: _ });
          });
          const te = y.types.definitelyTyped
            ? {
                name: y.types.definitelyTyped,
                version: 'latest',
                isDevDependency: !0,
              }
            : null;
          await En(te == null ? void 0 : te.name, async () => {
            if (!te || (await Me.getIsPackageDeprecated(te.name))) return;
            t.state.installedPackages.some(
              he => he.name === (te == null ? void 0 : te.name)
            ) || t.commit('addPackage', te),
              await Me.installPackage({ packages: [te], dev: !0 });
          });
        },
        S = async _ => {
          var y, M;
          ((y = _.data) == null ? void 0 : y.type) === 'FOCUS_INPUT' &&
            ((M = s.value) == null || M.focus());
        };
      wn(() => {
        window.addEventListener('message', S),
          n.postMessage({ type: 'AUTOCOMPLETE_INPUT_MOUNTED' });
      }),
        hi(() => {
          window.removeEventListener('message', S);
        }),
        Ne(u, _ => {
          var y, M;
          (M = (y = i.value) == null ? void 0 : y.children[_]) == null ||
            M.scrollIntoView({ block: 'nearest' });
        }),
        Ne(Q, async (_, y) => {
          if (_ && !y) {
            const M = F.value[u.value];
            if (!M) return;
            (a.value = `${M.name}@`),
              (v.value = a.value.length),
              (u.value = 0),
              (I.value = Object.entries(M.versions)
                .sort(
                  ([, te], [, re]) =>
                    new Date(re).getTime() - new Date(te).getTime()
                )
                .map(([te]) => te)),
              (W.value = M.tags);
          }
          !_ && y && (u.value = 0);
        }),
        Ne(g, async _ => {
          if (!_) {
            F.value = [];
            return;
          }
          try {
            (c.value = null), d.value++;
            let y = ++l.value;
            const M = await Me.getSuggestions(_, r.value.maxNumberOfResults);
            if (y !== l.value) {
              d.value--;
              return;
            }
            F.value = M.hits;
          } catch {
            c.value = Qs.SuggestionsServiceIsNotResponding;
          }
          d.value--;
        });
      const R = ye({}),
        N = ye(0);
      return (
        Ne(F, async () => {
          clearTimeout(N.value),
            (N.value = setTimeout(async () => {
              F.value
                .filter(_ => !_.name.startsWith('@types/'))
                .filter(_ => R.value[_.name] === void 0)
                .map(async _ => {
                  try {
                    const y = await Me.getSizeInfo(`${_.name}@${_.version}`);
                    R.value[_.name] = y == null ? void 0 : y.gzip;
                  } catch {
                    R.value[_.name] = void 0;
                  }
                });
            }, 1e3));
        }),
        (_, y) => (
          U(),
          Z(
            'div',
            {
              class: Te({
                'flex-auto':
                  !J(t).state.filterInputIsFocused && !J(t).state.filterQuery,
              }),
            },
            [
              _e(
                J(el),
                { onTrigger: z },
                {
                  default: Or(() => [
                    w('div', Dp, [
                      w('label', jp, [
                        w(
                          'input',
                          {
                            class: Te({
                              'w-0':
                                J(t).state.filterInputIsFocused ||
                                J(t).state.filterQuery,
                              'w-full':
                                !J(t).state.filterInputIsFocused &&
                                !J(t).state.filterQuery,
                            }),
                            ref_key: 'inputRef',
                            ref: s,
                            tabindex: '0',
                            type: 'text',
                            value: a.value,
                            placeholder: 'Add dependency',
                            onClick: y[0] || (y[0] = je(() => {}, ['stop'])),
                            onFocus:
                              y[1] ||
                              (y[1] = () => {
                                (o.value = 1),
                                  J(t).commit('setFilterQuery', '');
                              }),
                            onInput: y[2] || (y[2] = M => q(M)),
                            onKeyup: [
                              Re(je(k, ['exact']), ['left']),
                              Re(je(k, ['exact']), ['right']),
                            ],
                            onKeydown: [
                              Re(z, ['tab']),
                              Re(je(z, ['exact', 'stop']), ['esc']),
                              y[3] ||
                                (y[3] = Re(
                                  je(M => P(), ['exact', 'stop']),
                                  ['enter']
                                )),
                              y[4] ||
                                (y[4] = Re(
                                  je(
                                    M => P({ dev: !0 }),
                                    ['alt', 'exact', 'stop']
                                  ),
                                  ['enter']
                                )),
                              Re(je(B, ['prevent']), ['up']),
                              Re(je(G, ['prevent']), ['down']),
                            ],
                          },
                          null,
                          42,
                          Up
                        ),
                        _e(op),
                      ]),
                      o.value !== 0 && a.value.length
                        ? (U(),
                          Z(
                            'div',
                            {
                              key: 0,
                              class:
                                'results codesandbox:border-[color:var(--vscode-sideBySideEditor-horizontalBorder)] codesandbox:bg-[color:var(--vscode-sideBar-background)]',
                              onClick: y[9] || (y[9] = je(() => {}, ['stop'])),
                            },
                            [
                              h.value && !F.value.length
                                ? (U(), Z('div', Vp, [_e(Al), Qp]))
                                : le('', !0),
                              !h.value && !F.value.length && a.value.length
                                ? (U(), Z('div', qp, Gp))
                                : le('', !0),
                              w(
                                'div',
                                {
                                  class: 'results__content',
                                  ref_key: 'resultsRef',
                                  ref: i,
                                },
                                [
                                  Q.value
                                    ? (U(!0),
                                      Z(
                                        Le,
                                        { key: 0 },
                                        Cn(
                                          A.value,
                                          (M, te) => (
                                            U(),
                                            Z(
                                              'div',
                                              {
                                                key: M.version,
                                                class: Te([
                                                  'results__item',
                                                  {
                                                    'results__item--active codesandbox:bg-[color:var(--vscode-sideBySideEditor-horizontalBorder)] codesandbox:outline-[color:var(--vscode-sideBySideEditor-horizontalBorder)]':
                                                      te === u.value,
                                                  },
                                                ]),
                                                onClick: [
                                                  y[5] ||
                                                    (y[5] = je(
                                                      re => P(),
                                                      ['exact', 'stop']
                                                    )),
                                                  y[6] ||
                                                    (y[6] = je(
                                                      re => P({ dev: !0 }),
                                                      ['exact', 'stop', 'alt']
                                                    )),
                                                ],
                                                onMouseenter: re => ue(te),
                                              },
                                              [
                                                w('div', Kp, [
                                                  w(
                                                    'span',
                                                    {
                                                      class:
                                                        'results__item-title truncate',
                                                      textContent: Ee(
                                                        M.version
                                                      ),
                                                    },
                                                    null,
                                                    8,
                                                    Bp
                                                  ),
                                                  w(
                                                    'span',
                                                    {
                                                      class:
                                                        'results__item-tag',
                                                      textContent: Ee(M.tag),
                                                    },
                                                    null,
                                                    8,
                                                    Wp
                                                  ),
                                                ]),
                                              ],
                                              42,
                                              Hp
                                            )
                                          )
                                        ),
                                        128
                                      ))
                                    : (U(!0),
                                      Z(
                                        Le,
                                        { key: 1 },
                                        Cn(
                                          F.value,
                                          (M, te) => (
                                            U(),
                                            Z(
                                              'div',
                                              {
                                                key: M.name,
                                                class: Te([
                                                  'results__item',
                                                  {
                                                    'results__item--active codesandbox:bg-[color:var(--vscode-sideBySideEditor-horizontalBorder)] codesandbox:outline-[color:var(--vscode-sideBySideEditor-horizontalBorder)]':
                                                      te === u.value,
                                                  },
                                                ]),
                                                onClick: [
                                                  y[7] ||
                                                    (y[7] = je(
                                                      re => P(),
                                                      ['exact', 'stop']
                                                    )),
                                                  y[8] ||
                                                    (y[8] = je(
                                                      re => P({ dev: !0 }),
                                                      ['exact', 'stop', 'alt']
                                                    )),
                                                ],
                                                onMouseenter: re => ue(te),
                                              },
                                              [
                                                w('div', Xp, [
                                                  w('div', null, [
                                                    w(
                                                      'span',
                                                      {
                                                        class:
                                                          'results__item-title [&_em]:text-[color:var(--vscode-textPreformat-foreground)]',
                                                        innerHTML:
                                                          M._highlightResult
                                                            .name.value ||
                                                          M.name,
                                                      },
                                                      null,
                                                      8,
                                                      Zp
                                                    ),
                                                    w(
                                                      'span',
                                                      null,
                                                      '@' + Ee(M.version),
                                                      1
                                                    ),
                                                  ]),
                                                  M.types.ts && te === u.value
                                                    ? (U(),
                                                      Z(
                                                        'a',
                                                        {
                                                          key: 0,
                                                          title:
                                                            M.types.ts ===
                                                            'definitely-typed'
                                                              ? `This package has TypeScript declarations provided by ${M.types.definitelyTyped}`
                                                              : 'This package contains build-in TypeScript declarations',
                                                        },
                                                        [
                                                          M.types.ts ===
                                                          'definitely-typed'
                                                            ? (U(),
                                                              Z('svg', ev, iv))
                                                            : le('', !0),
                                                          M.types.ts ===
                                                          'included'
                                                            ? (U(),
                                                              Z('svg', ov, cv))
                                                            : le('', !0),
                                                        ],
                                                        8,
                                                        Yp
                                                      ))
                                                    : le('', !0),
                                                ]),
                                                r.value.showResultDescription &&
                                                !/https?/.test(M.description)
                                                  ? (U(),
                                                    Z(
                                                      'div',
                                                      uv,
                                                      Ee(M.description),
                                                      1
                                                    ))
                                                  : le('', !0),
                                                w('div', fv, [
                                                  _e(Sp, {
                                                    width: '16',
                                                    height: '16',
                                                  }),
                                                  w(
                                                    'span',
                                                    dv,
                                                    Ee(
                                                      M.humanDownloadsLast30Days
                                                    ),
                                                    1
                                                  ),
                                                  R.value[M.name] &&
                                                  !M.deprecated
                                                    ? (U(),
                                                      Z(
                                                        Le,
                                                        { key: 0 },
                                                        [
                                                          _e(Lp, {
                                                            width: '12',
                                                            height: '12',
                                                            class: 'ml-4',
                                                          }),
                                                          w(
                                                            'span',
                                                            hv,
                                                            Ee(
                                                              J(Hn)(
                                                                R.value[
                                                                  M.name
                                                                ] || 0
                                                              )
                                                            ),
                                                            1
                                                          ),
                                                        ],
                                                        64
                                                      ))
                                                    : le('', !0),
                                                  M.deprecated
                                                    ? (U(),
                                                      Z(
                                                        Le,
                                                        { key: 1 },
                                                        [
                                                          _e(kp, {
                                                            width: '16',
                                                            height: '16',
                                                            class: 'ml-4',
                                                          }),
                                                          pv,
                                                        ],
                                                        64
                                                      ))
                                                    : le('', !0),
                                                ]),
                                              ],
                                              42,
                                              Jp
                                            )
                                          )
                                        ),
                                        128
                                      )),
                                ],
                                512
                              ),
                              c.value ===
                              J(Qs).SuggestionsServiceIsNotResponding
                                ? (U(), Z('div', vv, mv))
                                : le('', !0),
                              F.value.length &&
                              (r.value.showAlgoliaInfo || r.value.showShortcuts)
                                ? (U(),
                                  Z('div', yv, [
                                    r.value.showShortcuts
                                      ? (U(), Z('hr', _v))
                                      : le('', !0),
                                    r.value.showShortcuts
                                      ? (U(), Z('div', bv, wv))
                                      : le('', !0),
                                    r.value.showShortcuts
                                      ? (U(), Z('div', Ov, $v))
                                      : le('', !0),
                                    r.value.showShortcuts
                                      ? (U(), Z('div', xv, Lv))
                                      : le('', !0),
                                    Rv,
                                    r.value.showAlgoliaInfo
                                      ? (U(), Z('div', Tv, [Mv, _e(yp)]))
                                      : le('', !0),
                                  ]))
                                : le('', !0),
                            ]
                          ))
                        : le('', !0),
                    ]),
                  ]),
                  _: 1,
                }
              ),
            ],
            2
          )
        )
      );
    },
  }),
  Fv = Ae(Nv, [['__scopeId', 'data-v-49af20aa']]),
  kv = () => {
    const e = ye(new Map());
    return {
      getPackageSizeInfo: async (n, r) => {
        try {
          if (n.startsWith('@types/')) return null;
          const s = `${n}@${r}`;
          if (e.value.has(s)) return e.value.get(s);
          const i = await Me.getSizeInfo(s);
          return i
            ? e.value
                .set(s, {
                  name: i.name,
                  size: i.size,
                  gzip: i.gzip,
                  threeG: Pr(i.gzip).slow3G,
                  fourG: Pr(i.gzip).slow4G,
                })
                .get(s)
            : null;
        } catch {
          return null;
        }
      },
    };
  },
  Dv = {},
  jv = {
    width: '16',
    height: '16',
    viewBox: '0 0 16 16',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
  },
  Uv = w(
    'path',
    {
      'fill-rule': 'evenodd',
      'clip-rule': 'evenodd',
      d: 'M2.00583 8.26691L0.78 9.50003L0 8.73003L2.09 6.66003L2.85 6.67003L4.94 8.79003L4.18 9.55003L3.01348 8.36995C3.2028 10.9586 5.363 13 8 13C9.91062 13 11.571 11.9283 12.4127 10.3533L13.226 10.9499C12.1959 12.7709 10.2415 14 8 14C4.77573 14 2.14547 11.4568 2.00583 8.26691ZM12.9961 7.80051L11.76 6.55005L11 7.31005L13.09 9.42005L13.85 9.43005L15.94 7.36005L15.19 6.60005L13.996 7.78004C13.8803 4.56823 11.2401 2 8 2C5.83727 2 3.94179 3.14427 2.88597 4.86043L3.69563 5.45436C4.56647 3.98506 6.1682 3 8 3C10.6946 3 12.8914 5.13157 12.9961 7.80051Z',
      fill: 'currentColor',
    },
    null,
    -1
  ),
  Vv = [Uv];
function Qv(e, t) {
  return U(), Z('svg', jv, Vv);
}
const qv = Ae(Dv, [['render', Qv]]),
  zv = {},
  Gv = {
    width: '16',
    height: '16',
    viewBox: '0 0 16 16',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
  },
  Hv = w(
    'path',
    {
      'fill-rule': 'evenodd',
      'clip-rule': 'evenodd',
      d: 'M8.00004 8.70711L11.6465 12.3536L12.3536 11.6465L8.70714 8.00001L12.3536 4.35356L11.6465 3.64645L8.00004 7.2929L4.35359 3.64645L3.64648 4.35356L7.29293 8.00001L3.64648 11.6465L4.35359 12.3536L8.00004 8.70711Z',
      fill: 'currentColor',
    },
    null,
    -1
  ),
  Kv = [Hv];
function Bv(e, t) {
  return U(), Z('svg', Gv, Kv);
}
const Wv = Ae(zv, [['render', Bv]]),
  Jv = {},
  Xv = { width: '16', height: '16', viewBox: '0 0 16 16' },
  Zv = w(
    'path',
    {
      fill: 'currentColor',
      'fill-rule': 'evenodd',
      d: 'M4 5v1.984a.5.5 0 0 0 .5.5h6.882L9.749 5.851l.707-.707l2.121 2.121l.423.423v.568L10.456 10.8l-.707-.707l1.61-1.609H4.5a1.5 1.5 0 0 1-1.5-1.5V5h1Z',
      'clip-rule': 'evenodd',
    },
    null,
    -1
  ),
  Yv = [Zv];
function e0(e, t) {
  return U(), Z('svg', Xv, Yv);
}
const t0 = Ae(Jv, [['render', e0]]),
  n0 = ['onKeydown'],
  r0 = ['title'],
  s0 = { key: 1, class: 'version' },
  i0 = { key: 0 },
  o0 = { key: 1 },
  a0 = { key: 2, class: 'overlay' },
  l0 = { class: 'overlay__content' },
  c0 = ['title'],
  u0 = De({
    __name: 'InstalledItem',
    props: {
      sizeInfo: { type: Object },
      item: { type: Object, required: !0 },
      tags: { type: Object, default: () => ({}) },
      versions: { type: Array, default: () => [] },
    },
    emits: ['remove', 'changeVersion', 'update'],
    setup(e, { emit: t }) {
      const n = t,
        r = e,
        s = vt(),
        i = ee(() => s.state.config.analyze.columns),
        o = ee(() => s.state.view),
        l = ee(() => {
          var R;
          return (
            Ai(r.versions, r.item.version) ||
            ((R = Ct(r.item.version)) == null ? void 0 : R.raw) ||
            '0.0.0'
          );
        }),
        a = ee(() => {
          var R;
          return (R = Ct(r.item.version)) == null ? void 0 : R.major;
        }),
        c = ee(() => {
          var R;
          return (R = Ct(r.item.version)) == null ? void 0 : R.minor;
        }),
        u = ee(() => {
          var R;
          return (R = Ct(r.item.version)) == null ? void 0 : R.patch;
        }),
        d = ee(() =>
          Ct(r.versions.find(R => !/alpha|beta|experimental|pre/.test(R)))
        ),
        h = ee(() => {
          var R;
          return (R = d.value) == null ? void 0 : R.major;
        }),
        v = ee(() => {
          var R;
          return (R = d.value) == null ? void 0 : R.minor;
        }),
        g = ee(() => {
          var R;
          return (R = d.value) == null ? void 0 : R.patch;
        }),
        I = ee(
          () =>
            !/^file:|^link:|^https?:|^git:|^git\+|^github:|^gist:|^bitbucket:|^gitlab:/.test(
              r.item.version
            )
        ),
        W = ee(() => typeof A.value == 'string' && A.value !== l.value),
        F = ee(
          () =>
            W.value &&
            typeof h.value == 'number' &&
            typeof a.value == 'number' &&
            h.value > a.value
        ),
        q = ee(
          () =>
            W.value &&
            (F.value ||
              (typeof v.value == 'number' &&
                typeof c.value == 'number' &&
                v.value > c.value))
        ),
        k = ee(
          () =>
            W.value &&
            (q.value ||
              (typeof g.value == 'number' &&
                typeof u.value == 'number' &&
                g.value > u.value))
        ),
        oe = ee(() => s.state.updatingPackages.includes(r.item.name)),
        K = ee(() =>
          r.item.version.match(/http/) ? 'Custom' : r.item.version
        ),
        A = ee(() => $l(r.versions, r.item.version)),
        Y = ee(() => s.getters.isUnused(r.item.name)),
        Q = () => {
          n('update', { item: r.item, version: A.value });
        },
        B = () => {
          r.tags.latest && G(r.tags.latest);
        },
        G = R => {
          n('changeVersion', { item: r.item, version: R });
        },
        ue = R => {
          const _ = R.target.previousElementSibling;
          _ == null || _.focus();
        },
        z = R => {
          const _ = R.target.nextElementSibling;
          _ == null || _.focus();
        },
        P = R => {
          const N = R.target,
            _ = N.nextElementSibling,
            y = N.previousElementSibling;
          _ == null || _.focus(),
            _ || y == null || y.focus(),
            n('remove', r.item);
        },
        S = () => {
          s.commit('navigate', Se.Details),
            s.commit('setSelectedPackage', r.item.name);
        };
      return (R, N) => (
        U(),
        Z(
          'div',
          {
            class: Te([
              'item relative focus:z-50 focus:outline-1 focus:outline focus:outline-[color:var(--vscode-focusBorder)]',
              { 'item--analyze': o.value === J(Se).Analyze },
            ]),
            tabindex: '0',
            onKeydown: [
              Re(je(ue, ['exact']), ['up']),
              Re(je(z, ['exact']), ['down']),
              Re(je(P, ['exact']), ['delete']),
              Re(je(Q, ['ctrl', 'exact', 'prevent']), ['enter']),
              Re(je(B, ['ctrl', 'shift', 'exact', 'prevent']), ['enter']),
            ],
          },
          [
            w(
              'div',
              {
                class: Te([
                  'relative',
                  {
                    'flex items-center justify-between':
                      o.value === J(Se).Manage,
                    grid: o.value === J(Se).Analyze,
                  },
                ]),
                style: ht({
                  gridTemplateColumns:
                    o.value === J(Se).Analyze
                      ? `1fr ${i.value.length * 65}px`
                      : void 0,
                }),
              },
              [
                oe.value
                  ? (U(), Pe(Al, { key: 0, class: 'icon' }))
                  : le('', !0),
                w(
                  'span',
                  {
                    class: Te(['name', { unused: Y.value }]),
                    title: Y.value ? 'Unused dependency' : void 0,
                  },
                  Ee(e.item.name),
                  11,
                  r0
                ),
                o.value === J(Se).Manage
                  ? (U(),
                    Z('span', s0, [
                      /\d+\.\d+\.\d+/.test(K.value)
                        ? (U(),
                          Z('span', i0, [
                            w(
                              'span',
                              {
                                class: Te({
                                  'text-[color:var(--vscode-list-highlightForeground)] codesandbox:text-[color:var(--vscode-editorWarning-foreground)]':
                                    F.value,
                                }),
                              },
                              Ee(K.value.split('.')[0]),
                              3
                            ),
                            w(
                              'span',
                              {
                                class: Te({
                                  'text-[color:var(--vscode-list-highlightForeground)] codesandbox:text-[color:var(--vscode-editorWarning-foreground)]':
                                    q.value,
                                }),
                              },
                              '.' + Ee(K.value.split('.')[1]),
                              3
                            ),
                            w(
                              'span',
                              {
                                class: Te({
                                  'text-[color:var(--vscode-list-highlightForeground)] codesandbox:text-[color:var(--vscode-editorWarning-foreground)]':
                                    k.value,
                                }),
                              },
                              '.' + Ee(K.value.split('.').slice(2).join('.')),
                              3
                            ),
                          ]))
                        : (U(), Z('span', o0, Ee(K.value), 1)),
                    ]))
                  : le('', !0),
                I.value
                  ? (U(),
                    Z('div', a0, [
                      w('div', l0, [
                        _e(
                          Ei,
                          {
                            class: 'version-input',
                            'model-value': l.value,
                            'onUpdate:modelValue': G,
                            options: e.versions,
                            placeholder: 'Select version',
                          },
                          null,
                          8,
                          ['model-value', 'options']
                        ),
                        W.value
                          ? (U(),
                            Z(
                              'a',
                              {
                                key: 0,
                                role: 'button',
                                tabindex: '0',
                                class: 'action',
                                title: `Update to ${A.value}`,
                                onClick: Q,
                                onKeydown: [Re(Q, ['space']), Re(Q, ['enter'])],
                              },
                              [_e(qv)],
                              40,
                              c0
                            ))
                          : le('', !0),
                        w(
                          'a',
                          {
                            role: 'button',
                            tabindex: '0',
                            class: 'action',
                            title: 'View package details',
                            onClick: S,
                          },
                          [_e(t0)]
                        ),
                        w(
                          'a',
                          {
                            role: 'button',
                            tabindex: '0',
                            class: 'action',
                            title: 'Delete',
                            onClick:
                              N[0] || (N[0] = _ => R.$emit('remove', e.item)),
                            onKeydown: [
                              N[1] ||
                                (N[1] = Re(
                                  _ => R.$emit('remove', e.item),
                                  ['space']
                                )),
                              N[2] ||
                                (N[2] = Re(
                                  _ => R.$emit('remove', e.item),
                                  ['enter']
                                )),
                            ],
                          },
                          [_e(Wv)],
                          32
                        ),
                      ]),
                    ]))
                  : le('', !0),
                o.value === J(Se).Analyze && e.sizeInfo
                  ? (U(),
                    Z(
                      'div',
                      {
                        key: 3,
                        class: 'size-info grid',
                        style: ht({
                          gridTemplateColumns: `repeat(${i.value.length}, minmax(0, 1fr))`,
                        }),
                      },
                      [
                        i.value.includes('min')
                          ? (U(),
                            Pe(
                              Ut,
                              { key: 0, value: e.sizeInfo.size, type: 'size' },
                              null,
                              8,
                              ['value']
                            ))
                          : le('', !0),
                        i.value.includes('gzip')
                          ? (U(),
                            Pe(
                              Ut,
                              { key: 1, value: e.sizeInfo.gzip, type: 'size' },
                              null,
                              8,
                              ['value']
                            ))
                          : le('', !0),
                        i.value.includes('slow3G')
                          ? (U(),
                            Pe(
                              Ut,
                              {
                                key: 2,
                                value: e.sizeInfo.threeG,
                                type: 'time',
                              },
                              null,
                              8,
                              ['value']
                            ))
                          : le('', !0),
                        i.value.includes('slow4G')
                          ? (U(),
                            Pe(
                              Ut,
                              { key: 3, value: e.sizeInfo.fourG, type: 'time' },
                              null,
                              8,
                              ['value']
                            ))
                          : le('', !0),
                      ],
                      4
                    ))
                  : le('', !0),
              ],
              6
            ),
          ],
          42,
          n0
        )
      );
    },
  }),
  f0 = Ae(u0, [['__scopeId', 'data-v-1bff2023']]),
  d0 = { key: 0, class: 'title' },
  h0 = De({
    __name: 'ManageViewContent',
    props: {
      installedPackages: { type: Array, required: !0 },
      displayedPackages: { type: Array, required: !0 },
      installedPackagesTags: { type: Object, required: !0 },
      installedPackagesVersions: { type: Object, required: !0 },
      sizeInfo: { type: Object, required: !0 },
    },
    setup(e) {
      const t = e,
        n = vt(),
        r = ee(() => n.state.view),
        s = async o => {
          const l = gh(o.name),
            a = t.installedPackages.find(u => u.name === l),
            c = [o.name];
          a && c.push(a.name),
            En(c, async () => {
              await Me.removePackages(c), n.commit('removePackages', c);
            });
        },
        i = o => {
          o.version &&
            En(o.item.name, async () => {
              await Me.changeVersion({
                name: o.item.name,
                version: o.version,
                originalVersion: o.item.version,
              }),
                n.commit('changeVersion', o);
            });
        };
      return (o, l) => (
        U(),
        Z(
          Le,
          null,
          [
            [J(Se).Manage].includes(r.value)
              ? (U(), Z('h2', d0, 'Dependencies'))
              : le('', !0),
            [J(Se).Manage, J(Se).Analyze].includes(r.value)
              ? (U(!0),
                Z(
                  Le,
                  { key: 1 },
                  Cn(
                    e.displayedPackages.filter(a => !a.isDevDependency),
                    a => (
                      U(),
                      Pe(
                        f0,
                        {
                          item: a,
                          key: a.name,
                          tags: e.installedPackagesTags[a.name],
                          versions: e.installedPackagesVersions[a.name],
                          'size-info': e.sizeInfo[a.name],
                          onUpdate: i,
                          onChangeVersion: i,
                          onRemove: s,
                        },
                        null,
                        8,
                        ['item', 'tags', 'versions', 'size-info']
                      )
                    )
                  ),
                  128
                ))
              : le('', !0),
          ],
          64
        )
      );
    },
  }),
  p0 = Ae(h0, [['__scopeId', 'data-v-9b1b8458']]),
  Pl = e => (Bn('data-v-f6cc6e62'), (e = e()), Wn(), e),
  v0 = ['value'],
  g0 = {
    key: 0,
    xmlns: 'http://www.w3.org/2000/svg',
    'aria-hidden': 'true',
    role: 'img',
    class: 'flex-shrink-0',
    width: '16',
    height: '16',
    preserveAspectRatio: 'xMidYMid meet',
    viewBox: '0 0 16 16',
  },
  m0 = Pl(() =>
    w(
      'path',
      {
        fill: 'currentColor',
        'fill-rule': 'evenodd',
        d: 'M15 2v1.67l-5 4.759V14H6V8.429l-5-4.76V2h14zM7 8v5h2V8l5-4.76V3H2v.24L7 8z',
        'clip-rule': 'evenodd',
      },
      null,
      -1
    )
  ),
  y0 = [m0],
  _0 = Pl(() =>
    w(
      'svg',
      {
        xmlns: 'http://www.w3.org/2000/svg',
        'aria-hidden': 'true',
        role: 'img',
        class: 'flex-shrink-0',
        width: '24',
        height: '24',
        preserveAspectRatio: 'xMidYMid meet',
        viewBox: '0 0 16 16',
      },
      [
        w('path', {
          fill: 'currentColor',
          'fill-rule': 'evenodd',
          d: 'm8 8.707l3.646 3.647l.708-.707L8.707 8l3.647-3.646l-.707-.708L8 7.293L4.354 3.646l-.707.708L7.293 8l-3.646 3.646l.707.708L8 8.707z',
          'clip-rule': 'evenodd',
        }),
      ],
      -1
    )
  ),
  b0 = [_0],
  C0 = De({
    __name: 'FilterInput',
    setup(e) {
      const t = vt();
      return (n, r) => (
        U(),
        Z(
          'label',
          {
            class: Te([
              'search-input',
              {
                'flex-auto':
                  J(t).state.filterInputIsFocused || J(t).state.filterQuery,
              },
            ]),
          },
          [
            w(
              'input',
              {
                class: Te([
                  'focus:w-full',
                  {
                    'w-0': !J(t).state.filterQuery,
                    'w-full': J(t).state.filterQuery,
                  },
                ]),
                value: J(t).state.filterQuery,
                onInput:
                  r[0] ||
                  (r[0] = s =>
                    J(t).commit('setFilterQuery', s.currentTarget.value)),
                onFocus:
                  r[1] ||
                  (r[1] = s => J(t).commit('setFilterInputIsFocused', !0)),
                onBlur:
                  r[2] ||
                  (r[2] = s => J(t).commit('setFilterInputIsFocused', !1)),
                onKeydown:
                  r[3] ||
                  (r[3] = Re(s => J(t).commit('setFilterQuery', ''), ['esc'])),
                type: 'text',
                placeholder: 'Filter...',
              },
              null,
              42,
              v0
            ),
            J(t).state.filterQuery
              ? (U(),
                Z(
                  'button',
                  {
                    key: 1,
                    onClick:
                      r[4] || (r[4] = s => J(t).commit('setFilterQuery', '')),
                    class:
                      'focus:outline-1 focus:outline focus:outline-[color:var(--vscode-focusBorder)]',
                  },
                  b0
                ))
              : (U(), Z('svg', g0, y0)),
          ],
          2
        )
      );
    },
  }),
  E0 = Ae(C0, [['__scopeId', 'data-v-f6cc6e62']]),
  w0 = {},
  O0 = { width: '16', height: '16', viewBox: '0 0 16 16' },
  S0 = w(
    'path',
    {
      fill: 'currentColor',
      'fill-rule': 'evenodd',
      d: 'm7 3.093l-5 5V8.8l5 5l.707-.707l-4.146-4.147H14v-1H3.56L7.708 3.8L7 3.093z',
      'clip-rule': 'evenodd',
    },
    null,
    -1
  ),
  I0 = [S0];
function $0(e, t) {
  return U(), Z('svg', O0, I0);
}
const x0 = Ae(w0, [['render', $0]]);
function Hs(e, t) {
  return (
    (Hs = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (n, r) {
          return (n.__proto__ = r), n;
        }),
    Hs(e, t)
  );
}
function Xn(e, t) {
  (e.prototype = Object.create(t.prototype)),
    (e.prototype.constructor = e),
    Hs(e, t);
}
var Zn = (function () {
  function e() {
    this.listeners = [];
  }
  var t = e.prototype;
  return (
    (t.subscribe = function (r) {
      var s = this,
        i = r || function () {};
      return (
        this.listeners.push(i),
        this.onSubscribe(),
        function () {
          (s.listeners = s.listeners.filter(function (o) {
            return o !== i;
          })),
            s.onUnsubscribe();
        }
      );
    }),
    (t.hasListeners = function () {
      return this.listeners.length > 0;
    }),
    (t.onSubscribe = function () {}),
    (t.onUnsubscribe = function () {}),
    e
  );
})();
function we() {
  return (
    (we = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    we.apply(null, arguments)
  );
}
var Lr = typeof window > 'u';
function He() {}
function A0(e, t) {
  return typeof e == 'function' ? e(t) : e;
}
function Ks(e) {
  return typeof e == 'number' && e >= 0 && e !== 1 / 0;
}
function Rr(e) {
  return Array.isArray(e) ? e : [e];
}
function Ll(e, t) {
  return Math.max(e + (t || 0) - Date.now(), 0);
}
function Cs(e, t, n) {
  return ns(e)
    ? typeof t == 'function'
      ? we({}, n, { queryKey: e, queryFn: t })
      : we({}, t, { queryKey: e })
    : e;
}
function kt(e, t, n) {
  return ns(e) ? [we({}, t, { queryKey: e }), n] : [e || {}, t];
}
function P0(e, t) {
  if ((e === !0 && t === !0) || (e == null && t == null)) return 'all';
  if (e === !1 && t === !1) return 'none';
  var n = e ?? !t;
  return n ? 'active' : 'inactive';
}
function Do(e, t) {
  var n = e.active,
    r = e.exact,
    s = e.fetching,
    i = e.inactive,
    o = e.predicate,
    l = e.queryKey,
    a = e.stale;
  if (ns(l)) {
    if (r) {
      if (t.queryHash !== Pi(l, t.options)) return !1;
    } else if (!Tr(t.queryKey, l)) return !1;
  }
  var c = P0(n, i);
  if (c === 'none') return !1;
  if (c !== 'all') {
    var u = t.isActive();
    if ((c === 'active' && !u) || (c === 'inactive' && u)) return !1;
  }
  return !(
    (typeof a == 'boolean' && t.isStale() !== a) ||
    (typeof s == 'boolean' && t.isFetching() !== s) ||
    (o && !o(t))
  );
}
function jo(e, t) {
  var n = e.exact,
    r = e.fetching,
    s = e.predicate,
    i = e.mutationKey;
  if (ns(i)) {
    if (!t.options.mutationKey) return !1;
    if (n) {
      if (sn(t.options.mutationKey) !== sn(i)) return !1;
    } else if (!Tr(t.options.mutationKey, i)) return !1;
  }
  return !(
    (typeof r == 'boolean' && (t.state.status === 'loading') !== r) ||
    (s && !s(t))
  );
}
function Pi(e, t) {
  var n = (t == null ? void 0 : t.queryKeyHashFn) || sn;
  return n(e);
}
function sn(e) {
  var t = Rr(e);
  return L0(t);
}
function L0(e) {
  return JSON.stringify(e, function (t, n) {
    return Bs(n)
      ? Object.keys(n)
          .sort()
          .reduce(function (r, s) {
            return (r[s] = n[s]), r;
          }, {})
      : n;
  });
}
function Tr(e, t) {
  return Rl(Rr(e), Rr(t));
}
function Rl(e, t) {
  return e === t
    ? !0
    : typeof e != typeof t
      ? !1
      : e && t && typeof e == 'object' && typeof t == 'object'
        ? !Object.keys(t).some(function (n) {
            return !Rl(e[n], t[n]);
          })
        : !1;
}
function Mr(e, t) {
  if (e === t) return e;
  var n = Array.isArray(e) && Array.isArray(t);
  if (n || (Bs(e) && Bs(t))) {
    for (
      var r = n ? e.length : Object.keys(e).length,
        s = n ? t : Object.keys(t),
        i = s.length,
        o = n ? [] : {},
        l = 0,
        a = 0;
      a < i;
      a++
    ) {
      var c = n ? a : s[a];
      (o[c] = Mr(e[c], t[c])), o[c] === e[c] && l++;
    }
    return r === i && l === r ? e : o;
  }
  return t;
}
function R0(e, t) {
  if ((e && !t) || (t && !e)) return !1;
  for (var n in e) if (e[n] !== t[n]) return !1;
  return !0;
}
function Bs(e) {
  if (!Uo(e)) return !1;
  var t = e.constructor;
  if (typeof t > 'u') return !0;
  var n = t.prototype;
  return !(!Uo(n) || !n.hasOwnProperty('isPrototypeOf'));
}
function Uo(e) {
  return Object.prototype.toString.call(e) === '[object Object]';
}
function ns(e) {
  return typeof e == 'string' || Array.isArray(e);
}
function T0(e) {
  return new Promise(function (t) {
    setTimeout(t, e);
  });
}
function Vo(e) {
  Promise.resolve()
    .then(e)
    .catch(function (t) {
      return setTimeout(function () {
        throw t;
      });
    });
}
function Tl() {
  if (typeof AbortController == 'function') return new AbortController();
}
var M0 = (function (e) {
    Xn(t, e);
    function t() {
      var r;
      return (
        (r = e.call(this) || this),
        (r.setup = function (s) {
          var i;
          if (!Lr && (i = window) != null && i.addEventListener) {
            var o = function () {
              return s();
            };
            return (
              window.addEventListener('visibilitychange', o, !1),
              window.addEventListener('focus', o, !1),
              function () {
                window.removeEventListener('visibilitychange', o),
                  window.removeEventListener('focus', o);
              }
            );
          }
        }),
        r
      );
    }
    var n = t.prototype;
    return (
      (n.onSubscribe = function () {
        this.cleanup || this.setEventListener(this.setup);
      }),
      (n.onUnsubscribe = function () {
        if (!this.hasListeners()) {
          var s;
          (s = this.cleanup) == null || s.call(this), (this.cleanup = void 0);
        }
      }),
      (n.setEventListener = function (s) {
        var i,
          o = this;
        (this.setup = s),
          (i = this.cleanup) == null || i.call(this),
          (this.cleanup = s(function (l) {
            typeof l == 'boolean' ? o.setFocused(l) : o.onFocus();
          }));
      }),
      (n.setFocused = function (s) {
        (this.focused = s), s && this.onFocus();
      }),
      (n.onFocus = function () {
        this.listeners.forEach(function (s) {
          s();
        });
      }),
      (n.isFocused = function () {
        return typeof this.focused == 'boolean'
          ? this.focused
          : typeof document > 'u'
            ? !0
            : [void 0, 'visible', 'prerender'].includes(
                document.visibilityState
              );
      }),
      t
    );
  })(Zn),
  Dn = new M0(),
  N0 = (function (e) {
    Xn(t, e);
    function t() {
      var r;
      return (
        (r = e.call(this) || this),
        (r.setup = function (s) {
          var i;
          if (!Lr && (i = window) != null && i.addEventListener) {
            var o = function () {
              return s();
            };
            return (
              window.addEventListener('online', o, !1),
              window.addEventListener('offline', o, !1),
              function () {
                window.removeEventListener('online', o),
                  window.removeEventListener('offline', o);
              }
            );
          }
        }),
        r
      );
    }
    var n = t.prototype;
    return (
      (n.onSubscribe = function () {
        this.cleanup || this.setEventListener(this.setup);
      }),
      (n.onUnsubscribe = function () {
        if (!this.hasListeners()) {
          var s;
          (s = this.cleanup) == null || s.call(this), (this.cleanup = void 0);
        }
      }),
      (n.setEventListener = function (s) {
        var i,
          o = this;
        (this.setup = s),
          (i = this.cleanup) == null || i.call(this),
          (this.cleanup = s(function (l) {
            typeof l == 'boolean' ? o.setOnline(l) : o.onOnline();
          }));
      }),
      (n.setOnline = function (s) {
        (this.online = s), s && this.onOnline();
      }),
      (n.onOnline = function () {
        this.listeners.forEach(function (s) {
          s();
        });
      }),
      (n.isOnline = function () {
        return typeof this.online == 'boolean'
          ? this.online
          : typeof navigator > 'u' || typeof navigator.onLine > 'u'
            ? !0
            : navigator.onLine;
      }),
      t
    );
  })(Zn),
  _r = new N0();
function F0(e) {
  return Math.min(1e3 * Math.pow(2, e), 3e4);
}
function Nr(e) {
  return typeof (e == null ? void 0 : e.cancel) == 'function';
}
var Ml = function (t) {
  (this.revert = t == null ? void 0 : t.revert),
    (this.silent = t == null ? void 0 : t.silent);
};
function br(e) {
  return e instanceof Ml;
}
var Nl = function (t) {
    var n = this,
      r = !1,
      s,
      i,
      o,
      l;
    (this.abort = t.abort),
      (this.cancel = function (h) {
        return s == null ? void 0 : s(h);
      }),
      (this.cancelRetry = function () {
        r = !0;
      }),
      (this.continueRetry = function () {
        r = !1;
      }),
      (this.continue = function () {
        return i == null ? void 0 : i();
      }),
      (this.failureCount = 0),
      (this.isPaused = !1),
      (this.isResolved = !1),
      (this.isTransportCancelable = !1),
      (this.promise = new Promise(function (h, v) {
        (o = h), (l = v);
      }));
    var a = function (v) {
        n.isResolved ||
          ((n.isResolved = !0),
          t.onSuccess == null || t.onSuccess(v),
          i == null || i(),
          o(v));
      },
      c = function (v) {
        n.isResolved ||
          ((n.isResolved = !0),
          t.onError == null || t.onError(v),
          i == null || i(),
          l(v));
      },
      u = function () {
        return new Promise(function (v) {
          (i = v), (n.isPaused = !0), t.onPause == null || t.onPause();
        }).then(function () {
          (i = void 0),
            (n.isPaused = !1),
            t.onContinue == null || t.onContinue();
        });
      },
      d = function h() {
        if (!n.isResolved) {
          var v;
          try {
            v = t.fn();
          } catch (g) {
            v = Promise.reject(g);
          }
          (s = function (I) {
            if (
              !n.isResolved &&
              (c(new Ml(I)), n.abort == null || n.abort(), Nr(v))
            )
              try {
                v.cancel();
              } catch {}
          }),
            (n.isTransportCancelable = Nr(v)),
            Promise.resolve(v)
              .then(a)
              .catch(function (g) {
                var I, W;
                if (!n.isResolved) {
                  var F = (I = t.retry) != null ? I : 3,
                    q = (W = t.retryDelay) != null ? W : F0,
                    k = typeof q == 'function' ? q(n.failureCount, g) : q,
                    oe =
                      F === !0 ||
                      (typeof F == 'number' && n.failureCount < F) ||
                      (typeof F == 'function' && F(n.failureCount, g));
                  if (r || !oe) {
                    c(g);
                    return;
                  }
                  n.failureCount++,
                    t.onFail == null || t.onFail(n.failureCount, g),
                    T0(k)
                      .then(function () {
                        if (!Dn.isFocused() || !_r.isOnline()) return u();
                      })
                      .then(function () {
                        r ? c(g) : h();
                      });
                }
              });
        }
      };
    d();
  },
  k0 = (function () {
    function e() {
      (this.queue = []),
        (this.transactions = 0),
        (this.notifyFn = function (n) {
          n();
        }),
        (this.batchNotifyFn = function (n) {
          n();
        });
    }
    var t = e.prototype;
    return (
      (t.batch = function (r) {
        var s;
        this.transactions++;
        try {
          s = r();
        } finally {
          this.transactions--, this.transactions || this.flush();
        }
        return s;
      }),
      (t.schedule = function (r) {
        var s = this;
        this.transactions
          ? this.queue.push(r)
          : Vo(function () {
              s.notifyFn(r);
            });
      }),
      (t.batchCalls = function (r) {
        var s = this;
        return function () {
          for (var i = arguments.length, o = new Array(i), l = 0; l < i; l++)
            o[l] = arguments[l];
          s.schedule(function () {
            r.apply(void 0, o);
          });
        };
      }),
      (t.flush = function () {
        var r = this,
          s = this.queue;
        (this.queue = []),
          s.length &&
            Vo(function () {
              r.batchNotifyFn(function () {
                s.forEach(function (i) {
                  r.notifyFn(i);
                });
              });
            });
      }),
      (t.setNotifyFunction = function (r) {
        this.notifyFn = r;
      }),
      (t.setBatchNotifyFunction = function (r) {
        this.batchNotifyFn = r;
      }),
      e
    );
  })(),
  Ge = new k0(),
  D0 = console;
function Fr() {
  return D0;
}
var j0 = (function () {
    function e(n) {
      (this.abortSignalConsumed = !1),
        (this.hadObservers = !1),
        (this.defaultOptions = n.defaultOptions),
        this.setOptions(n.options),
        (this.observers = []),
        (this.cache = n.cache),
        (this.queryKey = n.queryKey),
        (this.queryHash = n.queryHash),
        (this.initialState = n.state || this.getDefaultState(this.options)),
        (this.state = this.initialState),
        (this.meta = n.meta),
        this.scheduleGc();
    }
    var t = e.prototype;
    return (
      (t.setOptions = function (r) {
        var s;
        (this.options = we({}, this.defaultOptions, r)),
          (this.meta = r == null ? void 0 : r.meta),
          (this.cacheTime = Math.max(
            this.cacheTime || 0,
            (s = this.options.cacheTime) != null ? s : 5 * 60 * 1e3
          ));
      }),
      (t.setDefaultOptions = function (r) {
        this.defaultOptions = r;
      }),
      (t.scheduleGc = function () {
        var r = this;
        this.clearGcTimeout(),
          Ks(this.cacheTime) &&
            (this.gcTimeout = setTimeout(function () {
              r.optionalRemove();
            }, this.cacheTime));
      }),
      (t.clearGcTimeout = function () {
        this.gcTimeout &&
          (clearTimeout(this.gcTimeout), (this.gcTimeout = void 0));
      }),
      (t.optionalRemove = function () {
        this.observers.length ||
          (this.state.isFetching
            ? this.hadObservers && this.scheduleGc()
            : this.cache.remove(this));
      }),
      (t.setData = function (r, s) {
        var i,
          o,
          l = this.state.data,
          a = A0(r, l);
        return (
          (i = (o = this.options).isDataEqual) != null && i.call(o, l, a)
            ? (a = l)
            : this.options.structuralSharing !== !1 && (a = Mr(l, a)),
          this.dispatch({
            data: a,
            type: 'success',
            dataUpdatedAt: s == null ? void 0 : s.updatedAt,
          }),
          a
        );
      }),
      (t.setState = function (r, s) {
        this.dispatch({ type: 'setState', state: r, setStateOptions: s });
      }),
      (t.cancel = function (r) {
        var s,
          i = this.promise;
        return (
          (s = this.retryer) == null || s.cancel(r),
          i ? i.then(He).catch(He) : Promise.resolve()
        );
      }),
      (t.destroy = function () {
        this.clearGcTimeout(), this.cancel({ silent: !0 });
      }),
      (t.reset = function () {
        this.destroy(), this.setState(this.initialState);
      }),
      (t.isActive = function () {
        return this.observers.some(function (r) {
          return r.options.enabled !== !1;
        });
      }),
      (t.isFetching = function () {
        return this.state.isFetching;
      }),
      (t.isStale = function () {
        return (
          this.state.isInvalidated ||
          !this.state.dataUpdatedAt ||
          this.observers.some(function (r) {
            return r.getCurrentResult().isStale;
          })
        );
      }),
      (t.isStaleByTime = function (r) {
        return (
          r === void 0 && (r = 0),
          this.state.isInvalidated ||
            !this.state.dataUpdatedAt ||
            !Ll(this.state.dataUpdatedAt, r)
        );
      }),
      (t.onFocus = function () {
        var r,
          s = this.observers.find(function (i) {
            return i.shouldFetchOnWindowFocus();
          });
        s && s.refetch(), (r = this.retryer) == null || r.continue();
      }),
      (t.onOnline = function () {
        var r,
          s = this.observers.find(function (i) {
            return i.shouldFetchOnReconnect();
          });
        s && s.refetch(), (r = this.retryer) == null || r.continue();
      }),
      (t.addObserver = function (r) {
        this.observers.indexOf(r) === -1 &&
          (this.observers.push(r),
          (this.hadObservers = !0),
          this.clearGcTimeout(),
          this.cache.notify({
            type: 'observerAdded',
            query: this,
            observer: r,
          }));
      }),
      (t.removeObserver = function (r) {
        this.observers.indexOf(r) !== -1 &&
          ((this.observers = this.observers.filter(function (s) {
            return s !== r;
          })),
          this.observers.length ||
            (this.retryer &&
              (this.retryer.isTransportCancelable || this.abortSignalConsumed
                ? this.retryer.cancel({ revert: !0 })
                : this.retryer.cancelRetry()),
            this.cacheTime ? this.scheduleGc() : this.cache.remove(this)),
          this.cache.notify({
            type: 'observerRemoved',
            query: this,
            observer: r,
          }));
      }),
      (t.getObserversCount = function () {
        return this.observers.length;
      }),
      (t.invalidate = function () {
        this.state.isInvalidated || this.dispatch({ type: 'invalidate' });
      }),
      (t.fetch = function (r, s) {
        var i = this,
          o,
          l,
          a;
        if (this.state.isFetching) {
          if (this.state.dataUpdatedAt && s != null && s.cancelRefetch)
            this.cancel({ silent: !0 });
          else if (this.promise) {
            var c;
            return (
              (c = this.retryer) == null || c.continueRetry(), this.promise
            );
          }
        }
        if ((r && this.setOptions(r), !this.options.queryFn)) {
          var u = this.observers.find(function (q) {
            return q.options.queryFn;
          });
          u && this.setOptions(u.options);
        }
        var d = Rr(this.queryKey),
          h = Tl(),
          v = { queryKey: d, pageParam: void 0, meta: this.meta };
        Object.defineProperty(v, 'signal', {
          enumerable: !0,
          get: function () {
            if (h) return (i.abortSignalConsumed = !0), h.signal;
          },
        });
        var g = function () {
            return i.options.queryFn
              ? ((i.abortSignalConsumed = !1), i.options.queryFn(v))
              : Promise.reject('Missing queryFn');
          },
          I = {
            fetchOptions: s,
            options: this.options,
            queryKey: d,
            state: this.state,
            fetchFn: g,
            meta: this.meta,
          };
        if ((o = this.options.behavior) != null && o.onFetch) {
          var W;
          (W = this.options.behavior) == null || W.onFetch(I);
        }
        if (
          ((this.revertState = this.state),
          !this.state.isFetching ||
            this.state.fetchMeta !==
              ((l = I.fetchOptions) == null ? void 0 : l.meta))
        ) {
          var F;
          this.dispatch({
            type: 'fetch',
            meta: (F = I.fetchOptions) == null ? void 0 : F.meta,
          });
        }
        return (
          (this.retryer = new Nl({
            fn: I.fetchFn,
            abort: h == null || (a = h.abort) == null ? void 0 : a.bind(h),
            onSuccess: function (k) {
              i.setData(k),
                i.cache.config.onSuccess == null ||
                  i.cache.config.onSuccess(k, i),
                i.cacheTime === 0 && i.optionalRemove();
            },
            onError: function (k) {
              (br(k) && k.silent) || i.dispatch({ type: 'error', error: k }),
                br(k) ||
                  (i.cache.config.onError == null ||
                    i.cache.config.onError(k, i),
                  Fr().error(k)),
                i.cacheTime === 0 && i.optionalRemove();
            },
            onFail: function () {
              i.dispatch({ type: 'failed' });
            },
            onPause: function () {
              i.dispatch({ type: 'pause' });
            },
            onContinue: function () {
              i.dispatch({ type: 'continue' });
            },
            retry: I.options.retry,
            retryDelay: I.options.retryDelay,
          })),
          (this.promise = this.retryer.promise),
          this.promise
        );
      }),
      (t.dispatch = function (r) {
        var s = this;
        (this.state = this.reducer(this.state, r)),
          Ge.batch(function () {
            s.observers.forEach(function (i) {
              i.onQueryUpdate(r);
            }),
              s.cache.notify({ query: s, type: 'queryUpdated', action: r });
          });
      }),
      (t.getDefaultState = function (r) {
        var s =
            typeof r.initialData == 'function'
              ? r.initialData()
              : r.initialData,
          i = typeof r.initialData < 'u',
          o = i
            ? typeof r.initialDataUpdatedAt == 'function'
              ? r.initialDataUpdatedAt()
              : r.initialDataUpdatedAt
            : 0,
          l = typeof s < 'u';
        return {
          data: s,
          dataUpdateCount: 0,
          dataUpdatedAt: l ? o ?? Date.now() : 0,
          error: null,
          errorUpdateCount: 0,
          errorUpdatedAt: 0,
          fetchFailureCount: 0,
          fetchMeta: null,
          isFetching: !1,
          isInvalidated: !1,
          isPaused: !1,
          status: l ? 'success' : 'idle',
        };
      }),
      (t.reducer = function (r, s) {
        var i, o;
        switch (s.type) {
          case 'failed':
            return we({}, r, { fetchFailureCount: r.fetchFailureCount + 1 });
          case 'pause':
            return we({}, r, { isPaused: !0 });
          case 'continue':
            return we({}, r, { isPaused: !1 });
          case 'fetch':
            return we(
              {},
              r,
              {
                fetchFailureCount: 0,
                fetchMeta: (i = s.meta) != null ? i : null,
                isFetching: !0,
                isPaused: !1,
              },
              !r.dataUpdatedAt && { error: null, status: 'loading' }
            );
          case 'success':
            return we({}, r, {
              data: s.data,
              dataUpdateCount: r.dataUpdateCount + 1,
              dataUpdatedAt: (o = s.dataUpdatedAt) != null ? o : Date.now(),
              error: null,
              fetchFailureCount: 0,
              isFetching: !1,
              isInvalidated: !1,
              isPaused: !1,
              status: 'success',
            });
          case 'error':
            var l = s.error;
            return br(l) && l.revert && this.revertState
              ? we({}, this.revertState)
              : we({}, r, {
                  error: l,
                  errorUpdateCount: r.errorUpdateCount + 1,
                  errorUpdatedAt: Date.now(),
                  fetchFailureCount: r.fetchFailureCount + 1,
                  isFetching: !1,
                  isPaused: !1,
                  status: 'error',
                });
          case 'invalidate':
            return we({}, r, { isInvalidated: !0 });
          case 'setState':
            return we({}, r, s.state);
          default:
            return r;
        }
      }),
      e
    );
  })(),
  Fl = (function (e) {
    Xn(t, e);
    function t(r) {
      var s;
      return (
        (s = e.call(this) || this),
        (s.config = r || {}),
        (s.queries = []),
        (s.queriesMap = {}),
        s
      );
    }
    var n = t.prototype;
    return (
      (n.build = function (s, i, o) {
        var l,
          a = i.queryKey,
          c = (l = i.queryHash) != null ? l : Pi(a, i),
          u = this.get(c);
        return (
          u ||
            ((u = new j0({
              cache: this,
              queryKey: a,
              queryHash: c,
              options: s.defaultQueryOptions(i),
              state: o,
              defaultOptions: s.getQueryDefaults(a),
              meta: i.meta,
            })),
            this.add(u)),
          u
        );
      }),
      (n.add = function (s) {
        this.queriesMap[s.queryHash] ||
          ((this.queriesMap[s.queryHash] = s),
          this.queries.push(s),
          this.notify({ type: 'queryAdded', query: s }));
      }),
      (n.remove = function (s) {
        var i = this.queriesMap[s.queryHash];
        i &&
          (s.destroy(),
          (this.queries = this.queries.filter(function (o) {
            return o !== s;
          })),
          i === s && delete this.queriesMap[s.queryHash],
          this.notify({ type: 'queryRemoved', query: s }));
      }),
      (n.clear = function () {
        var s = this;
        Ge.batch(function () {
          s.queries.forEach(function (i) {
            s.remove(i);
          });
        });
      }),
      (n.get = function (s) {
        return this.queriesMap[s];
      }),
      (n.getAll = function () {
        return this.queries;
      }),
      (n.find = function (s, i) {
        var o = kt(s, i),
          l = o[0];
        return (
          typeof l.exact > 'u' && (l.exact = !0),
          this.queries.find(function (a) {
            return Do(l, a);
          })
        );
      }),
      (n.findAll = function (s, i) {
        var o = kt(s, i),
          l = o[0];
        return Object.keys(l).length > 0
          ? this.queries.filter(function (a) {
              return Do(l, a);
            })
          : this.queries;
      }),
      (n.notify = function (s) {
        var i = this;
        Ge.batch(function () {
          i.listeners.forEach(function (o) {
            o(s);
          });
        });
      }),
      (n.onFocus = function () {
        var s = this;
        Ge.batch(function () {
          s.queries.forEach(function (i) {
            i.onFocus();
          });
        });
      }),
      (n.onOnline = function () {
        var s = this;
        Ge.batch(function () {
          s.queries.forEach(function (i) {
            i.onOnline();
          });
        });
      }),
      t
    );
  })(Zn),
  U0 = (function () {
    function e(n) {
      (this.options = we({}, n.defaultOptions, n.options)),
        (this.mutationId = n.mutationId),
        (this.mutationCache = n.mutationCache),
        (this.observers = []),
        (this.state = n.state || V0()),
        (this.meta = n.meta);
    }
    var t = e.prototype;
    return (
      (t.setState = function (r) {
        this.dispatch({ type: 'setState', state: r });
      }),
      (t.addObserver = function (r) {
        this.observers.indexOf(r) === -1 && this.observers.push(r);
      }),
      (t.removeObserver = function (r) {
        this.observers = this.observers.filter(function (s) {
          return s !== r;
        });
      }),
      (t.cancel = function () {
        return this.retryer
          ? (this.retryer.cancel(), this.retryer.promise.then(He).catch(He))
          : Promise.resolve();
      }),
      (t.continue = function () {
        return this.retryer
          ? (this.retryer.continue(), this.retryer.promise)
          : this.execute();
      }),
      (t.execute = function () {
        var r = this,
          s,
          i = this.state.status === 'loading',
          o = Promise.resolve();
        return (
          i ||
            (this.dispatch({
              type: 'loading',
              variables: this.options.variables,
            }),
            (o = o
              .then(function () {
                r.mutationCache.config.onMutate == null ||
                  r.mutationCache.config.onMutate(r.state.variables, r);
              })
              .then(function () {
                return r.options.onMutate == null
                  ? void 0
                  : r.options.onMutate(r.state.variables);
              })
              .then(function (l) {
                l !== r.state.context &&
                  r.dispatch({
                    type: 'loading',
                    context: l,
                    variables: r.state.variables,
                  });
              }))),
          o
            .then(function () {
              return r.executeMutation();
            })
            .then(function (l) {
              (s = l),
                r.mutationCache.config.onSuccess == null ||
                  r.mutationCache.config.onSuccess(
                    s,
                    r.state.variables,
                    r.state.context,
                    r
                  );
            })
            .then(function () {
              return r.options.onSuccess == null
                ? void 0
                : r.options.onSuccess(s, r.state.variables, r.state.context);
            })
            .then(function () {
              return r.options.onSettled == null
                ? void 0
                : r.options.onSettled(
                    s,
                    null,
                    r.state.variables,
                    r.state.context
                  );
            })
            .then(function () {
              return r.dispatch({ type: 'success', data: s }), s;
            })
            .catch(function (l) {
              return (
                r.mutationCache.config.onError == null ||
                  r.mutationCache.config.onError(
                    l,
                    r.state.variables,
                    r.state.context,
                    r
                  ),
                Fr().error(l),
                Promise.resolve()
                  .then(function () {
                    return r.options.onError == null
                      ? void 0
                      : r.options.onError(
                          l,
                          r.state.variables,
                          r.state.context
                        );
                  })
                  .then(function () {
                    return r.options.onSettled == null
                      ? void 0
                      : r.options.onSettled(
                          void 0,
                          l,
                          r.state.variables,
                          r.state.context
                        );
                  })
                  .then(function () {
                    throw (r.dispatch({ type: 'error', error: l }), l);
                  })
              );
            })
        );
      }),
      (t.executeMutation = function () {
        var r = this,
          s;
        return (
          (this.retryer = new Nl({
            fn: function () {
              return r.options.mutationFn
                ? r.options.mutationFn(r.state.variables)
                : Promise.reject('No mutationFn found');
            },
            onFail: function () {
              r.dispatch({ type: 'failed' });
            },
            onPause: function () {
              r.dispatch({ type: 'pause' });
            },
            onContinue: function () {
              r.dispatch({ type: 'continue' });
            },
            retry: (s = this.options.retry) != null ? s : 0,
            retryDelay: this.options.retryDelay,
          })),
          this.retryer.promise
        );
      }),
      (t.dispatch = function (r) {
        var s = this;
        (this.state = Q0(this.state, r)),
          Ge.batch(function () {
            s.observers.forEach(function (i) {
              i.onMutationUpdate(r);
            }),
              s.mutationCache.notify(s);
          });
      }),
      e
    );
  })();
function V0() {
  return {
    context: void 0,
    data: void 0,
    error: null,
    failureCount: 0,
    isPaused: !1,
    status: 'idle',
    variables: void 0,
  };
}
function Q0(e, t) {
  switch (t.type) {
    case 'failed':
      return we({}, e, { failureCount: e.failureCount + 1 });
    case 'pause':
      return we({}, e, { isPaused: !0 });
    case 'continue':
      return we({}, e, { isPaused: !1 });
    case 'loading':
      return we({}, e, {
        context: t.context,
        data: void 0,
        error: null,
        isPaused: !1,
        status: 'loading',
        variables: t.variables,
      });
    case 'success':
      return we({}, e, {
        data: t.data,
        error: null,
        status: 'success',
        isPaused: !1,
      });
    case 'error':
      return we({}, e, {
        data: void 0,
        error: t.error,
        failureCount: e.failureCount + 1,
        isPaused: !1,
        status: 'error',
      });
    case 'setState':
      return we({}, e, t.state);
    default:
      return e;
  }
}
var kl = (function (e) {
  Xn(t, e);
  function t(r) {
    var s;
    return (
      (s = e.call(this) || this),
      (s.config = r || {}),
      (s.mutations = []),
      (s.mutationId = 0),
      s
    );
  }
  var n = t.prototype;
  return (
    (n.build = function (s, i, o) {
      var l = new U0({
        mutationCache: this,
        mutationId: ++this.mutationId,
        options: s.defaultMutationOptions(i),
        state: o,
        defaultOptions: i.mutationKey
          ? s.getMutationDefaults(i.mutationKey)
          : void 0,
        meta: i.meta,
      });
      return this.add(l), l;
    }),
    (n.add = function (s) {
      this.mutations.push(s), this.notify(s);
    }),
    (n.remove = function (s) {
      (this.mutations = this.mutations.filter(function (i) {
        return i !== s;
      })),
        s.cancel(),
        this.notify(s);
    }),
    (n.clear = function () {
      var s = this;
      Ge.batch(function () {
        s.mutations.forEach(function (i) {
          s.remove(i);
        });
      });
    }),
    (n.getAll = function () {
      return this.mutations;
    }),
    (n.find = function (s) {
      return (
        typeof s.exact > 'u' && (s.exact = !0),
        this.mutations.find(function (i) {
          return jo(s, i);
        })
      );
    }),
    (n.findAll = function (s) {
      return this.mutations.filter(function (i) {
        return jo(s, i);
      });
    }),
    (n.notify = function (s) {
      var i = this;
      Ge.batch(function () {
        i.listeners.forEach(function (o) {
          o(s);
        });
      });
    }),
    (n.onFocus = function () {
      this.resumePausedMutations();
    }),
    (n.onOnline = function () {
      this.resumePausedMutations();
    }),
    (n.resumePausedMutations = function () {
      var s = this.mutations.filter(function (i) {
        return i.state.isPaused;
      });
      return Ge.batch(function () {
        return s.reduce(function (i, o) {
          return i.then(function () {
            return o.continue().catch(He);
          });
        }, Promise.resolve());
      });
    }),
    t
  );
})(Zn);
function q0() {
  return {
    onFetch: function (t) {
      t.fetchFn = function () {
        var n,
          r,
          s,
          i,
          o,
          l,
          a =
            (n = t.fetchOptions) == null || (r = n.meta) == null
              ? void 0
              : r.refetchPage,
          c =
            (s = t.fetchOptions) == null || (i = s.meta) == null
              ? void 0
              : i.fetchMore,
          u = c == null ? void 0 : c.pageParam,
          d = (c == null ? void 0 : c.direction) === 'forward',
          h = (c == null ? void 0 : c.direction) === 'backward',
          v = ((o = t.state.data) == null ? void 0 : o.pages) || [],
          g = ((l = t.state.data) == null ? void 0 : l.pageParams) || [],
          I = Tl(),
          W = I == null ? void 0 : I.signal,
          F = g,
          q = !1,
          k =
            t.options.queryFn ||
            function () {
              return Promise.reject('Missing queryFn');
            },
          oe = function (S, R, N, _) {
            return (
              (F = _ ? [R].concat(F) : [].concat(F, [R])),
              _ ? [N].concat(S) : [].concat(S, [N])
            );
          },
          K = function (S, R, N, _) {
            if (q) return Promise.reject('Cancelled');
            if (typeof N > 'u' && !R && S.length) return Promise.resolve(S);
            var y = {
                queryKey: t.queryKey,
                signal: W,
                pageParam: N,
                meta: t.meta,
              },
              M = k(y),
              te = Promise.resolve(M).then(function (he) {
                return oe(S, N, he, _);
              });
            if (Nr(M)) {
              var re = te;
              re.cancel = M.cancel;
            }
            return te;
          },
          A;
        if (!v.length) A = K([]);
        else if (d) {
          var Y = typeof u < 'u',
            Q = Y ? u : Qo(t.options, v);
          A = K(v, Y, Q);
        } else if (h) {
          var B = typeof u < 'u',
            G = B ? u : z0(t.options, v);
          A = K(v, B, G, !0);
        } else
          (function () {
            F = [];
            var P = typeof t.options.getNextPageParam > 'u',
              S = a && v[0] ? a(v[0], 0, v) : !0;
            A = S ? K([], P, g[0]) : Promise.resolve(oe([], g[0], v[0]));
            for (
              var R = function (y) {
                  A = A.then(function (M) {
                    var te = a && v[y] ? a(v[y], y, v) : !0;
                    if (te) {
                      var re = P ? g[y] : Qo(t.options, M);
                      return K(M, P, re);
                    }
                    return Promise.resolve(oe(M, g[y], v[y]));
                  });
                },
                N = 1;
              N < v.length;
              N++
            )
              R(N);
          })();
        var ue = A.then(function (P) {
            return { pages: P, pageParams: F };
          }),
          z = ue;
        return (
          (z.cancel = function () {
            (q = !0), I == null || I.abort(), Nr(A) && A.cancel();
          }),
          ue
        );
      };
    },
  };
}
function Qo(e, t) {
  return e.getNextPageParam == null
    ? void 0
    : e.getNextPageParam(t[t.length - 1], t);
}
function z0(e, t) {
  return e.getPreviousPageParam == null
    ? void 0
    : e.getPreviousPageParam(t[0], t);
}
var G0 = (function () {
    function e(n) {
      n === void 0 && (n = {}),
        (this.queryCache = n.queryCache || new Fl()),
        (this.mutationCache = n.mutationCache || new kl()),
        (this.defaultOptions = n.defaultOptions || {}),
        (this.queryDefaults = []),
        (this.mutationDefaults = []);
    }
    var t = e.prototype;
    return (
      (t.mount = function () {
        var r = this;
        (this.unsubscribeFocus = Dn.subscribe(function () {
          Dn.isFocused() &&
            _r.isOnline() &&
            (r.mutationCache.onFocus(), r.queryCache.onFocus());
        })),
          (this.unsubscribeOnline = _r.subscribe(function () {
            Dn.isFocused() &&
              _r.isOnline() &&
              (r.mutationCache.onOnline(), r.queryCache.onOnline());
          }));
      }),
      (t.unmount = function () {
        var r, s;
        (r = this.unsubscribeFocus) == null || r.call(this),
          (s = this.unsubscribeOnline) == null || s.call(this);
      }),
      (t.isFetching = function (r, s) {
        var i = kt(r, s),
          o = i[0];
        return (o.fetching = !0), this.queryCache.findAll(o).length;
      }),
      (t.isMutating = function (r) {
        return this.mutationCache.findAll(we({}, r, { fetching: !0 })).length;
      }),
      (t.getQueryData = function (r, s) {
        var i;
        return (i = this.queryCache.find(r, s)) == null ? void 0 : i.state.data;
      }),
      (t.getQueriesData = function (r) {
        return this.getQueryCache()
          .findAll(r)
          .map(function (s) {
            var i = s.queryKey,
              o = s.state,
              l = o.data;
            return [i, l];
          });
      }),
      (t.setQueryData = function (r, s, i) {
        var o = Cs(r),
          l = this.defaultQueryOptions(o);
        return this.queryCache.build(this, l).setData(s, i);
      }),
      (t.setQueriesData = function (r, s, i) {
        var o = this;
        return Ge.batch(function () {
          return o
            .getQueryCache()
            .findAll(r)
            .map(function (l) {
              var a = l.queryKey;
              return [a, o.setQueryData(a, s, i)];
            });
        });
      }),
      (t.getQueryState = function (r, s) {
        var i;
        return (i = this.queryCache.find(r, s)) == null ? void 0 : i.state;
      }),
      (t.removeQueries = function (r, s) {
        var i = kt(r, s),
          o = i[0],
          l = this.queryCache;
        Ge.batch(function () {
          l.findAll(o).forEach(function (a) {
            l.remove(a);
          });
        });
      }),
      (t.resetQueries = function (r, s, i) {
        var o = this,
          l = kt(r, s, i),
          a = l[0],
          c = l[1],
          u = this.queryCache,
          d = we({}, a, { active: !0 });
        return Ge.batch(function () {
          return (
            u.findAll(a).forEach(function (h) {
              h.reset();
            }),
            o.refetchQueries(d, c)
          );
        });
      }),
      (t.cancelQueries = function (r, s, i) {
        var o = this,
          l = kt(r, s, i),
          a = l[0],
          c = l[1],
          u = c === void 0 ? {} : c;
        typeof u.revert > 'u' && (u.revert = !0);
        var d = Ge.batch(function () {
          return o.queryCache.findAll(a).map(function (h) {
            return h.cancel(u);
          });
        });
        return Promise.all(d).then(He).catch(He);
      }),
      (t.invalidateQueries = function (r, s, i) {
        var o,
          l,
          a,
          c = this,
          u = kt(r, s, i),
          d = u[0],
          h = u[1],
          v = we({}, d, {
            active:
              (o = (l = d.refetchActive) != null ? l : d.active) != null
                ? o
                : !0,
            inactive: (a = d.refetchInactive) != null ? a : !1,
          });
        return Ge.batch(function () {
          return (
            c.queryCache.findAll(d).forEach(function (g) {
              g.invalidate();
            }),
            c.refetchQueries(v, h)
          );
        });
      }),
      (t.refetchQueries = function (r, s, i) {
        var o = this,
          l = kt(r, s, i),
          a = l[0],
          c = l[1],
          u = Ge.batch(function () {
            return o.queryCache.findAll(a).map(function (h) {
              return h.fetch(
                void 0,
                we({}, c, {
                  meta: { refetchPage: a == null ? void 0 : a.refetchPage },
                })
              );
            });
          }),
          d = Promise.all(u).then(He);
        return (c != null && c.throwOnError) || (d = d.catch(He)), d;
      }),
      (t.fetchQuery = function (r, s, i) {
        var o = Cs(r, s, i),
          l = this.defaultQueryOptions(o);
        typeof l.retry > 'u' && (l.retry = !1);
        var a = this.queryCache.build(this, l);
        return a.isStaleByTime(l.staleTime)
          ? a.fetch(l)
          : Promise.resolve(a.state.data);
      }),
      (t.prefetchQuery = function (r, s, i) {
        return this.fetchQuery(r, s, i).then(He).catch(He);
      }),
      (t.fetchInfiniteQuery = function (r, s, i) {
        var o = Cs(r, s, i);
        return (o.behavior = q0()), this.fetchQuery(o);
      }),
      (t.prefetchInfiniteQuery = function (r, s, i) {
        return this.fetchInfiniteQuery(r, s, i).then(He).catch(He);
      }),
      (t.cancelMutations = function () {
        var r = this,
          s = Ge.batch(function () {
            return r.mutationCache.getAll().map(function (i) {
              return i.cancel();
            });
          });
        return Promise.all(s).then(He).catch(He);
      }),
      (t.resumePausedMutations = function () {
        return this.getMutationCache().resumePausedMutations();
      }),
      (t.executeMutation = function (r) {
        return this.mutationCache.build(this, r).execute();
      }),
      (t.getQueryCache = function () {
        return this.queryCache;
      }),
      (t.getMutationCache = function () {
        return this.mutationCache;
      }),
      (t.getDefaultOptions = function () {
        return this.defaultOptions;
      }),
      (t.setDefaultOptions = function (r) {
        this.defaultOptions = r;
      }),
      (t.setQueryDefaults = function (r, s) {
        var i = this.queryDefaults.find(function (o) {
          return sn(r) === sn(o.queryKey);
        });
        i
          ? (i.defaultOptions = s)
          : this.queryDefaults.push({ queryKey: r, defaultOptions: s });
      }),
      (t.getQueryDefaults = function (r) {
        var s;
        return r
          ? (s = this.queryDefaults.find(function (i) {
              return Tr(r, i.queryKey);
            })) == null
            ? void 0
            : s.defaultOptions
          : void 0;
      }),
      (t.setMutationDefaults = function (r, s) {
        var i = this.mutationDefaults.find(function (o) {
          return sn(r) === sn(o.mutationKey);
        });
        i
          ? (i.defaultOptions = s)
          : this.mutationDefaults.push({ mutationKey: r, defaultOptions: s });
      }),
      (t.getMutationDefaults = function (r) {
        var s;
        return r
          ? (s = this.mutationDefaults.find(function (i) {
              return Tr(r, i.mutationKey);
            })) == null
            ? void 0
            : s.defaultOptions
          : void 0;
      }),
      (t.defaultQueryOptions = function (r) {
        if (r != null && r._defaulted) return r;
        var s = we(
          {},
          this.defaultOptions.queries,
          this.getQueryDefaults(r == null ? void 0 : r.queryKey),
          r,
          { _defaulted: !0 }
        );
        return (
          !s.queryHash && s.queryKey && (s.queryHash = Pi(s.queryKey, s)), s
        );
      }),
      (t.defaultQueryObserverOptions = function (r) {
        return this.defaultQueryOptions(r);
      }),
      (t.defaultMutationOptions = function (r) {
        return r != null && r._defaulted
          ? r
          : we(
              {},
              this.defaultOptions.mutations,
              this.getMutationDefaults(r == null ? void 0 : r.mutationKey),
              r,
              { _defaulted: !0 }
            );
      }),
      (t.clear = function () {
        this.queryCache.clear(), this.mutationCache.clear();
      }),
      e
    );
  })(),
  H0 = (function (e) {
    Xn(t, e);
    function t(r, s) {
      var i;
      return (
        (i = e.call(this) || this),
        (i.client = r),
        (i.options = s),
        (i.trackedProps = []),
        (i.selectError = null),
        i.bindMethods(),
        i.setOptions(s),
        i
      );
    }
    var n = t.prototype;
    return (
      (n.bindMethods = function () {
        (this.remove = this.remove.bind(this)),
          (this.refetch = this.refetch.bind(this));
      }),
      (n.onSubscribe = function () {
        this.listeners.length === 1 &&
          (this.currentQuery.addObserver(this),
          qo(this.currentQuery, this.options) && this.executeFetch(),
          this.updateTimers());
      }),
      (n.onUnsubscribe = function () {
        this.listeners.length || this.destroy();
      }),
      (n.shouldFetchOnReconnect = function () {
        return Ws(
          this.currentQuery,
          this.options,
          this.options.refetchOnReconnect
        );
      }),
      (n.shouldFetchOnWindowFocus = function () {
        return Ws(
          this.currentQuery,
          this.options,
          this.options.refetchOnWindowFocus
        );
      }),
      (n.destroy = function () {
        (this.listeners = []),
          this.clearTimers(),
          this.currentQuery.removeObserver(this);
      }),
      (n.setOptions = function (s, i) {
        var o = this.options,
          l = this.currentQuery;
        if (
          ((this.options = this.client.defaultQueryObserverOptions(s)),
          typeof this.options.enabled < 'u' &&
            typeof this.options.enabled != 'boolean')
        )
          throw new Error('Expected enabled to be a boolean');
        this.options.queryKey || (this.options.queryKey = o.queryKey),
          this.updateQuery();
        var a = this.hasListeners();
        a && zo(this.currentQuery, l, this.options, o) && this.executeFetch(),
          this.updateResult(i),
          a &&
            (this.currentQuery !== l ||
              this.options.enabled !== o.enabled ||
              this.options.staleTime !== o.staleTime) &&
            this.updateStaleTimeout();
        var c = this.computeRefetchInterval();
        a &&
          (this.currentQuery !== l ||
            this.options.enabled !== o.enabled ||
            c !== this.currentRefetchInterval) &&
          this.updateRefetchInterval(c);
      }),
      (n.getOptimisticResult = function (s) {
        var i = this.client.defaultQueryObserverOptions(s),
          o = this.client.getQueryCache().build(this.client, i);
        return this.createResult(o, i);
      }),
      (n.getCurrentResult = function () {
        return this.currentResult;
      }),
      (n.trackResult = function (s, i) {
        var o = this,
          l = {},
          a = function (u) {
            o.trackedProps.includes(u) || o.trackedProps.push(u);
          };
        return (
          Object.keys(s).forEach(function (c) {
            Object.defineProperty(l, c, {
              configurable: !1,
              enumerable: !0,
              get: function () {
                return a(c), s[c];
              },
            });
          }),
          (i.useErrorBoundary || i.suspense) && a('error'),
          l
        );
      }),
      (n.getNextResult = function (s) {
        var i = this;
        return new Promise(function (o, l) {
          var a = i.subscribe(function (c) {
            c.isFetching ||
              (a(),
              c.isError && s != null && s.throwOnError ? l(c.error) : o(c));
          });
        });
      }),
      (n.getCurrentQuery = function () {
        return this.currentQuery;
      }),
      (n.remove = function () {
        this.client.getQueryCache().remove(this.currentQuery);
      }),
      (n.refetch = function (s) {
        return this.fetch(
          we({}, s, {
            meta: { refetchPage: s == null ? void 0 : s.refetchPage },
          })
        );
      }),
      (n.fetchOptimistic = function (s) {
        var i = this,
          o = this.client.defaultQueryObserverOptions(s),
          l = this.client.getQueryCache().build(this.client, o);
        return l.fetch().then(function () {
          return i.createResult(l, o);
        });
      }),
      (n.fetch = function (s) {
        var i = this;
        return this.executeFetch(s).then(function () {
          return i.updateResult(), i.currentResult;
        });
      }),
      (n.executeFetch = function (s) {
        this.updateQuery();
        var i = this.currentQuery.fetch(this.options, s);
        return (s != null && s.throwOnError) || (i = i.catch(He)), i;
      }),
      (n.updateStaleTimeout = function () {
        var s = this;
        if (
          (this.clearStaleTimeout(),
          !(Lr || this.currentResult.isStale || !Ks(this.options.staleTime)))
        ) {
          var i = Ll(this.currentResult.dataUpdatedAt, this.options.staleTime),
            o = i + 1;
          this.staleTimeoutId = setTimeout(function () {
            s.currentResult.isStale || s.updateResult();
          }, o);
        }
      }),
      (n.computeRefetchInterval = function () {
        var s;
        return typeof this.options.refetchInterval == 'function'
          ? this.options.refetchInterval(
              this.currentResult.data,
              this.currentQuery
            )
          : (s = this.options.refetchInterval) != null
            ? s
            : !1;
      }),
      (n.updateRefetchInterval = function (s) {
        var i = this;
        this.clearRefetchInterval(),
          (this.currentRefetchInterval = s),
          !(
            Lr ||
            this.options.enabled === !1 ||
            !Ks(this.currentRefetchInterval) ||
            this.currentRefetchInterval === 0
          ) &&
            (this.refetchIntervalId = setInterval(function () {
              (i.options.refetchIntervalInBackground || Dn.isFocused()) &&
                i.executeFetch();
            }, this.currentRefetchInterval));
      }),
      (n.updateTimers = function () {
        this.updateStaleTimeout(),
          this.updateRefetchInterval(this.computeRefetchInterval());
      }),
      (n.clearTimers = function () {
        this.clearStaleTimeout(), this.clearRefetchInterval();
      }),
      (n.clearStaleTimeout = function () {
        this.staleTimeoutId &&
          (clearTimeout(this.staleTimeoutId), (this.staleTimeoutId = void 0));
      }),
      (n.clearRefetchInterval = function () {
        this.refetchIntervalId &&
          (clearInterval(this.refetchIntervalId),
          (this.refetchIntervalId = void 0));
      }),
      (n.createResult = function (s, i) {
        var o = this.currentQuery,
          l = this.options,
          a = this.currentResult,
          c = this.currentResultState,
          u = this.currentResultOptions,
          d = s !== o,
          h = d ? s.state : this.currentQueryInitialState,
          v = d ? this.currentResult : this.previousQueryResult,
          g = s.state,
          I = g.dataUpdatedAt,
          W = g.error,
          F = g.errorUpdatedAt,
          q = g.isFetching,
          k = g.status,
          oe = !1,
          K = !1,
          A;
        if (i.optimisticResults) {
          var Y = this.hasListeners(),
            Q = !Y && qo(s, i),
            B = Y && zo(s, o, i, l);
          (Q || B) && ((q = !0), I || (k = 'loading'));
        }
        if (
          i.keepPreviousData &&
          !g.dataUpdateCount &&
          v != null &&
          v.isSuccess &&
          k !== 'error'
        )
          (A = v.data), (I = v.dataUpdatedAt), (k = v.status), (oe = !0);
        else if (i.select && typeof g.data < 'u')
          if (
            a &&
            g.data === (c == null ? void 0 : c.data) &&
            i.select === this.selectFn
          )
            A = this.selectResult;
          else
            try {
              (this.selectFn = i.select),
                (A = i.select(g.data)),
                i.structuralSharing !== !1 &&
                  (A = Mr(a == null ? void 0 : a.data, A)),
                (this.selectResult = A),
                (this.selectError = null);
            } catch (z) {
              Fr().error(z), (this.selectError = z);
            }
        else A = g.data;
        if (
          typeof i.placeholderData < 'u' &&
          typeof A > 'u' &&
          (k === 'loading' || k === 'idle')
        ) {
          var G;
          if (
            a != null &&
            a.isPlaceholderData &&
            i.placeholderData === (u == null ? void 0 : u.placeholderData)
          )
            G = a.data;
          else if (
            ((G =
              typeof i.placeholderData == 'function'
                ? i.placeholderData()
                : i.placeholderData),
            i.select && typeof G < 'u')
          )
            try {
              (G = i.select(G)),
                i.structuralSharing !== !1 &&
                  (G = Mr(a == null ? void 0 : a.data, G)),
                (this.selectError = null);
            } catch (z) {
              Fr().error(z), (this.selectError = z);
            }
          typeof G < 'u' && ((k = 'success'), (A = G), (K = !0));
        }
        this.selectError &&
          ((W = this.selectError),
          (A = this.selectResult),
          (F = Date.now()),
          (k = 'error'));
        var ue = {
          status: k,
          isLoading: k === 'loading',
          isSuccess: k === 'success',
          isError: k === 'error',
          isIdle: k === 'idle',
          data: A,
          dataUpdatedAt: I,
          error: W,
          errorUpdatedAt: F,
          failureCount: g.fetchFailureCount,
          errorUpdateCount: g.errorUpdateCount,
          isFetched: g.dataUpdateCount > 0 || g.errorUpdateCount > 0,
          isFetchedAfterMount:
            g.dataUpdateCount > h.dataUpdateCount ||
            g.errorUpdateCount > h.errorUpdateCount,
          isFetching: q,
          isRefetching: q && k !== 'loading',
          isLoadingError: k === 'error' && g.dataUpdatedAt === 0,
          isPlaceholderData: K,
          isPreviousData: oe,
          isRefetchError: k === 'error' && g.dataUpdatedAt !== 0,
          isStale: Li(s, i),
          refetch: this.refetch,
          remove: this.remove,
        };
        return ue;
      }),
      (n.shouldNotifyListeners = function (s, i) {
        if (!i) return !0;
        var o = this.options,
          l = o.notifyOnChangeProps,
          a = o.notifyOnChangePropsExclusions;
        if ((!l && !a) || (l === 'tracked' && !this.trackedProps.length))
          return !0;
        var c = l === 'tracked' ? this.trackedProps : l;
        return Object.keys(s).some(function (u) {
          var d = u,
            h = s[d] !== i[d],
            v =
              c == null
                ? void 0
                : c.some(function (I) {
                    return I === u;
                  }),
            g =
              a == null
                ? void 0
                : a.some(function (I) {
                    return I === u;
                  });
          return h && !g && (!c || v);
        });
      }),
      (n.updateResult = function (s) {
        var i = this.currentResult;
        if (
          ((this.currentResult = this.createResult(
            this.currentQuery,
            this.options
          )),
          (this.currentResultState = this.currentQuery.state),
          (this.currentResultOptions = this.options),
          !R0(this.currentResult, i))
        ) {
          var o = { cache: !0 };
          (s == null ? void 0 : s.listeners) !== !1 &&
            this.shouldNotifyListeners(this.currentResult, i) &&
            (o.listeners = !0),
            this.notify(we({}, o, s));
        }
      }),
      (n.updateQuery = function () {
        var s = this.client.getQueryCache().build(this.client, this.options);
        if (s !== this.currentQuery) {
          var i = this.currentQuery;
          (this.currentQuery = s),
            (this.currentQueryInitialState = s.state),
            (this.previousQueryResult = this.currentResult),
            this.hasListeners() &&
              (i == null || i.removeObserver(this), s.addObserver(this));
        }
      }),
      (n.onQueryUpdate = function (s) {
        var i = {};
        s.type === 'success'
          ? (i.onSuccess = !0)
          : s.type === 'error' && !br(s.error) && (i.onError = !0),
          this.updateResult(i),
          this.hasListeners() && this.updateTimers();
      }),
      (n.notify = function (s) {
        var i = this;
        Ge.batch(function () {
          s.onSuccess
            ? (i.options.onSuccess == null ||
                i.options.onSuccess(i.currentResult.data),
              i.options.onSettled == null ||
                i.options.onSettled(i.currentResult.data, null))
            : s.onError &&
              (i.options.onError == null ||
                i.options.onError(i.currentResult.error),
              i.options.onSettled == null ||
                i.options.onSettled(void 0, i.currentResult.error)),
            s.listeners &&
              i.listeners.forEach(function (o) {
                o(i.currentResult);
              }),
            s.cache &&
              i.client
                .getQueryCache()
                .notify({
                  query: i.currentQuery,
                  type: 'observerResultsUpdated',
                });
        });
      }),
      t
    );
  })(Zn);
function K0(e, t) {
  return (
    t.enabled !== !1 &&
    !e.state.dataUpdatedAt &&
    !(e.state.status === 'error' && t.retryOnMount === !1)
  );
}
function qo(e, t) {
  return K0(e, t) || (e.state.dataUpdatedAt > 0 && Ws(e, t, t.refetchOnMount));
}
function Ws(e, t, n) {
  if (t.enabled !== !1) {
    var r = typeof n == 'function' ? n(e) : n;
    return r === 'always' || (r !== !1 && Li(e, t));
  }
  return !1;
}
function zo(e, t, n, r) {
  return (
    n.enabled !== !1 &&
    (e !== t || r.enabled === !1) &&
    (!n.suspense || e.state.status !== 'error') &&
    Li(e, n)
  );
}
function Li(e, t) {
  return e.isStaleByTime(t.staleTime);
}
var Ri = { exports: {} },
  Dl = {
    À: 'A',
    Á: 'A',
    Â: 'A',
    Ã: 'A',
    Ä: 'A',
    Å: 'A',
    Ấ: 'A',
    Ắ: 'A',
    Ẳ: 'A',
    Ẵ: 'A',
    Ặ: 'A',
    Æ: 'AE',
    Ầ: 'A',
    Ằ: 'A',
    Ȃ: 'A',
    Ả: 'A',
    Ạ: 'A',
    Ẩ: 'A',
    Ẫ: 'A',
    Ậ: 'A',
    Ç: 'C',
    Ḉ: 'C',
    È: 'E',
    É: 'E',
    Ê: 'E',
    Ë: 'E',
    Ế: 'E',
    Ḗ: 'E',
    Ề: 'E',
    Ḕ: 'E',
    Ḝ: 'E',
    Ȇ: 'E',
    Ẻ: 'E',
    Ẽ: 'E',
    Ẹ: 'E',
    Ể: 'E',
    Ễ: 'E',
    Ệ: 'E',
    Ì: 'I',
    Í: 'I',
    Î: 'I',
    Ï: 'I',
    Ḯ: 'I',
    Ȋ: 'I',
    Ỉ: 'I',
    Ị: 'I',
    Ð: 'D',
    Ñ: 'N',
    Ò: 'O',
    Ó: 'O',
    Ô: 'O',
    Õ: 'O',
    Ö: 'O',
    Ø: 'O',
    Ố: 'O',
    Ṍ: 'O',
    Ṓ: 'O',
    Ȏ: 'O',
    Ỏ: 'O',
    Ọ: 'O',
    Ổ: 'O',
    Ỗ: 'O',
    Ộ: 'O',
    Ờ: 'O',
    Ở: 'O',
    Ỡ: 'O',
    Ớ: 'O',
    Ợ: 'O',
    Ù: 'U',
    Ú: 'U',
    Û: 'U',
    Ü: 'U',
    Ủ: 'U',
    Ụ: 'U',
    Ử: 'U',
    Ữ: 'U',
    Ự: 'U',
    Ý: 'Y',
    à: 'a',
    á: 'a',
    â: 'a',
    ã: 'a',
    ä: 'a',
    å: 'a',
    ấ: 'a',
    ắ: 'a',
    ẳ: 'a',
    ẵ: 'a',
    ặ: 'a',
    æ: 'ae',
    ầ: 'a',
    ằ: 'a',
    ȃ: 'a',
    ả: 'a',
    ạ: 'a',
    ẩ: 'a',
    ẫ: 'a',
    ậ: 'a',
    ç: 'c',
    ḉ: 'c',
    è: 'e',
    é: 'e',
    ê: 'e',
    ë: 'e',
    ế: 'e',
    ḗ: 'e',
    ề: 'e',
    ḕ: 'e',
    ḝ: 'e',
    ȇ: 'e',
    ẻ: 'e',
    ẽ: 'e',
    ẹ: 'e',
    ể: 'e',
    ễ: 'e',
    ệ: 'e',
    ì: 'i',
    í: 'i',
    î: 'i',
    ï: 'i',
    ḯ: 'i',
    ȋ: 'i',
    ỉ: 'i',
    ị: 'i',
    ð: 'd',
    ñ: 'n',
    ò: 'o',
    ó: 'o',
    ô: 'o',
    õ: 'o',
    ö: 'o',
    ø: 'o',
    ố: 'o',
    ṍ: 'o',
    ṓ: 'o',
    ȏ: 'o',
    ỏ: 'o',
    ọ: 'o',
    ổ: 'o',
    ỗ: 'o',
    ộ: 'o',
    ờ: 'o',
    ở: 'o',
    ỡ: 'o',
    ớ: 'o',
    ợ: 'o',
    ù: 'u',
    ú: 'u',
    û: 'u',
    ü: 'u',
    ủ: 'u',
    ụ: 'u',
    ử: 'u',
    ữ: 'u',
    ự: 'u',
    ý: 'y',
    ÿ: 'y',
    Ā: 'A',
    ā: 'a',
    Ă: 'A',
    ă: 'a',
    Ą: 'A',
    ą: 'a',
    Ć: 'C',
    ć: 'c',
    Ĉ: 'C',
    ĉ: 'c',
    Ċ: 'C',
    ċ: 'c',
    Č: 'C',
    č: 'c',
    C̆: 'C',
    c̆: 'c',
    Ď: 'D',
    ď: 'd',
    Đ: 'D',
    đ: 'd',
    Ē: 'E',
    ē: 'e',
    Ĕ: 'E',
    ĕ: 'e',
    Ė: 'E',
    ė: 'e',
    Ę: 'E',
    ę: 'e',
    Ě: 'E',
    ě: 'e',
    Ĝ: 'G',
    Ǵ: 'G',
    ĝ: 'g',
    ǵ: 'g',
    Ğ: 'G',
    ğ: 'g',
    Ġ: 'G',
    ġ: 'g',
    Ģ: 'G',
    ģ: 'g',
    Ĥ: 'H',
    ĥ: 'h',
    Ħ: 'H',
    ħ: 'h',
    Ḫ: 'H',
    ḫ: 'h',
    Ĩ: 'I',
    ĩ: 'i',
    Ī: 'I',
    ī: 'i',
    Ĭ: 'I',
    ĭ: 'i',
    Į: 'I',
    į: 'i',
    İ: 'I',
    ı: 'i',
    Ĳ: 'IJ',
    ĳ: 'ij',
    Ĵ: 'J',
    ĵ: 'j',
    Ķ: 'K',
    ķ: 'k',
    Ḱ: 'K',
    ḱ: 'k',
    K̆: 'K',
    k̆: 'k',
    Ĺ: 'L',
    ĺ: 'l',
    Ļ: 'L',
    ļ: 'l',
    Ľ: 'L',
    ľ: 'l',
    Ŀ: 'L',
    ŀ: 'l',
    Ł: 'l',
    ł: 'l',
    Ḿ: 'M',
    ḿ: 'm',
    M̆: 'M',
    m̆: 'm',
    Ń: 'N',
    ń: 'n',
    Ņ: 'N',
    ņ: 'n',
    Ň: 'N',
    ň: 'n',
    ŉ: 'n',
    N̆: 'N',
    n̆: 'n',
    Ō: 'O',
    ō: 'o',
    Ŏ: 'O',
    ŏ: 'o',
    Ő: 'O',
    ő: 'o',
    Œ: 'OE',
    œ: 'oe',
    P̆: 'P',
    p̆: 'p',
    Ŕ: 'R',
    ŕ: 'r',
    Ŗ: 'R',
    ŗ: 'r',
    Ř: 'R',
    ř: 'r',
    R̆: 'R',
    r̆: 'r',
    Ȓ: 'R',
    ȓ: 'r',
    Ś: 'S',
    ś: 's',
    Ŝ: 'S',
    ŝ: 's',
    Ş: 'S',
    Ș: 'S',
    ș: 's',
    ş: 's',
    Š: 'S',
    š: 's',
    Ţ: 'T',
    ţ: 't',
    ț: 't',
    Ț: 'T',
    Ť: 'T',
    ť: 't',
    Ŧ: 'T',
    ŧ: 't',
    T̆: 'T',
    t̆: 't',
    Ũ: 'U',
    ũ: 'u',
    Ū: 'U',
    ū: 'u',
    Ŭ: 'U',
    ŭ: 'u',
    Ů: 'U',
    ů: 'u',
    Ű: 'U',
    ű: 'u',
    Ų: 'U',
    ų: 'u',
    Ȗ: 'U',
    ȗ: 'u',
    V̆: 'V',
    v̆: 'v',
    Ŵ: 'W',
    ŵ: 'w',
    Ẃ: 'W',
    ẃ: 'w',
    X̆: 'X',
    x̆: 'x',
    Ŷ: 'Y',
    ŷ: 'y',
    Ÿ: 'Y',
    Y̆: 'Y',
    y̆: 'y',
    Ź: 'Z',
    ź: 'z',
    Ż: 'Z',
    ż: 'z',
    Ž: 'Z',
    ž: 'z',
    ſ: 's',
    ƒ: 'f',
    Ơ: 'O',
    ơ: 'o',
    Ư: 'U',
    ư: 'u',
    Ǎ: 'A',
    ǎ: 'a',
    Ǐ: 'I',
    ǐ: 'i',
    Ǒ: 'O',
    ǒ: 'o',
    Ǔ: 'U',
    ǔ: 'u',
    Ǖ: 'U',
    ǖ: 'u',
    Ǘ: 'U',
    ǘ: 'u',
    Ǚ: 'U',
    ǚ: 'u',
    Ǜ: 'U',
    ǜ: 'u',
    Ứ: 'U',
    ứ: 'u',
    Ṹ: 'U',
    ṹ: 'u',
    Ǻ: 'A',
    ǻ: 'a',
    Ǽ: 'AE',
    ǽ: 'ae',
    Ǿ: 'O',
    ǿ: 'o',
    Þ: 'TH',
    þ: 'th',
    Ṕ: 'P',
    ṕ: 'p',
    Ṥ: 'S',
    ṥ: 's',
    X́: 'X',
    x́: 'x',
    Ѓ: 'Г',
    ѓ: 'г',
    Ќ: 'К',
    ќ: 'к',
    A̋: 'A',
    a̋: 'a',
    E̋: 'E',
    e̋: 'e',
    I̋: 'I',
    i̋: 'i',
    Ǹ: 'N',
    ǹ: 'n',
    Ồ: 'O',
    ồ: 'o',
    Ṑ: 'O',
    ṑ: 'o',
    Ừ: 'U',
    ừ: 'u',
    Ẁ: 'W',
    ẁ: 'w',
    Ỳ: 'Y',
    ỳ: 'y',
    Ȁ: 'A',
    ȁ: 'a',
    Ȅ: 'E',
    ȅ: 'e',
    Ȉ: 'I',
    ȉ: 'i',
    Ȍ: 'O',
    ȍ: 'o',
    Ȑ: 'R',
    ȑ: 'r',
    Ȕ: 'U',
    ȕ: 'u',
    B̌: 'B',
    b̌: 'b',
    Č̣: 'C',
    č̣: 'c',
    Ê̌: 'E',
    ê̌: 'e',
    F̌: 'F',
    f̌: 'f',
    Ǧ: 'G',
    ǧ: 'g',
    Ȟ: 'H',
    ȟ: 'h',
    J̌: 'J',
    ǰ: 'j',
    Ǩ: 'K',
    ǩ: 'k',
    M̌: 'M',
    m̌: 'm',
    P̌: 'P',
    p̌: 'p',
    Q̌: 'Q',
    q̌: 'q',
    Ř̩: 'R',
    ř̩: 'r',
    Ṧ: 'S',
    ṧ: 's',
    V̌: 'V',
    v̌: 'v',
    W̌: 'W',
    w̌: 'w',
    X̌: 'X',
    x̌: 'x',
    Y̌: 'Y',
    y̌: 'y',
    A̧: 'A',
    a̧: 'a',
    B̧: 'B',
    b̧: 'b',
    Ḑ: 'D',
    ḑ: 'd',
    Ȩ: 'E',
    ȩ: 'e',
    Ɛ̧: 'E',
    ɛ̧: 'e',
    Ḩ: 'H',
    ḩ: 'h',
    I̧: 'I',
    i̧: 'i',
    Ɨ̧: 'I',
    ɨ̧: 'i',
    M̧: 'M',
    m̧: 'm',
    O̧: 'O',
    o̧: 'o',
    Q̧: 'Q',
    q̧: 'q',
    U̧: 'U',
    u̧: 'u',
    X̧: 'X',
    x̧: 'x',
    Z̧: 'Z',
    z̧: 'z',
    й: 'и',
    Й: 'И',
    ё: 'е',
    Ё: 'Е',
  },
  jl = Object.keys(Dl).join('|'),
  B0 = new RegExp(jl, 'g'),
  W0 = new RegExp(jl, '');
function J0(e) {
  return Dl[e];
}
var Ul = function (e) {
    return e.replace(B0, J0);
  },
  X0 = function (e) {
    return !!e.match(W0);
  };
Ri.exports = Ul;
Ri.exports.has = X0;
Ri.exports.remove = Ul;
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */ var Js =
  function (e, t) {
    return (
      (Js =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (n, r) {
            n.__proto__ = r;
          }) ||
        function (n, r) {
          for (var s in r)
            Object.prototype.hasOwnProperty.call(r, s) && (n[s] = r[s]);
        }),
      Js(e, t)
    );
  };
function Ti(e, t) {
  if (typeof t != 'function' && t !== null)
    throw new TypeError(
      'Class extends value ' + String(t) + ' is not a constructor or null'
    );
  Js(e, t);
  function n() {
    this.constructor = e;
  }
  e.prototype =
    t === null ? Object.create(t) : ((n.prototype = t.prototype), new n());
}
var Dt = function () {
    return (
      (Dt =
        Object.assign ||
        function (t) {
          for (var n, r = 1, s = arguments.length; r < s; r++) {
            n = arguments[r];
            for (var i in n)
              Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i]);
          }
          return t;
        }),
      Dt.apply(this, arguments)
    );
  },
  Z0 = 'VUE_QUERY_CLIENT';
function Xs(e) {
  var t = e ? ':'.concat(e) : '';
  return ''.concat(Z0).concat(t);
}
function ot(e) {
  return typeof e == 'string' || Array.isArray(e);
}
function Y0(e, t) {
  Object.keys(e).forEach(function (n) {
    e[n] = t[n];
  });
}
function Zs(e, t) {
  if (t) {
    var n = t(e);
    if (n !== void 0 || Qe(e)) return n;
  }
  if (Array.isArray(e))
    return e.map(function (s) {
      return Zs(s, t);
    });
  if (typeof e == 'object' && eg(e)) {
    var r = Object.entries(e).map(function (s) {
      var i = s[0],
        o = s[1];
      return [i, Zs(o, t)];
    });
    return Object.fromEntries(r);
  }
  return e;
}
function ae(e) {
  return Zs(e, function (t) {
    if (Qe(t)) return ae(J(t));
  });
}
function eg(e) {
  if (Object.prototype.toString.call(e) !== '[object Object]') return !1;
  var t = Object.getPrototypeOf(e);
  return t === null || t === Object.prototype;
}
function tg(e) {
  var t;
  e === void 0 && (e = '');
  var n = (t = Br()) === null || t === void 0 ? void 0 : t.proxy;
  if (!n)
    throw new Error(
      'vue-query hooks can only be used inside setup() function.'
    );
  var r = Xs(e),
    s = $t(r);
  if (!s)
    throw new Error(
      "No 'queryClient' found in Vue context, use 'VueQueryPlugin' to properly initialize the library."
    );
  return s;
}
var ng = (function (e) {
    Ti(t, e);
    function t() {
      return (e !== null && e.apply(this, arguments)) || this;
    }
    return (
      (t.prototype.find = function (n, r) {
        var s = ae(n),
          i = ae(r);
        return e.prototype.find.call(this, s, i);
      }),
      (t.prototype.findAll = function (n, r) {
        var s = ae(n),
          i = ae(r);
        return ot(s)
          ? e.prototype.findAll.call(this, s, i)
          : e.prototype.findAll.call(this, s);
      }),
      t
    );
  })(Fl),
  rg = (function (e) {
    Ti(t, e);
    function t() {
      return (e !== null && e.apply(this, arguments)) || this;
    }
    return (
      (t.prototype.find = function (n) {
        return e.prototype.find.call(this, ae(n));
      }),
      (t.prototype.findAll = function (n) {
        return e.prototype.findAll.call(this, ae(n));
      }),
      t
    );
  })(kl),
  Go = (function (e) {
    Ti(t, e);
    function t(n) {
      n === void 0 && (n = {});
      var r = ae(n),
        s = {
          defaultOptions: ae(r.defaultOptions),
          queryCache: r.queryCache || new ng(),
          mutationCache: r.mutationCache || new rg(),
        };
      return e.call(this, s) || this;
    }
    return (
      (t.prototype.isFetching = function (n, r) {
        var s = ae(n),
          i = ae(r);
        return ot(s)
          ? e.prototype.isFetching.call(this, s, i)
          : e.prototype.isFetching.call(this, s);
      }),
      (t.prototype.isMutating = function (n) {
        return e.prototype.isMutating.call(this, ae(n));
      }),
      (t.prototype.getQueryData = function (n, r) {
        return e.prototype.getQueryData.call(this, ae(n), ae(r));
      }),
      (t.prototype.getQueriesData = function (n) {
        var r = ae(n);
        return ot(r)
          ? e.prototype.getQueriesData.call(this, r)
          : e.prototype.getQueriesData.call(this, r);
      }),
      (t.prototype.setQueryData = function (n, r, s) {
        return e.prototype.setQueryData.call(this, ae(n), r, ae(s));
      }),
      (t.prototype.setQueriesData = function (n, r, s) {
        var i = ae(n),
          o = ae(s);
        return ot(i)
          ? e.prototype.setQueriesData.call(this, i, r, o)
          : e.prototype.setQueriesData.call(this, i, r, o);
      }),
      (t.prototype.getQueryState = function (n, r) {
        return e.prototype.getQueryState.call(this, ae(n), ae(r));
      }),
      (t.prototype.removeQueries = function (n, r) {
        var s = ae(n);
        return ot(s)
          ? e.prototype.removeQueries.call(this, s, ae(r))
          : e.prototype.removeQueries.call(this, s);
      }),
      (t.prototype.resetQueries = function (n, r, s) {
        var i = ae(n),
          o = ae(r);
        return ot(i)
          ? e.prototype.resetQueries.call(this, i, o, ae(s))
          : e.prototype.resetQueries.call(this, i, o);
      }),
      (t.prototype.cancelQueries = function (n, r, s) {
        var i = ae(n),
          o = ae(r);
        return ot(i)
          ? e.prototype.cancelQueries.call(this, i, o, ae(s))
          : e.prototype.cancelQueries.call(this, i, o);
      }),
      (t.prototype.invalidateQueries = function (n, r, s) {
        var i = ae(n),
          o = ae(r);
        return ot(i)
          ? e.prototype.invalidateQueries.call(this, i, o, ae(s))
          : e.prototype.invalidateQueries.call(this, i, o);
      }),
      (t.prototype.refetchQueries = function (n, r, s) {
        var i = ae(n),
          o = ae(r);
        return ot(i)
          ? e.prototype.refetchQueries.call(this, i, o, ae(s))
          : e.prototype.refetchQueries.call(this, i, o);
      }),
      (t.prototype.fetchQuery = function (n, r, s) {
        var i = ae(n),
          o = ae(r);
        return ot(i)
          ? e.prototype.fetchQuery.call(this, i, o, ae(s))
          : e.prototype.fetchQuery.call(this, i);
      }),
      (t.prototype.prefetchQuery = function (n, r, s) {
        return e.prototype.prefetchQuery.call(this, ae(n), ae(r), ae(s));
      }),
      (t.prototype.fetchInfiniteQuery = function (n, r, s) {
        var i = ae(n),
          o = ae(r);
        return ot(i)
          ? e.prototype.fetchInfiniteQuery.call(this, i, o, ae(s))
          : e.prototype.fetchInfiniteQuery.call(this, i);
      }),
      (t.prototype.prefetchInfiniteQuery = function (n, r, s) {
        return e.prototype.prefetchInfiniteQuery.call(
          this,
          ae(n),
          ae(r),
          ae(s)
        );
      }),
      (t.prototype.setDefaultOptions = function (n) {
        e.prototype.setDefaultOptions.call(this, ae(n));
      }),
      (t.prototype.setQueryDefaults = function (n, r) {
        e.prototype.setQueryDefaults.call(this, ae(n), ae(r));
      }),
      (t.prototype.getQueryDefaults = function (n) {
        return e.prototype.getQueryDefaults.call(this, ae(n));
      }),
      (t.prototype.setMutationDefaults = function (n, r) {
        e.prototype.setMutationDefaults.call(this, ae(n), ae(r));
      }),
      (t.prototype.getMutationDefaults = function (n) {
        return e.prototype.getMutationDefaults.call(this, ae(n));
      }),
      t
    );
  })(G0),
  Ho;
(function (e) {
  (e[(e.Fetching = 0)] = 'Fetching'),
    (e[(e.Fresh = 1)] = 'Fresh'),
    (e[(e.Stale = 2)] = 'Stale'),
    (e[(e.Inactive = 3)] = 'Inactive');
})(Ho || (Ho = {}));
var sg = {
  install: function (e, t) {
    var n;
    t === void 0 && (t = {});
    var r = Xs(t.queryClientKey),
      s;
    if ('queryClient' in t && t.queryClient) s = t.queryClient;
    else if (t.contextSharing && typeof window < 'u')
      if (window.__VUE_QUERY_CONTEXT__) s = window.__VUE_QUERY_CONTEXT__;
      else {
        var i = 'queryClientConfig' in t ? t.queryClientConfig : void 0;
        (s = new Go(i)), (window.__VUE_QUERY_CONTEXT__ = s);
      }
    else {
      var i = 'queryClientConfig' in t ? t.queryClientConfig : void 0;
      s = new Go(i);
    }
    s.mount();
    var o = function () {
      var a;
      s.unmount(),
        (a = t.additionalClients) === null ||
          a === void 0 ||
          a.forEach(function (c) {
            c.queryClient.unmount();
          });
    };
    if (e.onUnmount) e.onUnmount(o);
    else {
      var l = e.unmount;
      e.unmount = function () {
        o(), l();
      };
    }
    e.provide(r, s),
      (n = t.additionalClients) === null ||
        n === void 0 ||
        n.forEach(function (a) {
          var c = Xs(a.queryClientKey);
          e.provide(c, a.queryClient), a.queryClient.mount();
        });
  },
};
function ig(e, t, n, r) {
  n === void 0 && (n = {}), r === void 0 && (r = {});
  var s = u(),
    i = tg(s.queryClientKey),
    o = i.defaultQueryObserverOptions(s),
    l = new e(i, o),
    a = Kn(l.getCurrentResult()),
    c = l.subscribe(function (d) {
      Y0(a, d);
    });
  return (
    Ne(
      [
        function () {
          return t;
        },
        function () {
          return n;
        },
        function () {
          return r;
        },
      ],
      function () {
        l.setOptions(i.defaultQueryObserverOptions(u()));
      },
      { deep: !0 }
    ),
    oa(function () {
      c();
    }),
    Dt(Dt({}, Rc(Vr(a))), {
      suspense: function () {
        return l.fetchOptimistic(o);
      },
    })
  );
  function u() {
    var d;
    return (
      ot(t)
        ? typeof n == 'function'
          ? (d = Dt(Dt({}, r), { queryKey: t, queryFn: n }))
          : (d = Dt(Dt({}, n), { queryKey: t }))
        : (d = t),
      ae(d)
    );
  }
}
function Ko(e, t, n) {
  return ig(H0, e, t, n);
}
const ct = e => (Bn('data-v-ddf2b3f2'), (e = e()), Wn(), e),
  og = { key: 0, class: 'pb-3' },
  ag = {
    key: 0,
    class:
      'grid grid-cols-[32px_1fr_32px] justify-items-center items-center px-3 border-b border-b-[color:var(--vscode-panel-border)] sticky top-0 bg-[color:var(--vscode-sideBar-background)] z-30',
  },
  lg = ct(() =>
    w(
      'div',
      { class: 'uppercase tracking-wider text-xs font-bold' },
      'Details',
      -1
    )
  ),
  cg = { class: 'grid gap-y-2 px-3 mt-3 grid-cols-2' },
  ug = { class: 'col-span-2' },
  fg = ct(() => w('div', { class: 'title' }, 'Name', -1)),
  dg = { key: 0, class: 'col-span-2' },
  hg = ct(() => w('div', { class: 'title' }, 'Repository', -1)),
  pg = ['href'],
  vg = { key: 1, class: 'col-span-2' },
  gg = ct(() => w('div', { class: 'title' }, 'Homepage', -1)),
  mg = ['href'],
  yg = ct(() => w('div', { class: 'title' }, 'License', -1)),
  _g = ct(() => w('div', { class: 'title' }, 'Downloads(30d)', -1)),
  bg = ct(() => w('div', { class: 'title' }, 'Current Version', -1)),
  Cg = ct(() => w('div', { class: 'title' }, 'Latest Version', -1)),
  Eg = ct(() => w('div', { class: 'title' }, 'Created', -1)),
  wg = ct(() => w('div', { class: 'title' }, 'Updated', -1)),
  Og = { class: 'px-3 mt-4' },
  Sg = ct(() => w('div', { class: 'title' }, 'Change version', -1)),
  Ig = { key: 1, class: 'px-3 mt-4' },
  $g = ct(() => w('h2', { class: 'title mb-2' }, 'Exports', -1)),
  xg = { class: 'truncate' },
  Ag = De({
    __name: 'DetailsViewContent',
    setup(e) {
      const t = vt(),
        n = ee(() => t.getters.getPackageByName(t.state.selectedPackage)),
        r = ee(() => {
          var I;
          return (I = n.value) == null ? void 0 : I.name;
        }),
        s = ee(() => {
          var I;
          return (I = n.value) == null ? void 0 : I.version;
        }),
        i = I => {
          t.commit('setSelectedPackage', null), t.commit('navigate', I);
        },
        o = ee(() => !!r.value),
        l = ee(() => !!r.value && !!s.value),
        { data: a, isLoading: c } = Ko(
          ['exports', r, s],
          () =>
            Me.getExportSizes(
              n == null ? void 0 : n.value.name,
              n == null ? void 0 : n.value.version
            ),
          { enabled: l, retry: !1 }
        ),
        { data: u, isLoading: d } = Ko(
          ['details', r],
          () => Me.getPackageDetails(n.value.name),
          { enabled: o, retry: !1 }
        ),
        h = ee(() => {
          var I;
          return Object.entries(
            ((I = u.value) == null ? void 0 : I.versions) || {}
          )
            .sort((W, F) => {
              const q = Ct(W[0]),
                k = Ct(F[0]);
              return !q || !k ? W[0].localeCompare(F[0]) : k.compare(q);
            })
            .map(W => W[0]);
        }),
        v = ee(() => {
          var I;
          return (
            Ai(h.value, n == null ? void 0 : n.value.version) ||
            ((I = Ct(n == null ? void 0 : n.value.version)) == null
              ? void 0
              : I.raw) ||
            '0.0.0'
          );
        }),
        g = I => {
          I &&
            En(r.value, async () => {
              await Me.changeVersion({
                name: r.value,
                version: I,
                originalVersion: s.value,
              }),
                t.commit('changeVersion', { item: n.value, version: I });
            });
        };
      return (I, W) => {
        var F, q, k;
        return n.value
          ? (U(),
            Z('div', og, [
              J(t).state.view === J(Se).Details
                ? (U(),
                  Z('div', ag, [
                    w(
                      'a',
                      {
                        class: 'flex items-center h-8 w-8',
                        onClick: W[0] || (W[0] = oe => i(J(Se).Manage)),
                        role: 'button',
                        'aria-label': 'Go back',
                      },
                      [_e(x0)]
                    ),
                    lg,
                  ]))
                : le('', !0),
              w('div', cg, [
                w('div', ug, [fg, w('div', null, Ee(n.value.name), 1)]),
                !J(d) && J(u)
                  ? (U(),
                    Z(
                      Le,
                      { key: 0 },
                      [
                        (F = J(u).repository) != null && F.url
                          ? (U(),
                            Z('div', dg, [
                              hg,
                              w(
                                'a',
                                { href: J(u).repository.url },
                                Ee(J(u).repository.url),
                                9,
                                pg
                              ),
                            ]))
                          : le('', !0),
                        J(u).homepage
                          ? (U(),
                            Z('div', vg, [
                              gg,
                              w(
                                'a',
                                { href: J(u).homepage },
                                Ee(J(u).homepage),
                                9,
                                mg
                              ),
                            ]))
                          : le('', !0),
                        w('div', null, [
                          yg,
                          w('div', null, Ee(J(u).license), 1),
                        ]),
                        w('div', null, [
                          _g,
                          w('div', null, Ee(J(u).humanDownloadsLast30Days), 1),
                        ]),
                        w('div', null, [
                          bg,
                          w('div', null, Ee(n.value.version), 1),
                        ]),
                        w('div', null, [
                          Cg,
                          w('div', null, Ee(J(u).version), 1),
                        ]),
                        w('div', null, [
                          Eg,
                          w(
                            'div',
                            null,
                            Ee(new Date(J(u).created).toLocaleDateString()),
                            1
                          ),
                        ]),
                        w('div', null, [
                          wg,
                          w(
                            'div',
                            null,
                            Ee(new Date(J(u).modified).toLocaleDateString()),
                            1
                          ),
                        ]),
                      ],
                      64
                    ))
                  : le('', !0),
              ]),
              w('div', Og, [
                Sg,
                _e(
                  Ei,
                  {
                    class: 'mt-1',
                    'model-value': v.value,
                    options: h.value,
                    placeholder: 'Select version',
                    'onUpdate:modelValue': g,
                  },
                  null,
                  8,
                  ['model-value', 'options']
                ),
              ]),
              !J(c) &&
              (k = (q = J(a)) == null ? void 0 : q.assets) != null &&
              k.length
                ? (U(),
                  Z('div', Ig, [
                    $g,
                    (U(!0),
                    Z(
                      Le,
                      null,
                      Cn(
                        J(a).assets,
                        oe => (
                          U(),
                          Z(
                            'div',
                            {
                              key: oe.name,
                              class:
                                'grid grid-cols-[1fr_auto] text-[13px] leading-[20px]',
                            },
                            [
                              w('div', xg, Ee(oe.name), 1),
                              w('div', null, Ee(J(Hn)(oe.size)), 1),
                            ]
                          )
                        )
                      ),
                      128
                    )),
                  ]))
                : le('', !0),
            ]))
          : le('', !0);
      };
    },
  }),
  Pg = Ae(Ag, [['__scopeId', 'data-v-ddf2b3f2']]),
  Lg = { key: 0, class: 'grid gap-y-2 px-3' },
  Rg = { class: 'flex space-x-2' },
  Tg = { class: 'content' },
  Mg = De({
    __name: 'App',
    setup(e) {
      Me.setVSCode($t('vscode'));
      const t = vt(),
        { getPackageSizeInfo: n } = kv(),
        r = ye(''),
        s = ye([]),
        i = ee(() => t.state.view),
        o = ee(() => t.state.filterQuery),
        l = ee(() => t.state.installedPackages),
        { results: a } = fl(o, l, {
          matchAllWhenSearchEmpty: !0,
          fuseOptions: { fieldNormWeight: 1, keys: ['name'] },
        }),
        c = ee(() => a.value.map(({ item: K }) => K)),
        u = ee(() => t.state.sizeInfo),
        d = ye({}),
        h = ye({}),
        v = ee(() => {
          let K = [];
          if (i.value === Se.Manage) (K = c.value), o.value || K.sort(W);
          else {
            K = c.value.filter(Q => !Q.isDevDependency);
            const A = t.state.analyzeSort,
              Y = t.state.analyzeOrder;
            K.sort((Q, B) => {
              var z, P;
              const G = (z = u.value[Q.name]) == null ? void 0 : z[A],
                ue = (P = u.value[B.name]) == null ? void 0 : P[A];
              return G === ue
                ? 0
                : Y === jt.Ascending
                  ? G > ue
                    ? 1
                    : -1
                  : G > ue
                    ? -1
                    : 1;
            });
          }
          return K;
        }),
        g = ee(() =>
          c.value
            .map(
              K => `${K.isDevDependency ? 'dev:' : ''}${K.name}@${K.version}`
            )
            .join('')
        ),
        I = K => {
          En(
            K.map(A => A.name),
            async () => {
              await Me.updatePackages({ packages: K });
            }
          );
        },
        W = (K, A) =>
          K.isDevDependency != A.isDevDependency
            ? K.isDevDependency
              ? 1
              : -1
            : K.name.localeCompare(A.name),
        F = async () => {
          t.commit('setInstalledPackages', await Me.getInstalledPackages());
        },
        q = async () => ((s.value = await Me.getPackageJSONFiles()), s.value),
        k = async () => {
          t.commit('setSizeInfo', {});
          for (const K of v.value)
            K.isDevDependency ||
              !yh(K.version) ||
              n(K.name, K.version).then(A => {
                t.commit('addSizeInfo', A);
              });
        };
      wn(async () => {
        t.dispatch('getConfig');
        const [K] = await q();
        r.value = K;
      }),
        Ne(g, k, { immediate: !0 }),
        Ne(r, K => {
          K && (Me.setPackageJSON(r.value), F());
        }),
        Ne(c, async K => {
          var A;
          for (const Y of K) {
            if (d.value[Y.name]) continue;
            const Q = (A = Ct(Y.version)) == null ? void 0 : A.raw;
            Q && (d.value[Y.name] = [Q]),
              Me.getPackageVersionsAndTags(Y.name).then(B => {
                (d.value[Y.name] = B.versions.filter(
                  G =>
                    !t.state.config.excludeVersions.some(ue => G.includes(ue))
                )),
                  (h.value[Y.name] = B.tags);
              });
          }
        }),
        window.addEventListener('message', async K => {
          var A, Y;
          ((A = K.data) == null ? void 0 : A.type) === 'PACKAGE_JSON_UPDATED' &&
            (q(), F()),
            ((Y = K.data) == null ? void 0 : Y.type) === 'CONFIG_UPDATED' &&
              t.dispatch('getConfig');
        });
      const oe = ee(() => mh(s.value));
      return (K, A) => (
        U(),
        Z(
          Le,
          null,
          [
            s.value.length === 0 ? (U(), Pe(K1, { key: 0 })) : le('', !0),
            s.value.length !== 0
              ? (U(),
                Z(
                  'div',
                  {
                    key: 1,
                    class:
                      'relative grid grid-rows-[auto_1fr_auto] items-start h-screen',
                    onContextmenu: A[1] || (A[1] = je(() => {}, ['prevent'])),
                  },
                  [
                    w('div', null, [
                      _e(F1),
                      [J(Se).Manage, J(Se).Analyze].includes(i.value)
                        ? (U(),
                          Z('div', Lg, [
                            oe.value.length > 1
                              ? (U(),
                                Pe(
                                  Ei,
                                  {
                                    key: 0,
                                    modelValue: r.value,
                                    'onUpdate:modelValue':
                                      A[0] || (A[0] = Y => (r.value = Y)),
                                    options: oe.value,
                                    'format-placeholder': Y =>
                                      typeof Y == 'string'
                                        ? Y
                                        : (Y == null
                                            ? void 0
                                            : Y.value.replace(
                                                '/package.json',
                                                ''
                                              )) || '',
                                  },
                                  null,
                                  8,
                                  [
                                    'modelValue',
                                    'options',
                                    'format-placeholder',
                                  ]
                                ))
                              : le('', !0),
                            i.value === J(Se).Analyze
                              ? (U(), Pe(ep, { key: 1 }))
                              : le('', !0),
                            w('div', Rg, [
                              i.value === J(Se).Manage
                                ? (U(), Pe(Fv, { key: 0 }))
                                : le('', !0),
                              i.value === J(Se).Manage
                                ? (U(), Pe(E0, { key: 1 }))
                                : le('', !0),
                            ]),
                          ]))
                        : le('', !0),
                    ]),
                    w('div', Tg, [
                      _e(
                        p0,
                        {
                          'installed-packages': c.value,
                          'displayed-packages': v.value,
                          'installed-packages-tags': h.value,
                          'installed-packages-versions': d.value,
                          'size-info': u.value,
                        },
                        null,
                        8,
                        [
                          'installed-packages',
                          'displayed-packages',
                          'installed-packages-tags',
                          'installed-packages-versions',
                          'size-info',
                        ]
                      ),
                      _e(Pg),
                      i.value === J(Se).Analyze
                        ? (U(),
                          Pe(q1, { key: 0, 'size-info': u.value }, null, 8, [
                            'size-info',
                          ]))
                        : le('', !0),
                    ]),
                    w('div', null, [
                      _e(
                        L1,
                        {
                          onUpdateAll: I,
                          'installed-packages': c.value,
                          'installed-packages-tags': h.value,
                          'installed-packages-versions': d.value,
                        },
                        null,
                        8,
                        [
                          'installed-packages',
                          'installed-packages-tags',
                          'installed-packages-versions',
                        ]
                      ),
                    ]),
                  ],
                  32
                ))
              : le('', !0),
          ],
          64
        )
      );
    },
  }),
  Ng = Ae(Mg, [['__scopeId', 'data-v-6f004a93']]);
var ze = [];
for (var Es = 0; Es < 256; ++Es) ze.push((Es + 256).toString(16).slice(1));
function Fg(e, t = 0) {
  return (
    ze[e[t + 0]] +
    ze[e[t + 1]] +
    ze[e[t + 2]] +
    ze[e[t + 3]] +
    '-' +
    ze[e[t + 4]] +
    ze[e[t + 5]] +
    '-' +
    ze[e[t + 6]] +
    ze[e[t + 7]] +
    '-' +
    ze[e[t + 8]] +
    ze[e[t + 9]] +
    '-' +
    ze[e[t + 10]] +
    ze[e[t + 11]] +
    ze[e[t + 12]] +
    ze[e[t + 13]] +
    ze[e[t + 14]] +
    ze[e[t + 15]]
  ).toLowerCase();
}
var hr,
  kg = new Uint8Array(16);
function Dg() {
  if (
    !hr &&
    ((hr =
      typeof crypto < 'u' &&
      crypto.getRandomValues &&
      crypto.getRandomValues.bind(crypto)),
    !hr)
  )
    throw new Error(
      'crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported'
    );
  return hr(kg);
}
var jg =
  typeof crypto < 'u' && crypto.randomUUID && crypto.randomUUID.bind(crypto);
const Bo = { randomUUID: jg };
function Ug(e, t, n) {
  if (Bo.randomUUID && !t && !e) return Bo.randomUUID();
  e = e || {};
  var r = e.random || (e.rng || Dg)();
  return (r[6] = (r[6] & 15) | 64), (r[8] = (r[8] & 63) | 128), Fg(r);
}
const Vg = () => {
    const e = acquireVsCodeApi();
    function t(n) {
      return new Promise((r, s) => {
        const i = Ug(),
          o = a => {
            a.data.uri === n.uri &&
              a.data.method === n.method &&
              a.data.requestId === i &&
              (a.data.status >= 300 ? s(a.data.payload) : r(a.data.payload),
              window.removeEventListener('message', o, !1));
          };
        window.addEventListener('message', o);
        const l = JSON.parse(JSON.stringify(n));
        e.postMessage({ ...l, requestId: i });
      });
    }
    return (
      (t.get = (n, r) => t({ method: 'GET', uri: n, payload: r })),
      (t.post = (n, r) => t({ method: 'POST', uri: n, payload: r })),
      (t.put = (n, r) => t({ method: 'PUT', uri: n, payload: r })),
      (t.patch = (n, r) => t({ method: 'PATCH', uri: n, payload: r })),
      (t.delete = (n, r) => t({ method: 'delete', uri: n, payload: r })),
      { ...e, fetch: t }
    );
  },
  rs = Ef(Ng);
rs.use(Ln, Ol);
rs.use(sg);
rs.provide('vscode', Vg());
rs.mount('body');
