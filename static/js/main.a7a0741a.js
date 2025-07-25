(() => {
  "use strict";
  var e = {
      9783: (e, t, a) => {
        a.r(t);
        var r = a(4636),
          n = a(1137),
          o = a(3923),
          i = a(5991),
          l = a(9649),
          s = a(733);
        const d = async (e) => {
            try {
              await s.default.setItem("user", JSON.stringify(e));
            } catch (t) {
              console.error("Error guardando el usuario:", t);
            }
          },
          c = async (e, t) => {
            try {
              await s.default.setItem(e, t);
            } catch (a) {
              console.error("Error guardando en storage:", a);
            }
          },
          u = async (e) => {
            try {
              return await s.default.getItem(e);
            } catch (t) {
              return console.error("Error obteniendo de storage:", t), null;
            }
          },
          f = async (e) => {
            try {
              await s.default.setItem("aulas", JSON.stringify(e));
            } catch (t) {
              console.log("error al guardar materias", t);
            }
          },
          m = async () => {
            try {
              const e = await s.default.getItem("aulas");
              return null != e ? JSON.parse(e) : null;
            } catch (e) {
              return console.log("no hay aulas", e), null;
            }
          },
          h = async (e) => {
            try {
              await s.default.setItem("asistencias", JSON.stringify(e));
            } catch (t) {
              console.error("Error al guardar asistencias:", t);
            }
          },
          g = async () => {
            try {
              const e = await s.default.getItem("asistencias");
              return e ? JSON.parse(e) : null;
            } catch (e) {
              return console.error("Error al leer asistencias:", e), null;
            }
          },
          x = async (e, t) => {
            try {
              await s.default.setItem(`clases_${e}`, JSON.stringify(t));
            } catch (a) {
              console.error("Error guardando clases:", a);
            }
          },
          p = async (e) => {
            try {
              const t = await s.default.getItem(`clases_${e}`);
              return t ? JSON.parse(t) : null;
            } catch (t) {
              return console.error("Error leyendo clases:", t), null;
            }
          },
          j = async (e) => {
            try {
              const t = JSON.stringify(e);
              await c("transaccion_profe", t);
            } catch (t) {
              console.error("Error al guardar alarcoin en storage:", t);
            }
          },
          y = async (e) => {
            try {
              const t = JSON.stringify(e);
              await c("transaccion_alumno", t);
            } catch (t) {
              console.error("Error al guardar alarcoin del alumno:", t);
            }
          },
          b = async (e) => {
            try {
              await s.default.setItem("tareas", JSON.stringify(e));
            } catch (t) {
              console.error("Error al guardar tareas:", t);
            }
          };
        var w = a(8853);
        const C = (0, l.createContext)({
            user: null,
            setUser: () => {},
            token: null,
            setToken: () => {},
            logout: () => {},
            loading: !0,
          }),
          v = ({ children: e }) => {
            const [t, a] = (0, l.useState)(null),
              [r, n] = (0, l.useState)(!0),
              [o, i] = (0, l.useState)(null);
            (0, l.useEffect)(() => {
              (async () => {
                const e = await (async () => {
                    try {
                      const e = await s.default.getItem("user");
                      return null !== e ? JSON.parse(e) : null;
                    } catch (e) {
                      return (
                        console.error("Error obteniendo el usuario:", e), null
                      );
                    }
                  })(),
                  t = await u("token");
                e && a(e), t && i(t), n(!1);
              })();
            }, []);
            return (0, w.jsx)(C.Provider, {
              value: {
                user: t,
                setUser: async (e) => {
                  a(e),
                    e
                      ? await d(e)
                      : await (async (e) => {
                          try {
                            await s.default.removeItem(e);
                          } catch (t) {
                            console.error("Error eliminando de storage:", t);
                          }
                        })("user");
                },
                loading: r,
                token: o,
                setToken: i,
                logout: async () => {
                  try {
                    await s.default.clear();
                  } catch (e) {
                    console.log("error al borrar items", e);
                  }
                  a(null), i(null);
                },
              },
              children: e,
            });
          },
          S = () => (0, l.useContext)(C);
        var T = a(4147),
          E = a(3198),
          k = a(143),
          P = a(8363),
          D = a(5220),
          B = a(5830),
          I = a(9978),
          z = a(3997),
          _ = a(4642);
        const A = ({ children: e }) => {
            const { colors: t } = (0, _.useTheme)();
            return (0, w.jsx)(z.LinearGradient, {
              colors: [t.primary, t.background],
              start: { x: 0.6, y: 1 },
              end: { x: 0.5, y: 0 },
              style: M.gradient,
              children: (0, w.jsx)(B.default, {
                style: M.safeArea,
                children: (0, w.jsx)(D.default, {
                  style: M.flex,
                  behavior: "height",
                  keyboardVerticalOffset: I.default.currentHeight || 0,
                  children: (0, w.jsx)(P.default, {
                    contentContainerStyle: M.scrollContainer,
                    keyboardShouldPersistTaps: "handled",
                    children: (0, w.jsx)(E.default, {
                      style: M.innerContainer,
                      children: e,
                    }),
                  }),
                }),
              }),
            });
          },
          M = T.default.create({
            gradient: { flex: 1 },
            safeArea: { flex: 1, paddingTop: 0 },
            flex: { flex: 1 },
            scrollContainer: { flexGrow: 1 },
            innerContainer: { flex: 1, padding: 16 },
          }),
          R = "https://adminaulas.onrender.com",
          W = async (e, t = {}) => {
            let a = await u("token");
            const r = t.headers || {},
              n = new Headers(r);
            n.set("Authorization", `Bearer ${a}`);
            let o = await fetch(e, Object.assign({}, t, { headers: n }));
            if (401 === o.status) {
              const a = await u("refresh_token");
              if (!a) throw new Error("No hay refresh token");
              const n = await fetch(`${R}/users/refresh`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ refresh_token: a }),
              });
              if (!n.ok) throw new Error("No se pudo refrescar el token");
              const i = await n.json();
              c("access_token", i.access_token);
              const l = new Headers(r);
              l.set("Authorization", `Bearer ${i.access_token}`),
                (o = await fetch(e, Object.assign({}, t, { headers: l })));
            }
            return o;
          };
        async function O() {
          const e = await W(`${R}/epetcoins/historial`, {});
          if (!e.ok) {
            const t = await e.json();
            throw new Error(t.detail || "Error al obtener historial");
          }
          return await e.json();
        }
        async function L() {
          const e = await W(`${R}/epetcoins/historial`, {});
          if (!e.ok) {
            const t = await e.json();
            throw new Error(t.detail || "Error al obtener historial");
          }
          return await e.json();
        }
        function $(e) {
          const t = e.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
          if (!t) return null;
          const [, a, r, n] = t,
            o = parseInt(a, 10),
            i = parseInt(r, 10);
          return o < 1 || o > 31 || i < 1 || i > 12 ? null : `${n}-${r}-${a}`;
        }
        function N(e) {
          if (!e || "string" !== typeof e) return null;
          const t = e.match(/^(\d{4})-(\d{2})-(\d{2})$/);
          if (!t) return null;
          const [, a, r, n] = t,
            o = parseInt(n, 10),
            i = parseInt(r, 10);
          return o < 1 || o > 31 || i < 1 || i > 12 ? null : `${n}/${r}/${a}`;
        }
        const V = async (e, t) => {
            const a = await W(`${R}/notas/asignar-masiva`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ tarea_id: e, alumnos: t }),
            });
            if (!a.ok) throw new Error("Error al asignar tarea a alumnos");
            return await a.json();
          },
          F = async (e) => {
            try {
              const t = await W(`${R}/notas/tarea/${e}`, { method: "GET" });
              return await t.json();
            } catch (t) {
              console.log("Error al obtener notas");
            }
          };
        const H = (0, l.createContext)(void 0),
          G = ({ children: e }) => {
            const { token: t, user: a } = S(),
              [r, n] = (0, l.useState)([]),
              [o, i] = (0, l.useState)({}),
              [d, c] = (0, l.useState)(!0),
              [h, g] = (0, l.useState)(null),
              [x, p] = (0, l.useState)(!1),
              [C, v] = (0, l.useState)(!1),
              [T, E] = (0, l.useState)([]),
              [k, P] = (0, l.useState)(!1),
              [D, B] = (0, l.useState)(!1),
              [I, z] = (0, l.useState)([]),
              [_, A] = (0, l.useState)(!1),
              [M, $] = (0, l.useState)(!1),
              V = async (e) => {
                ((e) => {
                  const t = Object.assign({}, o);
                  Object.keys(t).forEach((e) => {
                    t[+e] = Object.assign({}, t[+e], { epetcoin: 0 });
                  }),
                    e.forEach((e) => {
                      e.alumnos.forEach((e) => {
                        const a = ((e) =>
                          e.reduce(
                            (e, t) => e + (t.suma ? t.cantidad : -t.cantidad),
                            0
                          ))(e?.epetcoins);
                        t[e.id] &&
                          (t[e.id].epetcoin = (t[e.id].epetcoin || 0) + a);
                      });
                    }),
                    i(t);
                })(e),
                  g(e),
                  await j(e);
              },
              F = async (e) => {
                g(e), await y(e);
              },
              G = async () => {
                try {
                  const e = await (async () => {
                    try {
                      const e = await s.default.getItem("epetCoin");
                      return e ? JSON.parse(e) : null;
                    } catch (e) {
                      return console.error("Error leyendo epetCoin:", e), null;
                    }
                  })();
                  if (e) return v(e), !0;
                  const t = await (async function () {
                    try {
                      await u("token");
                      const e = await W(`${R}/epetcoins/me`, {});
                      return await e.json();
                    } catch (e) {
                      return void console.error("Error al consultar /me", e);
                    }
                  })();
                  if (t?.coin) return !1;
                  await (async (e) => {
                    try {
                      await s.default.setItem("epetCoin", JSON.stringify(e));
                    } catch (t) {
                      console.error("Error guardando epetCoin:", t);
                    }
                  })(t),
                    v(t);
                } catch (e) {
                  return 404 === e?.response?.status
                    ? (v(!1), !1)
                    : (console.error("Error verificando epetcoin:", e), !1);
                }
              },
              J = async () => {
                try {
                  const e = await m();
                  if (e) return n(e), void c(!1);
                  const t = (
                    await (async function () {
                      const e = await W(`${R}/aulas/mis-aulas`, {
                        method: "GET",
                      });
                      if (!e.ok) {
                        const t = await e.json();
                        throw new Error(
                          t.detail || "Error al iniciar sesi\xf3n"
                        );
                      }
                      return await e.json();
                    })()
                  ).map((e) =>
                    Object.assign({}, e, { alumnos: [a], alumnoIds: [a.id] })
                  );
                  n(t), await f(t);
                } catch (e) {}
              },
              q = async () => {
                try {
                  const e = await m(),
                    t = await (async () => {
                      try {
                        const e = await s.default.getItem("alumnos");
                        if (!e) return null;
                        const t = JSON.parse(e),
                          a = {};
                        return (
                          t.forEach((e) => {
                            a[e.id] = e;
                          }),
                          a
                        );
                      } catch (e) {
                        return (
                          console.error(
                            "Error al leer alumnos desde storage:",
                            e
                          ),
                          null
                        );
                      }
                    })();
                  if (e && t) return n(e), i(t), void c(!1);
                  const a = await (async function () {
                      const e = await W(`${R}/aulas/mis-aulas-con-alumnos`, {
                        method: "GET",
                      });
                      if (!e.ok) {
                        const t = await e.json();
                        throw new Error(
                          t.detail || "Error al iniciar sesi\xf3n"
                        );
                      }
                      return await e.json();
                    })(),
                    r = {},
                    o = a.map(
                      (e) => (
                        e.alumnos.forEach((e) => {
                          r[e.id] = e;
                        }),
                        {
                          id: e.id,
                          nombre: e.nombre,
                          ano: e.ano,
                          division: e.division,
                          especialidad: e.especialidad,
                          profesor_id: e.profesor_id,
                          cantidad_clases: e.cantidad_clases,
                          tipo: e.tipo,
                          alumnoIds: e.alumnos.map((e) => e.id),
                        }
                      )
                    );
                  n(o),
                    i(r),
                    await f(o),
                    await (async (e) => {
                      try {
                        const t = JSON.stringify(e);
                        await s.default.setItem("alumnos", t);
                      } catch (t) {
                        console.error("Error al guardar alumnos:", t);
                      }
                    })(Object.values(r));
                } catch (e) {
                  console.error("Error cargando datos desde appData:", e);
                } finally {
                  c(!1);
                }
              },
              Y = async (e) => {
                (e || t) && (a?.is_teacher ? await q() : await J());
              };
            return (
              (0, l.useEffect)(() => {
                Y();
              }, [t]),
              (0, w.jsx)(H.Provider, {
                value: {
                  aulas: r,
                  alumnosMap: o,
                  isLoading: d,
                  loadData: Y,
                  transaccioncoins: h,
                  loadAlarcoins: async (e = !1) => {
                    p(!1);
                    try {
                      if (a?.is_teacher) {
                        if (!(await G())) return !1;
                        if (e) {
                          const e = await O();
                          V(e), await j(e);
                        } else {
                          const e = await (async () => {
                            try {
                              const e = await u("transaccion_profe");
                              return e ? JSON.parse(e) : null;
                            } catch (e) {
                              return (
                                console.error(
                                  "Error al leer alarcoins profe:",
                                  e
                                ),
                                null
                              );
                            }
                          })();
                          if (e) V(e);
                          else {
                            const e = await O();
                            V(e), await j(e);
                          }
                        }
                      } else if (e) {
                        const e = await L();
                        F(e), await y(e);
                      } else {
                        const e = await (async () => {
                          try {
                            const e = await u("transaccion_alumno");
                            return e ? JSON.parse(e) : null;
                          } catch (e) {
                            return (
                              console.error(
                                "Error al leer alarcoin del alumno:",
                                e
                              ),
                              null
                            );
                          }
                        })();
                        if (e) F(e);
                        else {
                          const e = await L();
                          F(e), await y(e);
                        }
                      }
                    } catch (t) {
                      console.error("Error cargando alarcoins:", t), p(!0);
                    } finally {
                      c(!1);
                    }
                  },
                  alarcoinsError: x,
                  epetCoin: C,
                  tareas: T,
                  loadTareas: async (e = !1) => {
                    try {
                      if ((B(!0), !e)) {
                        const e = await (async () => {
                          try {
                            const e = await s.default.getItem("tareas");
                            return e ? JSON.parse(e) : null;
                          } catch (e) {
                            return (
                              console.error("Error al leer tareas:", e), null
                            );
                          }
                        })();
                        if (e) return E(e), void B(!1);
                      }
                      const t = await (async function () {
                        const e = await W(`${R}/tareas/me`, {});
                        if (!e.ok) {
                          const t = await e.json();
                          throw new Error(
                            t.detail || "Error al obtener tareas del usuario"
                          );
                        }
                        return (await e.json()).map((e) =>
                          Object.assign({}, e, {
                            fecha_limite: e.fecha_limite
                              ? N(e.fecha_limite)
                              : null,
                          })
                        );
                      })();
                      E(t), await b(t), P(!1);
                    } catch (t) {
                      P(!0), console.error("Error cargando tareas:", t);
                    } finally {
                      B(!1);
                    }
                  },
                  tareasError: k,
                  tareasLoading: D,
                  notas: I,
                  loadNotas: async (e = !1) => {
                    try {
                      if (($(!0), !e)) {
                        const e = await (async () => {
                          try {
                            const e = await s.default.getItem("notasAlumno");
                            return e ? JSON.parse(e) : null;
                          } catch (e) {
                            return (
                              console.error("Error al leer notas:", e), null
                            );
                          }
                        })();
                        if (e) return z(e), void $(!1);
                      }
                      const t = await (async () => {
                        try {
                          const e = await W(`${R}/notas/me`, { method: "GET" });
                          return await e.json();
                        } catch (e) {
                          console.log("Error al obtener notas");
                        }
                      })();
                      z(t),
                        await (async (e) => {
                          try {
                            await s.default.setItem(
                              "notasAlumno",
                              JSON.stringify(e)
                            );
                          } catch (t) {
                            console.error("Error al guardar notas:", t);
                          }
                        })(t);
                    } catch (t) {
                      console.error("Error cargando notas:", t);
                    } finally {
                      $(!1);
                    }
                  },
                  notasLoading: M,
                  notasError: _,
                },
                children: e,
              })
            );
          },
          J = () => {
            const e = (0, l.useContext)(H);
            if (!e)
              throw new Error(
                "useAppData debe usarse dentro de AppDataProvider"
              );
            return e;
          },
          q = () => {
            const e = new Date(),
              t = e.getHours();
            let a;
            a =
              t >= 6 && t < 12
                ? "Buenos d\xedas"
                : t >= 12 && t < 19
                ? "Buenas tardes"
                : "Buenas noches";
            return {
              saludo: a,
              fecha: e.toLocaleDateString("es-ES", {
                day: "numeric",
                month: "long",
                year: "numeric",
              }),
            };
          };
        var Y = a(8082),
          U = a(4250),
          K = a(6437),
          Z = a(397);
        function Q({
          isLoading: e,
          hasError: t,
          reLoad: r,
          children: n,
          errorMessage: o = "Ocurri\xf3 un error al cargar los datos",
        }) {
          return e
            ? (0, w.jsx)(E.default, {
                style: {
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                },
                children: (0, w.jsx)(K.default, {
                  size: "large",
                  color: "violet",
                }),
              })
            : t
            ? (0, w.jsxs)(E.default, {
                style: {
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                },
                children: [
                  (0, w.jsx)(Y.default, {
                    variant: "titleLarge",
                    style: {
                      marginBottom: 12,
                      color: "#9333EA",
                      textAlign: "center",
                    },
                    children: o,
                  }),
                  (0, w.jsx)(U.default, {
                    source: a(2058),
                    style: {
                      width: 200,
                      height: 200,
                      marginBottom: 20,
                      borderRadius: 100,
                    },
                    resizeMode: "contain",
                  }),
                  (0, w.jsx)(Z.default, {
                    mode: "contained",
                    onPress: r,
                    children: "Reintentar",
                  }),
                ],
              })
            : (0, w.jsx)(w.Fragment, { children: n });
        }
        const X = () =>
          (0, w.jsx)(Q, {
            children: (0, w.jsx)(Y.default, { children: "Profesores" }),
          });
        var ee = a(2929),
          te = a(8105),
          ae = a(8810);
        const re = "#b14aca";
        function ne({ title: e, value: t, icon: a, bgColor: r = "#F5F5F5" }) {
          return (0, w.jsx)(te.default, {
            style: [oe.card],
            children: (0, w.jsx)(te.default.Content, {
              children: (0, w.jsxs)(E.default, {
                style: oe.cardContent,
                children: [
                  (0, w.jsxs)(E.default, {
                    children: [
                      (0, w.jsx)(Y.default, {
                        style: oe.cardTitle,
                        children: e,
                      }),
                      (0, w.jsx)(Y.default, {
                        style: oe.cardValue,
                        children: t,
                      }),
                    ],
                  }),
                  (0, w.jsx)(ae.default, { name: a, size: 32, color: re }),
                ],
              }),
            }),
          });
        }
        const oe = T.default.create({
          card: {
            flex: 1,
            borderRadius: 16,
            marginBottom: 16,
            paddingVertical: 4,
            paddingHorizontal: 2,
            minWidth: 150,
            maxWidth: 160,
          },
          cardContent: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          },
          cardTitle: { fontSize: 14, color: "#666" },
          cardValue: { fontSize: 22, fontWeight: "bold", marginTop: 4 },
        });
        async function ie() {
          const e = await W(`${R}/asistencias/mis-asistencias`, {
            method: "GET",
          });
          if (!e.ok) {
            const t = await e.json();
            throw new Error(t.detail || "Error al obtener asistencias");
          }
          return await e.json();
        }
        const le = () => {
            const { user: e, token: t } = S(),
              {
                loadAlarcoins: a,
                loadNotas: r,
                loadTareas: n,
                tareas: o,
                notas: i,
                epetCoin: s,
                transaccioncoins: d,
                aulas: c,
              } = J(),
              { saludo: u, fecha: f } = q(),
              { width: m } = (0, k.default)(),
              [x, p] = (0, l.useState)(!1),
              [j, y] = (0, l.useState)(!1),
              [b, C] = (0, l.useState)([]),
              [v, T] = (0, l.useState)(),
              [P, D] = (0, l.useState)(),
              B = async (e = !1) => {
                p(!0);
                try {
                  if ((a(e), r(e), n(e), !e)) {
                    const e = await g();
                    if (e) return C(e), void D(I(e));
                  }
                  await (async () => {
                    try {
                      const e = await ie();
                      C(e), await h(e), D(I(e));
                    } catch (j) {
                      console.error("Error recargando asistencias", j);
                    }
                  })();
                } catch (j) {
                  y(!0), console.log("error al cargar datos", j);
                } finally {
                  p(!1);
                }
              },
              I = (e) => {
                const t = e.filter((e) => e.porcentaje_asistencia >= 10);
                if (0 === t.length) return 0;
                const a =
                  t.reduce((e, t) => e + t.porcentaje_asistencia, 0) / t.length;
                return Math.round(100 * a) / 100;
              },
              z = d?.reduce((e, t) => e + t.epetcoins.length, 0),
              _ = c.reduce((e, t) => e + (t.cantidad_clases || 0), 0);
            return (
              (0, l.useEffect)(() => {
                B();
              }, []),
              (0, l.useEffect)(() => {
                if (!i || 0 === i.length) return;
                const e = ((e) => {
                  const t = Object.values(e).flat(),
                    a = t.reduce((e, t) => e + t.nota, 0),
                    r = t.length;
                  if (0 === r) return 0;
                  const n = a / r;
                  return Number.parseFloat(n.toFixed(2));
                })(i);
                T(e);
              }, [i]),
              (0, w.jsxs)(Q, {
                hasError: j,
                isLoading: x,
                reLoad: B,
                children: [
                  (0, w.jsxs)(E.default, {
                    style: [se.header],
                    children: [
                      (0, w.jsxs)(E.default, {
                        children: [
                          (0, w.jsx)(Y.default, {
                            variant: "titleMedium",
                            children: `${u}, ${e?.nombre}`,
                          }),
                          (0, w.jsx)(Y.default, {
                            variant: "labelMedium",
                            children: "alumno",
                          }),
                        ],
                      }),
                      (0, w.jsx)(ee.default, {
                        icon: ({ size: e, color: t }) =>
                          (0, w.jsx)(ae.default, {
                            name: "refresh",
                            size: e,
                            color: t,
                          }),
                        mode: "contained",
                        onPress: () => B(!0),
                        style: { padding: 0, margin: 0 },
                      }),
                    ],
                  }),
                  (0, w.jsxs)(E.default, {
                    style: se.resumenContainer,
                    children: [
                      (0, w.jsx)(ne, {
                        title: "Epetcoins",
                        icon: "logo-bitcoin",
                        value: z,
                      }),
                      (0, w.jsx)(ne, {
                        title: "Clases",
                        icon: "school-outline",
                        value: _,
                      }),
                      (0, w.jsx)(ne, {
                        title: "Asistencias",
                        icon: "bookmark-outline",
                        value: P,
                      }),
                      (0, w.jsx)(ne, {
                        title: "Notas",
                        icon: "clipboard-outline",
                        value: v,
                      }),
                    ],
                  }),
                ],
              })
            );
          },
          se = T.default.create({
            header: {
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: 16,
              gap: 10,
            },
            headerSmall: {
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 4,
            },
            resumenContainer: {
              flex: 1,
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-around",
              gap: 15,
              marginBottom: 10,
            },
            alumnosListContainer: { marginTop: 16 },
          }),
          de = () => {
            const { width: e } = (0, k.default)(),
              { user: t, loading: a } = S(),
              { aulas: r, alumnosMap: n, isLoading: o } = J(),
              { saludo: i, fecha: l } =
                (r.reduce((e, t) => e + (t.cantidad_clases || 0), 0), q());
            return (0, w.jsx)(A, {
              children: (0, w.jsx)(E.default, {
                style: ce.container,
                children: t?.is_teacher
                  ? (0, w.jsx)(X, {})
                  : (0, w.jsx)(le, {}),
              }),
            });
          },
          ce = T.default.create({
            container: {
              flex: 1,
              maxWidth: 1e3,
              alignSelf: "center",
              width: "100%",
              paddingHorizontal: 16,
            },
            header: {
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: 16,
              gap: 10,
            },
            headerSmall: {
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 4,
            },
            cardsContainer: {
              flexWrap: "wrap",
              alignContent: "center",
              justifyContent: "space-between",
              gap: 16,
              marginBottom: 24,
            },
            alumnosListContainer: { marginTop: 16 },
          });
        var ue = a(552),
          fe = a(500),
          me = a(7799),
          he = a(8488),
          ge = a(1561);
        const xe = ge
          .object()
          .shape({
            email: ge.string().email("Email inv\xe1lido").required("Requerido"),
            password: ge
              .string()
              .min(6, "M\xednimo 6 caracteres")
              .required("Requerido"),
          });
        function pe() {
          (0, n.useNavigation)();
          const { loading: e, setUser: t, setToken: a } = S(),
            { loadData: r } = J(),
            { colors: o } = (0, _.useTheme)(),
            i = async (e, n, o, i) => {
              try {
                const n = await (async function (e) {
                  const t = await fetch(`${R}/users/login`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(e),
                  });
                  if (!t.ok) {
                    const e = await t.json();
                    throw new Error(e.detail || "Error al iniciar sesi\xf3n");
                  }
                  return await t.json();
                })(e);
                i(),
                  t(n.user),
                  a(n.access_token),
                  await d(n.user),
                  await c("token", n.access_token),
                  await c("refresh_token", n.refresh_token),
                  r(n.access_token);
              } catch (l) {
                o("Credenciales inv\xe1lidas");
              } finally {
                n(!1);
              }
            };
          return (0, w.jsx)(A, {
            children: e
              ? (0, w.jsx)(ue.default, { children: "Cargando ..." })
              : (0, w.jsx)(E.default, {
                  style: je.container,
                  children: (0, w.jsxs)(E.default, {
                    style: je.card,
                    children: [
                      (0, w.jsx)(ue.default, {
                        style: je.title,
                        children: "Iniciar sesi\xf3n",
                      }),
                      (0, w.jsx)(he.Formik, {
                        initialValues: { email: "", password: "" },
                        validationSchema: xe,
                        onSubmit: (
                          e,
                          { setSubmitting: t, setErrors: a, resetForm: r }
                        ) => i(e, t, (e) => a({ password: e }), r),
                        children: ({
                          handleChange: e,
                          handleBlur: t,
                          handleSubmit: a,
                          values: r,
                          errors: n,
                          touched: i,
                          isSubmitting: l,
                        }) =>
                          (0, w.jsxs)(w.Fragment, {
                            children: [
                              (0, w.jsx)(fe.default, {
                                style: je.input,
                                placeholder: "Email",
                                onChangeText: e("email"),
                                onBlur: t("email"),
                                value: r.email,
                                keyboardType: "email-address",
                                autoCapitalize: "none",
                              }),
                              i.email &&
                                n.email &&
                                (0, w.jsx)(ue.default, {
                                  style: je.error,
                                  children: n.email,
                                }),
                              (0, w.jsx)(fe.default, {
                                style: je.input,
                                placeholder: "Contrase\xf1a",
                                onChangeText: e("password"),
                                onBlur: t("password"),
                                value: r.password,
                                secureTextEntry: !0,
                              }),
                              i.password &&
                                n.password &&
                                (0, w.jsx)(ue.default, {
                                  style: je.error,
                                  children: n.password,
                                }),
                              (0, w.jsx)(Z.default, {
                                onPress: () => a(),
                                style: {
                                  backgroundColor: o.backdrop,
                                  paddingVertical: 8,
                                  marginTop: 15,
                                },
                                children: l
                                  ? (0, w.jsx)(me.default, { color: "#fff" })
                                  : (0, w.jsx)(ue.default, {
                                      style: je.buttonText,
                                      children: "Ingresar",
                                    }),
                              }),
                            ],
                          }),
                      }),
                    ],
                  }),
                }),
          });
        }
        const je = T.default.create({
          container: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          },
          card: {
            width: "85%",
            padding: 24,
            borderRadius: 12,
            backgroundColor: "#fefefe80",
            elevation: 6,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 5,
            maxWidth: 400,
          },
          title: {
            fontSize: 22,
            fontWeight: "bold",
            marginBottom: 16,
            textAlign: "center",
          },
          input: {
            height: 48,
            borderColor: "#ccc",
            borderWidth: 1,
            borderRadius: 8,
            paddingHorizontal: 12,
            marginTop: 12,
            backgroundColor: "#fff",
          },
          error: { color: "red", fontSize: 12, marginTop: 4, marginLeft: 4 },
          buttonText: { color: "#fff", fontWeight: "600", fontSize: 16 },
        });
        var ye = a(8587),
          be = a(9343),
          we = a(9454),
          Ce = a(4423);
        async function ve(e) {
          const t = await W(`${R}/users/me`, {
            method: "PUT",
            body: JSON.stringify(e),
          });
          if (!t.ok) {
            const e = await t.json();
            throw new Error(e.detail || "Error al actualizar el usuario");
          }
          return await t.json();
        }
        const Se = ["newPassword", "confirmPassword"],
          Te = ge
            .object()
            .shape({
              nombre: ge.string().required("El nombre es obligatorio"),
              apellido: ge.string().required("El apellido es obligatorio"),
              email: ge
                .string()
                .email("Email inv\xe1lido")
                .required("Email requerido"),
              newPassword: ge.string().min(6, "M\xednimo 6 caracteres"),
              confirmPassword: ge
                .string()
                .oneOf(
                  [ge.ref("newPassword"), ""],
                  "Las contrase\xf1as no coinciden"
                ),
            }),
          Ee = T.default.create({
            container: {
              flexGrow: 1,
              padding: 15,
              alignItems: "center",
              minHeight: "100%",
            },
            header: {
              fontWeight: "bold",
              fontSize: 28,
              marginTop: 16,
              marginBottom: 4,
              alignSelf: "flex-start",
              letterSpacing: 0.5,
            },
            subheader: {
              marginBottom: 16,
              alignSelf: "flex-start",
              fontSize: 16,
              opacity: 0.85,
            },
            avatarContainer: {
              alignItems: "center",
              marginVertical: 16,
              width: "100%",
            },
            cardheader: {
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingRight: 8,
              paddingTop: 8,
            },
            cardTitle: { fontSize: 20, fontWeight: "bold" },
            cardSubtitle: { fontSize: 14 },
            editButton: {
              marginTop: 16,
              borderRadius: 20,
              minWidth: 120,
              elevation: 0,
              alignSelf: "center",
            },
            card: {
              width: "100%",
              maxWidth: 500,
              alignSelf: "center",
              marginTop: 16,
              paddingHorizontal: 0,
              borderRadius: 16,
              elevation: 2,
            },
            form: { gap: 8, marginTop: 8, width: "100%" },
            input: { marginBottom: 4 },
            error: { fontSize: 12, marginBottom: 4, marginLeft: 4 },
            buttonGroup: {
              marginTop: 16,
              flexDirection: "row",
              justifyContent: "flex-end",
              gap: 8,
            },
            saveButton: { marginLeft: 8, borderRadius: 20, minWidth: 100 },
            cancelButton: {
              borderColor: "#ccc",
              borderRadius: 20,
              minWidth: 100,
            },
            logoutButton: {
              marginTop: 32,
              width: "100%",
              maxWidth: 500,
              alignSelf: "center",
              borderRadius: 20,
              borderWidth: 1,
              borderColor: "#e53935",
              color: "#e53935",
            },
          }),
          ke = () => {
            const { user: e } = S(),
              [t, a] = (0, l.useState)(!1),
              [r, n] = (0, l.useState)(e?.nombre),
              [o, i] = (0, l.useState)(e?.apellido),
              [s, d] = (0, l.useState)(e?.email),
              { colors: c } = (0, _.useTheme)(),
              { width: u } = (0, k.default)(),
              [f, m] = (0, l.useState)(""),
              [h, g] = (0, l.useState)(""),
              { setUser: x } = S(),
              p = () => a(!0),
              j = () => {
                a(!1), m(""), g("");
              };
            return (0, w.jsx)(A, {
              children: (0, w.jsxs)(P.default, {
                contentContainerStyle: [Ee.container, ,],
                children: [
                  (0, w.jsx)(Y.default, {
                    variant: "titleLarge",
                    style: [Ee.header, { color: c.primary }],
                    children: "Perfil",
                  }),
                  (0, w.jsx)(Y.default, {
                    variant: "bodyMedium",
                    style: [Ee.subheader, { color: c.onSurfaceVariant }],
                    children: "Administra tu informaci\xf3n personal",
                  }),
                  (0, w.jsxs)(te.default, {
                    style: [Ee.card, { backgroundColor: c.surface }],
                    children: [
                      (0, w.jsx)(E.default, {
                        style: Ee.cardheader,
                        children: (0, w.jsx)(te.default.Title, {
                          title: "Informaci\xf3n Personal",
                          subtitle: "Actualiza tu informaci\xf3n de cuenta",
                          titleStyle: [Ee.cardTitle, { color: c.primary }],
                          subtitleStyle: [
                            Ee.cardSubtitle,
                            { color: c.onSurfaceVariant },
                          ],
                        }),
                      }),
                      (0, w.jsx)(we.default, {
                        style: {
                          marginBottom: 8,
                          backgroundColor: c.outlineVariant,
                        },
                      }),
                      (0, w.jsx)(te.default.Content, {
                        children: (0, w.jsx)(he.Formik, {
                          initialValues: {
                            nombre: r || "",
                            apellido: o || "",
                            email: s || "",
                            newPassword: "",
                            confirmPassword: "",
                          },
                          validationSchema: Te,
                          onSubmit: (e) => {
                            (async (e) => {
                              const { newPassword: t, confirmPassword: r } = e,
                                n = (0, ye.default)(e, Se);
                              if (t && t !== r)
                                be.default.alert(
                                  "Error",
                                  "Las contrase\xf1as no coinciden."
                                );
                              else
                                try {
                                  const e = await ve(
                                    Object.assign({}, n, {
                                      password: t || void 0,
                                    })
                                  );
                                  x(e), a(!1);
                                } catch (o) {
                                  be.default.alert("Error", o.message);
                                }
                            })(e);
                          },
                          enableReinitialize: !0,
                          children: ({
                            handleChange: e,
                            handleBlur: a,
                            handleSubmit: l,
                            values: x,
                            errors: y,
                            touched: b,
                          }) =>
                            (0, w.jsxs)(E.default, {
                              style: Ee.form,
                              children: [
                                (0, w.jsx)(Ce.default, {
                                  label: "Nombre",
                                  value: r,
                                  onChangeText: n,
                                  editable: t,
                                  mode: "flat",
                                  style: [
                                    Ee.input,
                                    {
                                      backgroundColor: t
                                        ? c.background
                                        : c.surfaceDisabled,
                                    },
                                  ],
                                  error: !!y.nombre && b.nombre,
                                  onBlur: a("name"),
                                  left: (0, w.jsx)(Ce.default.Icon, {
                                    icon: ({ color: e, size: t }) =>
                                      (0, w.jsx)(ae.default, {
                                        name: "person-outline",
                                        color: e,
                                        size: t,
                                      }),
                                  }),
                                }),
                                t &&
                                  y.nombre &&
                                  b.nombre &&
                                  (0, w.jsx)(Y.default, {
                                    style: [Ee.error, { color: c.error }],
                                    children: y.nombre,
                                  }),
                                (0, w.jsx)(Ce.default, {
                                  label: "Apellido",
                                  value: o,
                                  onChangeText: i,
                                  editable: t,
                                  mode: "flat",
                                  style: [
                                    Ee.input,
                                    {
                                      backgroundColor: t
                                        ? c.background
                                        : c.surfaceDisabled,
                                    },
                                  ],
                                  error: !!y.apellido && b.apellido,
                                  onBlur: a("apellido"),
                                  left: (0, w.jsx)(Ce.default.Icon, {
                                    icon: ({ color: e, size: t }) =>
                                      (0, w.jsx)(ae.default, {
                                        name: "person-outline",
                                        color: e,
                                        size: t,
                                      }),
                                  }),
                                }),
                                t &&
                                  y.apellido &&
                                  b.apellido &&
                                  (0, w.jsx)(Y.default, {
                                    style: [Ee.error, { color: c.error }],
                                    children: y.apellido,
                                  }),
                                (0, w.jsx)(Ce.default, {
                                  label: "Email",
                                  value: s,
                                  editable: t,
                                  onChangeText: d,
                                  mode: "flat",
                                  style: [
                                    Ee.input,
                                    { backgroundColor: c.surfaceDisabled },
                                  ],
                                  error: !!y.email && b.email,
                                  onBlur: a("email"),
                                  left: (0, w.jsx)(Ce.default.Icon, {
                                    icon: ({ color: e, size: t }) =>
                                      (0, w.jsx)(ae.default, {
                                        name: "mail-outline",
                                        color: e,
                                        size: t,
                                      }),
                                  }),
                                }),
                                t &&
                                  y.email &&
                                  b.email &&
                                  (0, w.jsx)(Y.default, {
                                    style: [Ee.error, { color: c.error }],
                                    children: y.email,
                                  }),
                                t &&
                                  (0, w.jsxs)(w.Fragment, {
                                    children: [
                                      (0, w.jsx)(Ce.default, {
                                        label: "Nueva clave",
                                        secureTextEntry: !0,
                                        value: f,
                                        onChangeText: m,
                                        placeholder: "********",
                                        mode: "flat",
                                        autoComplete: "off",
                                        textContentType: "none",
                                        importantForAutofill: "no",
                                        style: [
                                          Ee.input,
                                          { backgroundColor: c.background },
                                        ],
                                        error: !!y.newPassword && b.newPassword,
                                        onBlur: a("newPassword"),
                                        left: (0, w.jsx)(Ce.default.Icon, {
                                          icon: ({ color: e, size: t }) =>
                                            (0, w.jsx)(ae.default, {
                                              name: "lock-closed-outline",
                                              color: e,
                                              size: t,
                                            }),
                                        }),
                                      }),
                                      y.newPassword &&
                                        b.newPassword &&
                                        (0, w.jsx)(Y.default, {
                                          style: [Ee.error, { color: c.error }],
                                          children: y.newPassword,
                                        }),
                                      (0, w.jsx)(Ce.default, {
                                        label: "Repetir clave",
                                        secureTextEntry: !0,
                                        value: h,
                                        onChangeText: g,
                                        placeholder: "********",
                                        mode: "flat",
                                        style: [Ee.input, ,],
                                        left: (0, w.jsx)(Ce.default.Icon, {
                                          icon: ({ color: e, size: t }) =>
                                            (0, w.jsx)(ae.default, {
                                              name: "lock-closed-outline",
                                              color: e,
                                              size: t,
                                            }),
                                        }),
                                      }),
                                      (0, w.jsxs)(E.default, {
                                        style: Ee.buttonGroup,
                                        children: [
                                          (0, w.jsx)(Z.default, {
                                            mode: "outlined",
                                            style: [
                                              Ee.cancelButton,
                                              { borderColor: c.outline },
                                              u < 400 && { flex: 1 },
                                            ],
                                            onPress: j,
                                            labelStyle: { color: c.primary },
                                            children: "Cancelar",
                                          }),
                                          (0, w.jsx)(Z.default, {
                                            mode: "contained",
                                            style: [
                                              Ee.saveButton,
                                              { backgroundColor: c.primary },
                                              u < 400 && { flex: 1 },
                                            ],
                                            onPress: l,
                                            labelStyle: { color: c.onPrimary },
                                            children: "Guardar",
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                !t &&
                                  (0, w.jsx)(Z.default, {
                                    style: [
                                      Ee.editButton,
                                      { backgroundColor: c.primary },
                                      u < 400 && {
                                        width: "100%",
                                        alignSelf: "center",
                                      },
                                    ],
                                    mode: "contained",
                                    icon: ({ color: e, size: t }) =>
                                      (0, w.jsx)(ae.default, {
                                        name: "pencil",
                                        color: e,
                                        size: t,
                                      }),
                                    onPress: p,
                                    labelStyle: {
                                      color: c.onPrimary,
                                      fontSize: 16,
                                    },
                                    contentStyle: { paddingVertical: 8 },
                                    children: "Editar",
                                  }),
                              ],
                            }),
                        }),
                      }),
                    ],
                  }),
                ],
              }),
            });
          };
        var Pe = a(3124),
          De = a(193),
          Be = a(2773),
          Ie = a(2149),
          ze = a(3231);
        const _e = (e, t) =>
            `${e?.trim()?.[0]?.toUpperCase() ?? ""}${
              t?.trim()?.[0]?.toUpperCase() ?? ""
            }`,
          Ae = T.default.create({
            profile: {
              alignItems: "center",
              marginBottom: 16,
              maxWidth: 350,
              margin: 10,
              width: "100%",
            },
            avatar: { backgroundColor: "#c001f5" },
            name: { marginTop: 8, fontWeight: "bold" },
            role: { fontSize: 14, color: "#6b7280" },
          }),
          Me = ({
            alarcoins: e,
            isalarcoins: t = !1,
            user: a,
            loading: r,
            desdeProfe: o,
          }) => {
            const { colors: i } = (0, n.useTheme)();
            return (0, w.jsxs)(E.default, {
              style: [
                Ae.profile,
                t && {
                  backgroundColor: i.background,
                  borderRadius: 12,
                  padding: 16,
                  elevation: 2,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.2,
                  shadowRadius: 1.41,
                },
              ],
              children: [
                (0, w.jsx)(ze.default, {
                  label: _e(a?.nombre, a?.apellido),
                  size: 64,
                  style: Ae.avatar,
                }),
                (0, w.jsx)(Y.default, {
                  variant: "titleLarge",
                  style: Ae.name,
                  children: r ? "Cargando" : `${a?.nombre} ${a?.apellido}`,
                }),
                !t &&
                  (0, w.jsx)(Y.default, {
                    variant: "bodySmall",
                    style: Ae.role,
                    children: r
                      ? "cargando"
                      : a?.is_teacher
                      ? "Profesor"
                      : "Alumno",
                  }),
                t &&
                  (0, w.jsxs)(E.default, {
                    children: [
                      (0, w.jsx)(Y.default, {
                        variant: "bodyMedium",
                        children: o ? "epetCoins" : "Tus epetCoins",
                      }),
                      (0, w.jsx)(Y.default, {
                        variant: "bodyMedium",
                        style: { textAlign: "center" },
                        children: e,
                      }),
                    ],
                  }),
              ],
            });
          };
        var Re = a(6573),
          We = a(4821),
          Oe = a(995);
        const Le = Object.assign({}, We.MD3LightTheme, {
            colors: Object.assign({}, We.MD3LightTheme.colors, {
              primary: "#d83dff",
              background: "#d1a3ff",
              surface: "#d1a3ff",
              text: "#2b2b2b",
              secondary: "#4ab19f",
              accent: "#f2c94c",
              asistenciaBuena: "#10b981",
              asistenciaMedia: "#ffb93f",
              asistenciaMala: "#ef4444",
            }),
          }),
          $e = Object.assign({}, Oe.MD3DarkTheme, {
            colors: Object.assign({}, Oe.MD3DarkTheme.colors, {
              primary: "#b14aca",
              background: "#302f2f",
              surface: "#1e1e1e",
              text: "#ffffff",
              secondary: "#4ab19f",
              accent: "#f2c94c",
              asistenciaBuena: "#097551",
              asistenciaMedia: "#f59e0b",
              asistenciaMala: "#e21313",
            }),
          });
        var Ne = a(2162);
        const Ve = (0, l.createContext)({
            isDarkMode: !1,
            toggleTheme: () => {},
            theme: Le,
          }),
          Fe = ({ children: e }) => {
            const t = (0, Ne.default)(),
              [a, r] = (0, l.useState)(!0),
              [n, o] = (0, l.useState)("dark" === t);
            (0, l.useEffect)(() => {
              (async () => {
                const e = await u("theme");
                "light" === e || "dark" === e
                  ? (r(!1), o("dark" === e))
                  : (r(!0), o("dark" === t));
              })();
            }, []),
              (0, l.useEffect)(() => {
                a && t && o("dark" === t);
              }, [t, a]),
              (0, l.useEffect)(() => {
                const e = Re.default.addChangeListener(({ colorScheme: e }) => {
                  o("dark" === e);
                });
                return () => e.remove();
              }, []);
            const i = n ? $e : Le;
            return (0, w.jsx)(Ve.Provider, {
              value: {
                isDarkMode: n,
                toggleTheme: async () => {
                  const e = !n;
                  o(e), r(!1), await c("theme", e ? "dark" : "light");
                },
                theme: i,
              },
              children: e,
            });
          },
          He = () => (0, l.useContext)(Ve);
        function Ge(e) {
          const { isDarkMode: t, toggleTheme: a } = He(),
            { user: r, loading: n, logout: o } = S(),
            { epetCoin: l } = J(),
            s = [
              { icon: "home-outline", label: "Dashboard", screen: "Home" },
              { icon: "person-outline", label: "Perfil", screen: "Perfil" },
              {
                icon: "book-outline",
                label: "Asistencias y Clases",
                screen: "MateriasStack",
              },
              { icon: "clipboard-outline", label: "Tareas", screen: "Tareas" },
              {
                icon: "logo-bitcoin",
                label: r?.is_teacher
                  ? l?.nombre
                    ? l?.nombre
                    : "epetCoins"
                  : "Mis epetCoins",
                screen: "Alarcoin",
              },
              ...(r?.is_teacher
                ? [
                    {
                      icon: "people-outline",
                      label: "Alumnos",
                      screen: "Alumnos",
                    },
                  ]
                : []),
            ];
          return (0, w.jsx)(
            i.DrawerContentScrollView,
            Object.assign({}, e, {
              contentContainerStyle: { flex: 1 },
              children: (0, w.jsxs)(E.default, {
                style: Je.container,
                children: [
                  (0, w.jsx)(Me, { user: r, loading: n, isalarcoins: !1 }),
                  (0, w.jsx)(P.default, {
                    children: (0, w.jsx)(De.default, {
                      style: Je.nav,
                      children: s.map((t, a) =>
                        (0, w.jsx)(
                          i.DrawerItem,
                          {
                            icon: ({ color: e, size: a }) =>
                              (0, w.jsx)(ae.default, {
                                name: t.icon,
                                color: e,
                                size: a,
                              }),
                            label: t.label,
                            onPress: () => e.navigation.navigate(t.screen),
                          },
                          a
                        )
                      ),
                    }),
                  }),
                  (0, w.jsxs)(De.default, {
                    style: Je.bottom,
                    children: [
                      (0, w.jsxs)(E.default, {
                        style: [Je.switchRow, Je.themeItem],
                        children: [
                          (0, w.jsx)(i.DrawerItem, {
                            icon: ({ color: e, size: a }) =>
                              (0, w.jsx)(ae.default, {
                                name: t ? "moon" : "sunny",
                                color: e,
                                size: a,
                              }),
                            label: t ? "Modo oscuro" : "Modo claro",
                            onPress: a,
                            style: { flex: 1 },
                          }),
                          (0, w.jsx)(Be.default, {
                            value: t,
                            onValueChange: a,
                          }),
                        ],
                      }),
                      (0, w.jsx)(i.DrawerItem, {
                        icon: ({ color: e, size: t }) =>
                          (0, w.jsx)(Ie.default, {
                            name: "log-out",
                            color: e,
                            size: t,
                          }),
                        label: "Cerrar sesi\xf3n",
                        onPress: () => {
                          o();
                        },
                      }),
                    ],
                  }),
                ],
              }),
            })
          );
        }
        const Je = T.default.create({
          container: { flex: 1, paddingTop: 14 },
          nav: { marginTop: 10 },
          bottom: { padding: 3 },
          switchRow: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 8,
          },
          themeItem: { paddingRight: 8 },
        });
        var qe = a(5731),
          Ye = a(2511),
          Ue = a(2061),
          Ke = a(5933),
          Ze = a(6375),
          Qe = a(3479),
          Xe = a(5315);
        const et = ({ historial: e, onSeleccionar: t, error: a }) => {
            const [r, n] = (0, l.useState)(!1),
              [o, i] = (0, l.useState)({ label: "Elegir materia", id: null }),
              { colors: s } = (0, _.useTheme)(),
              d = () => n(!1),
              c = (e, a) => {
                i({ label: e, id: a }), d(), t(a);
              };
            return (
              (0, l.useEffect)(() => {
                i({ label: "Elegir materia", id: null });
              }, [e]),
              (0, w.jsxs)(E.default, {
                children: [
                  (0, w.jsxs)(Qe.default, {
                    visible: r,
                    onDismiss: d,
                    anchor: (0, w.jsx)(Z.default, {
                      mode: a ? "contained-tonal" : "outlined",
                      onPress: () => n(!0),
                      contentStyle: tt.buttonContent,
                      style: [tt.button, a && { borderColor: s.error }],
                      children: (0, w.jsxs)(E.default, {
                        style: tt.labelWithIcon,
                        children: [
                          (0, w.jsx)(ae.default, {
                            name: "book-outline",
                            size: 18,
                            color: a ? s.error : s.onSurface,
                            style: tt.iconLeft,
                          }),
                          (0, w.jsxs)(E.default, {
                            style: tt.labelTextWrapper,
                            children: [
                              (0, w.jsx)(ae.default, {
                                name: r ? "chevron-up" : "chevron-down",
                                size: 18,
                                color: a ? s.error : s.onSurface,
                                style: tt.iconRight,
                              }),
                              (0, w.jsx)(ue.default, {
                                style: [tt.innerLabel, { color: s.onSurface }],
                                children: o.label,
                              }),
                            ],
                          }),
                        ],
                      }),
                    }),
                    children: [
                      (0, w.jsx)(
                        Qe.default.Item,
                        {
                          onPress: () => c("Elegir materia", null),
                          title: "Elegir materia",
                          leadingIcon: () =>
                            (0, w.jsx)(ae.default, {
                              name: "refresh-outline",
                              size: 18,
                              color: s.primary,
                            }),
                        },
                        "default-item"
                      ),
                      (0, w.jsx)(we.default, {}),
                      e.map((e) =>
                        (0, w.jsx)(
                          Qe.default.Item,
                          {
                            onPress: () => c(e.nombre, e.aula_id),
                            title: e.nombre,
                            leadingIcon: () =>
                              (0, w.jsx)(ae.default, {
                                name: "school-outline",
                                size: 18,
                                color: s.primary,
                              }),
                          },
                          e.aula_id
                        )
                      ),
                    ],
                  }),
                  a &&
                    (0, w.jsx)(Xe.default, {
                      type: "error",
                      visible: a,
                      children: "Debes seleccionar una materia.",
                    }),
                ],
              })
            );
          },
          tt = T.default.create({
            buttonContent: {
              flexDirection: "row",
              justifyContent: "space-between",
            },
            button: { borderWidth: 1 },
            labelWithIcon: { flexDirection: "row", alignItems: "center" },
            labelTextWrapper: {
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
            },
            iconLeft: { marginRight: 8 },
            iconRight: { marginRight: 4 },
            innerLabel: { paddingHorizontal: 0 },
          }),
          at = ({
            visible: e,
            onDismiss: t,
            user: a,
            is_teacher: r,
            selectedAula: n,
          }) => {
            if (!a) return null;
            const { colors: o } = (0, _.useTheme)(),
              [i, s] = (0, l.useState)(r ? "asignar" : "historial"),
              [d, c] = (0, l.useState)("0"),
              [u, f] = (0, l.useState)(""),
              [m, h] = (0, l.useState)("1"),
              [g, x] = (0, l.useState)(null),
              [p, j] = (0, l.useState)(!1),
              [y, b] = (0, l.useState)(""),
              { transaccioncoins: C, loadAlarcoins: v, epetCoin: S } = J(),
              [T, k] = (0, l.useState)(!1),
              D = (0, l.useMemo)(
                () =>
                  a
                    ? r
                      ? (C ?? [])
                          .map((e) => {
                            if ("alumnos" in e && Array.isArray(e.alumnos)) {
                              const t = e.alumnos.find((e) => e.id === a.id);
                              if (t)
                                return {
                                  aula_id: e.aula_id,
                                  nombre: e.nombre,
                                  epetcoins: t.epetcoins || [],
                                };
                            }
                            return null;
                          })
                          .filter((e) => null !== e)
                      : n
                      ? [
                          {
                            aula_id: n.id,
                            nombre: n.nombre,
                            epetcoins: n.epetcoins,
                          },
                        ]
                      : []
                    : [],
                [C, a, r, n]
              );
            return (0, w.jsxs)(qe.default, {
              children: [
                (0, w.jsx)(Ye.default, {
                  visible: p && "" !== y,
                  duration: 1e3,
                  onDismiss: () => {
                    j(!1), b("");
                  },
                  action: { label: "Dale", onPress: () => j(!1) },
                  children: y,
                }),
                (0, w.jsxs)(Ue.default, {
                  visible: e,
                  onDismiss: t,
                  contentContainerStyle: {
                    backgroundColor: o.surface,
                    padding: 10,
                    margin: 10,
                    borderRadius: 12,
                    width: "90%",
                    maxWidth: 500,
                    justifyContent: "flex-start",
                    alignSelf: "center",
                  },
                  children: [
                    (0, w.jsx)(E.default, {
                      style: {
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        flexWrap: "nowrap",
                        overflow: "hidden",
                        marginBottom: 8,
                      },
                      children: (0, w.jsx)(Ke.default, {
                        value: i,
                        onValueChange: s,
                        buttons: [
                          { value: "historial", label: "Historial" },
                          ...(r
                            ? [{ value: "asignar", label: "Asignar" }]
                            : []),
                        ],
                        style: {
                          flex: 1,
                          minWidth: 0,
                          maxWidth: "100%",
                          borderRadius: 12,
                          overflow: "hidden",
                        },
                      }),
                    }),
                    "asignar" === i &&
                      r &&
                      (0, w.jsxs)(te.default, {
                        mode: "contained",
                        style: { marginTop: 10, padding: 5 },
                        children: [
                          (0, w.jsx)(Y.default, {
                            variant: "titleMedium",
                            style: { marginBottom: 5 },
                            children: `Gestionar Alarcoins de: ${a.nombre} ${a.apellido}`,
                          }),
                          (0, w.jsx)(et, { historial: D, onSeleccionar: x }),
                          (0, w.jsx)(we.default, {
                            style: { marginVertical: 16 },
                          }),
                          (0, w.jsx)(Y.default, {
                            variant: "labelLarge",
                            style: { marginBottom: 4 },
                            children: "Cantidad",
                          }),
                          (0, w.jsxs)(E.default, {
                            style: {
                              flexDirection: "row",
                              alignItems: "center",
                              gap: 8,
                            },
                            children: [
                              (0, w.jsx)(Z.default, {
                                mode: "outlined",
                                onPress: () =>
                                  c((e) => String(Math.max(0, Number(e) - 1))),
                                children: "-",
                              }),
                              (0, w.jsx)(Ce.default, {
                                value: d,
                                onChangeText: c,
                                keyboardType: "numeric",
                                mode: "outlined",
                                style: { flex: 1 },
                              }),
                              (0, w.jsx)(Z.default, {
                                mode: "outlined",
                                onPress: () => c((e) => String(Number(e) + 1)),
                                children: "+",
                              }),
                            ],
                          }),
                          (0, w.jsx)(Ce.default, {
                            label: "Concepto",
                            mode: "outlined",
                            value: u,
                            onChangeText: f,
                            style: { marginTop: 16 },
                          }),
                          (0, w.jsx)(Y.default, {
                            variant: "labelLarge",
                            style: { marginTop: 16 },
                            children: "Tipo de operaci\xf3n",
                          }),
                          (0, w.jsx)(Ze.default.Group, {
                            onValueChange: (e) => h(e),
                            value: m,
                            children: (0, w.jsxs)(E.default, {
                              style: {
                                flexDirection: "row",
                                justifyContent: "flex-end",
                              },
                              children: [
                                (0, w.jsx)(Ze.default.Item, {
                                  label: "Sumar",
                                  value: "1",
                                }),
                                (0, w.jsx)(Ze.default.Item, {
                                  label: "Restar",
                                  value: "0",
                                }),
                              ],
                            }),
                          }),
                          (0, w.jsx)(we.default, {
                            style: { marginVertical: 16 },
                          }),
                          (0, w.jsx)(E.default, {
                            style: {
                              flexDirection: "row",
                              justifyContent: "flex-end",
                            },
                            children: (0, w.jsx)(Z.default, {
                              mode: "contained",
                              onPress: async () => {
                                if (!g || 0 === g)
                                  return (
                                    b(
                                      "Debes seleccionar una materia v\xe1lida."
                                    ),
                                    void j(!0)
                                  );
                                if (!u.trim())
                                  return void be.default.alert(
                                    "Atenci\xf3n",
                                    "Debes ingresar un concepto."
                                  );
                                k(!0);
                                const e = {
                                  aula_id: g,
                                  alumno_id: a.id,
                                  detalle: u,
                                  suma: Number(m),
                                  cantidad: Number(d),
                                  moneda_id: S?.id,
                                };
                                try {
                                  await (async function (e) {
                                    const t = await W(
                                      `${R}/epetcoins/transaccion`,
                                      {
                                        method: "POST",
                                        body: JSON.stringify(e),
                                      }
                                    );
                                    if (!t.ok) {
                                      const e = await t.json();
                                      throw new Error(
                                        e.detail || "Error al asignar alarcoin"
                                      );
                                    }
                                    return await t.json();
                                  })(e),
                                    c("0"),
                                    f(""),
                                    h("1"),
                                    x(null),
                                    t(),
                                    v(!0),
                                    b("Transacci\xf3n guardado correctamente."),
                                    j(!0);
                                } catch (r) {
                                  b("error al guardar"), j(!0);
                                } finally {
                                  k(!1);
                                }
                              },
                              children: T ? "Guardando..." : "Guardar",
                            }),
                          }),
                        ],
                      }),
                    "historial" === i &&
                      (0, w.jsxs)(E.default, {
                        style: { marginTop: 12 },
                        children: [
                          (0, w.jsx)(Y.default, {
                            variant: "titleMedium",
                            style: { marginBottom: 8 },
                            children: "Historial de Epetcoins",
                          }),
                          D.every((e) => 0 === (e.epetcoins ?? []).length)
                            ? (0, w.jsx)(Y.default, {
                                style: { marginTop: 8 },
                                children: "No hay historial a\xfan",
                              })
                            : (0, w.jsx)(P.default, {
                                children: D.filter(
                                  (e) => (e.epetcoins ?? []).length > 0
                                ).map((e) => {
                                  const t = e.epetcoins.reduce(
                                    (e, t) =>
                                      e + (t.suma ? t.cantidad : -t.cantidad),
                                    0
                                  );
                                  return (0, w.jsxs)(
                                    te.default,
                                    {
                                      style: { marginBottom: 16 },
                                      children: [
                                        (0, w.jsx)(te.default.Title, {
                                          title: (0, w.jsxs)(
                                            E.default,
                                            {
                                              style: {
                                                flexDirection: "row",
                                                alignItems: "center",
                                              },
                                              children: [
                                                (0, w.jsx)(Y.default, {
                                                  children: e.nombre,
                                                }),
                                                (0, w.jsx)(Y.default, {
                                                  style: {
                                                    marginLeft: 8,
                                                    fontWeight: "bold",
                                                    color:
                                                      t >= 0 ? "green" : "red",
                                                  },
                                                  children: `(${t})`,
                                                }),
                                              ],
                                            },
                                            e.aula_id
                                          ),
                                        }),
                                        (0, w.jsx)(te.default.Content, {
                                          children: e.epetcoins.map((e) =>
                                            (0, w.jsxs)(
                                              E.default,
                                              {
                                                children: [
                                                  (0, w.jsxs)(
                                                    E.default,
                                                    {
                                                      style: {
                                                        flexDirection: "row",
                                                        justifyContent:
                                                          "space-between",
                                                        marginVertical: 4,
                                                      },
                                                      children: [
                                                        (0, w.jsx)(Y.default, {
                                                          children: new Date(
                                                            e.fecha
                                                          ).toLocaleDateString(),
                                                        }),
                                                        (0, w.jsx)(Y.default, {
                                                          children: e.detalle,
                                                        }),
                                                        (0, w.jsx)(Y.default, {
                                                          style: {
                                                            color: e.suma
                                                              ? "green"
                                                              : "red",
                                                          },
                                                          children: e.suma
                                                            ? `+${e.cantidad}`
                                                            : `-${e.cantidad}`,
                                                        }),
                                                      ],
                                                    },
                                                    e.id
                                                  ),
                                                  (0, w.jsx)(we.default, {}),
                                                ],
                                              },
                                              e.id
                                            )
                                          ),
                                        }),
                                      ],
                                    },
                                    e.aula_id
                                  );
                                }),
                              }),
                        ],
                      }),
                  ],
                }),
              ],
            });
          };
        function rt({
          materia: e,
          onPress: t,
          porcentaje: a = 0,
          is_alumno: r,
          alarcoin: n,
          coin: o,
        }) {
          const { colors: i } = (0, _.useTheme)();
          return (0, w.jsx)(te.default, {
            style: [nt.card],
            mode: "outlined",
            onPress: t ? () => t(e) : void 0,
            children: (0, w.jsx)(z.LinearGradient, {
              colors:
                r && !n
                  ? ((e) =>
                      0 === e
                        ? ["transparent", "transparent"]
                        : e < 60
                        ? [i.background, i.asistenciaMala]
                        : e < 79
                        ? [i.background, i.asistenciaMedia]
                        : [i.background, i.asistenciaBuena])(a)
                  : ["#trnasparent", "transparent"],
              start: { x: 0.4, y: 0.3 },
              end: { x: 1, y: 1 },
              style: { borderRadius: 8, padding: 10 },
              children: (0, w.jsxs)(te.default.Content, {
                style: nt.cardContent,
                children: [
                  (0, w.jsxs)(E.default, {
                    style: nt.infoLeft,
                    children: [
                      (0, w.jsx)(Y.default, {
                        variant: "titleMedium",
                        children: e.nombre,
                      }),
                      (0, w.jsx)(E.default, {
                        style: nt.scheduleRow,
                        children: (0, w.jsx)(Y.default, {
                          variant: "bodySmall",
                          children: `${e.ano}\xb0 ${e.division}\xb0 - ${e.especialidad}`,
                        }),
                      }),
                    ],
                  }),
                  (0, w.jsxs)(E.default, {
                    style: nt.infoRight,
                    children: [
                      (0, w.jsx)(Y.default, {
                        variant: "labelSmall",
                        children:
                          r && null == n
                            ? "Asistencias"
                            : null != n
                            ? o
                            : " Clases dictadas",
                      }),
                      (0, w.jsx)(Y.default, {
                        variant: "titleMedium",
                        style: nt.classCount,
                        children:
                          r && null == n
                            ? `${a}%`
                            : null != n
                            ? n
                            : e.cantidad_clases,
                      }),
                    ],
                  }),
                ],
              }),
            }),
          });
        }
        const nt = T.default.create({
          card: {
            marginBottom: 16,
            width: "100%",
            marginHorizontal: 10,
            maxWidth: 450,
            borderRadius: 8,
            elevation: 3,
            alignSelf: "center",
          },
          cardContent: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
          },
          infoLeft: { flex: 1, gap: 4 },
          scheduleRow: {
            flexDirection: "row",
            alignItems: "center",
            marginTop: 4,
            gap: 6,
          },
          infoRight: { alignItems: "flex-end" },
          classCount: { marginTop: 2, fontWeight: "600" },
        });
        var ot = a(5539);
        function it({
          items: e,
          renderItem: t,
          getKey: a,
          numColumns: r,
          refreshing: n,
          onRefresh: o,
          ListEmptyComponent: i,
          ListFooterComponent: l,
          alumno: s,
        }) {
          const { width: d } = (0, k.default)(),
            c = !0 === s ? 1 : r || (d >= 900 ? 2 : 1);
          return (0, w.jsx)(
            ot.default,
            {
              data: e,
              keyExtractor: (e) => a(e).toString(),
              numColumns: c,
              refreshing: n,
              onRefresh: o,
              contentContainerStyle: {
                padding: 12,
                gap: 12,
                paddingBottom: 32,
              },
              columnWrapperStyle:
                c > 1
                  ? {
                      gap: 12,
                      justifyContent: "space-between",
                      marginBottom: 12,
                    }
                  : void 0,
              renderItem: ({ item: e }) =>
                (0, w.jsx)(E.default, {
                  style: { flex: 1, marginBottom: 12 },
                  children: t(e),
                }),
              ListEmptyComponent: i,
              ListFooterComponent: l,
            },
            c
          );
        }
        const lt = ({ onCreated: e }) => {
            const { user: t } = S(),
              a = `${t?.apellido || "Mi"}Coin`,
              [r, n] = (0, l.useState)(a),
              [o, i] = (0, l.useState)(!1),
              [s, d] = (0, l.useState)("");
            return (0, w.jsxs)(E.default, {
              style: { gap: 12, padding: 16 },
              children: [
                (0, w.jsx)(Y.default, {
                  variant: "titleMedium",
                  children: "Activar tu moneda personalizada",
                }),
                (0, w.jsx)(Ce.default, {
                  label: "Nombre de la moneda",
                  value: r,
                  onChangeText: n,
                  mode: "outlined",
                }),
                s
                  ? (0, w.jsx)(Y.default, {
                      style: { color: "red" },
                      children: s,
                    })
                  : null,
                (0, w.jsx)(Z.default, {
                  mode: "contained",
                  onPress: async () => {
                    if (r.trim()) {
                      d(""), i(!0);
                      try {
                        await (async function (e) {
                          try {
                            await u("token");
                            const t = await W(`${R}/epetcoins/`, {
                              method: "POST",
                              body: JSON.stringify({ nombre: e }),
                            });
                            return await t.json();
                          } catch (s) {
                            return void console.error(
                              "Error al consultar /me",
                              s
                            );
                          }
                        })(r),
                          e();
                      } catch (t) {
                        d("Error al crear la moneda"), console.error(t);
                      } finally {
                        i(!1);
                      }
                    } else d("Debes ingresar un nombre v\xe1lido");
                  },
                  loading: o,
                  disabled: o,
                  children: "Crear Epetcoin",
                }),
              ],
            });
          },
          st = () => {
            const { user: e } = S(),
              {
                alumnosMap: t,
                loadAlarcoins: a,
                alarcoinsError: r,
                aulas: n,
                epetCoin: o,
                transaccioncoins: i,
              } = J(),
              [s, d] = (0, l.useState)(null),
              [c, u] = (0, l.useState)(),
              [f, m] = (0, l.useState)(!1),
              [h, g] = (0, l.useState)(!0),
              { width: x } = (0, k.default)(),
              p = (0, l.useMemo)(() => (x >= 1e3 ? 3 : x >= 600 ? 2 : 1), [x]);
            (0, l.useEffect)(() => {
              (async () => {
                g(!0), a(), g(!1);
              })();
            }, []);
            const j = (t) => {
                e?.is_teacher ? d(t) : (d(e), u(t)), m(!0);
              },
              y = e?.is_teacher ? Object.values(t) : i ?? [];
            return (0, w.jsx)(A, {
              children: (0, w.jsx)(Q, {
                isLoading: h,
                hasError: r,
                errorMessage: "Error al cargar los epetCoins",
                reLoad: () => a(!0),
                children: h
                  ? (0, w.jsxs)(E.default, {
                      style: {
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        marginVertical: 40,
                      },
                      children: [
                        (0, w.jsx)(ae.default, {
                          name: "refresh-circle",
                          size: 48,
                          color: "#888",
                          style: { marginBottom: 10 },
                        }),
                        (0, w.jsx)(Y.default, {
                          variant: "titleMedium",
                          children: "Cargando...",
                        }),
                      ],
                    })
                  : (0, w.jsxs)(w.Fragment, {
                      children: [
                        e?.is_teacher
                          ? o?.nombre
                            ? (0, w.jsx)(Y.default, { children: o.nombre })
                            : (0, w.jsx)(lt, { onCreated: a })
                          : null,
                        (!e?.is_teacher || o?.nombre) &&
                          (0, w.jsxs)(w.Fragment, {
                            children: [
                              (0, w.jsxs)(E.default, {
                                style: {
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                },
                                children: [
                                  (0, w.jsx)(Y.default, {
                                    variant: "titleMedium",
                                    children: e?.is_teacher
                                      ? "Tus Alumnos"
                                      : "Tus EpetCoin",
                                  }),
                                  (0, w.jsx)(E.default, {
                                    style: { marginBottom: 10, width: 200 },
                                    children: (0, w.jsx)(Z.default, {
                                      mode: "contained",
                                      style: {
                                        borderRadius: 8,
                                        marginVertical: 10,
                                      },
                                      onPress: () => a(!0),
                                      icon: ({ color: e, size: t }) =>
                                        (0, w.jsx)(ae.default, {
                                          name: "refresh",
                                          color: e,
                                          size: t,
                                        }),
                                      children: "Refrescar",
                                    }),
                                  }),
                                ],
                              }),
                              e?.is_teacher || 0 !== i?.length
                                ? (0, w.jsx)(it, {
                                    items: y,
                                    numColumns: p,
                                    renderItem: (t) => {
                                      if (e?.is_teacher)
                                        return (0, w.jsx)(Pe.default, {
                                          style: ({ pressed: e }) => [
                                            { flex: 1, opacity: e ? 0.5 : 1 },
                                          ],
                                          onPress: () => j(t),
                                          children: (0, w.jsx)(Me, {
                                            user: t,
                                            loading: !1,
                                            isalarcoins: !0,
                                            alarcoins: t.epetcoin,
                                            desdeProfe: !0,
                                          }),
                                        });
                                      {
                                        const e = n.find(
                                          (e) => e.id === t.aula_id
                                        );
                                        if (!e) return null;
                                        const a = (t.epetcoins ?? []).reduce(
                                          (e, t) =>
                                            e +
                                            (t.suma ? t.cantidad : -t.cantidad),
                                          0
                                        );
                                        return (0, w.jsx)(Pe.default, {
                                          style: ({ pressed: e }) => [
                                            { flex: 1, opacity: e ? 0.5 : 1 },
                                          ],
                                          onPress: () => j(t),
                                          children: (0, w.jsx)(rt, {
                                            coin: t.nombre_moneda,
                                            materia: e,
                                            is_alumno: !0,
                                            alarcoin: a,
                                          }),
                                        });
                                      }
                                    },
                                    getKey: (t) =>
                                      e?.is_teacher ? t.id : t.aula_id,
                                    refreshing: h,
                                    onRefresh: () => a(!0),
                                    alumno: !e?.is_teacher,
                                  })
                                : (0, w.jsx)(Y.default, {
                                    style: {
                                      marginTop: 20,
                                      textAlign: "center",
                                    },
                                    children:
                                      "A\xfan no ten\xe9s EpetCoins asignadas.",
                                  }),
                            ],
                          }),
                        (0, w.jsx)(at, {
                          visible: f,
                          onDismiss: () => {
                            m(!1);
                          },
                          user: s,
                          is_teacher: e?.is_teacher,
                          selectedAula: c,
                        }),
                      ],
                    }),
              }),
            });
          },
          dt = () => {
            const { setUser: e } = S(),
              [t, a] = ((0, n.useNavigation)(), (0, l.useState)(!1)),
              [r, o] = (0, l.useState)(null),
              i = ge.object().shape({
                newPassword: ge
                  .string()
                  .min(6, "La contrase\xf1a debe tener al menos 6 caracteres")
                  .matches(
                    /[A-Z]/,
                    "La contrase\xf1a debe contener al menos una letra may\xfascula"
                  )
                  .required("Campo obligatorio"),
                confirmPassword: ge
                  .string()
                  .oneOf(
                    [ge.ref("newPassword")],
                    "Las contrase\xf1as no coinciden"
                  )
                  .required("Campo obligatorio"),
              });
            return (0, w.jsx)(A, {
              children: (0, w.jsx)(E.default, {
                style: ct.container,
                children: (0, w.jsxs)(te.default, {
                  style: ct.card,
                  children: [
                    (0, w.jsx)(te.default.Title, {
                      title: "Cambia tu contrase\xf1a",
                      subtitle: "Por seguridad, debes actualizarla",
                    }),
                    (0, w.jsx)(te.default.Content, {
                      children: (0, w.jsx)(he.Formik, {
                        initialValues: { newPassword: "", confirmPassword: "" },
                        validationSchema: i,
                        onSubmit: async (t) => {
                          a(!0), o(null);
                          try {
                            const a = await ve({
                              password: t.newPassword,
                              cambiarContrasena: !1,
                            });
                            e(Object.assign({}, a)), await d(a);
                          } catch (r) {
                            o(r.message || "Error al cambiar la contrase\xf1a");
                          } finally {
                            a(!1);
                          }
                        },
                        children: ({
                          handleChange: e,
                          handleBlur: a,
                          handleSubmit: n,
                          values: o,
                          errors: i,
                          touched: l,
                        }) =>
                          (0, w.jsxs)(E.default, {
                            children: [
                              (0, w.jsx)(Ce.default, {
                                label: "Nueva contrase\xf1a",
                                secureTextEntry: !0,
                                value: o.newPassword,
                                onChangeText: e("newPassword"),
                                onBlur: a("newPassword"),
                                style: ct.input,
                              }),
                              l.newPassword &&
                                i.newPassword &&
                                (0, w.jsx)(Y.default, {
                                  style: ct.error,
                                  children: i.newPassword,
                                }),
                              (0, w.jsx)(Ce.default, {
                                label: "Repetir contrase\xf1a",
                                secureTextEntry: !0,
                                value: o.confirmPassword,
                                onChangeText: e("confirmPassword"),
                                onBlur: a("confirmPassword"),
                                style: ct.input,
                              }),
                              l.confirmPassword &&
                                i.confirmPassword &&
                                (0, w.jsx)(Y.default, {
                                  style: ct.error,
                                  children: i.confirmPassword,
                                }),
                              r &&
                                (0, w.jsx)(Y.default, {
                                  style: ct.error,
                                  children: r,
                                }),
                              (0, w.jsx)(Z.default, {
                                mode: "contained",
                                onPress: () => n(),
                                style: ct.button,
                                disabled: t,
                                loading: t,
                                children: "Guardar contrase\xf1a",
                              }),
                            ],
                          }),
                      }),
                    }),
                  ],
                }),
              }),
            });
          },
          ct = T.default.create({
            container: {
              flex: 1,
              width: "100%",
              alignItems: "center",
              padding: 20,
              justifyContent: "center",
            },
            card: { width: "100%", maxWidth: 600 },
            input: { marginBottom: 10 },
            button: { marginTop: 10 },
            error: { color: "red", marginBottom: 10 },
          }),
          ut = () => {
            const { width: e } = (0, k.default)(),
              t = e >= 900 ? 2 : 1,
              { user: a } = S(),
              r = (0, n.useNavigation)(),
              { aulas: o } = J(),
              [i, s] = (0, l.useState)(!0),
              [d, c] = (0, l.useState)([]),
              u = async () => {
                s(!0);
                try {
                  const e = await ie();
                  c(e), await h(e);
                } catch (e) {
                  console.error("Error recargando asistencias", e);
                } finally {
                  s(!1);
                }
              };
            (0, l.useEffect)(() => {
              a?.is_teacher ||
                (async () => {
                  s(!0);
                  const e = await g();
                  if (e) return c(e), void s(!1);
                  u();
                })();
            }, [i]);
            return (0, w.jsxs)(A, {
              children: [
                (0, w.jsxs)(E.default, {
                  style: ft.header,
                  children: [
                    (0, w.jsxs)(E.default, {
                      children: [
                        (0, w.jsx)(Y.default, {
                          variant: "titleLarge",
                          style: ft.title,
                          children: "Mis Materias",
                        }),
                        (0, w.jsx)(Y.default, {
                          variant: "bodyMedium",
                          style: ft.subtitle,
                          children: a?.is_teacher
                            ? "Lista de materias que dictas"
                            : "Lista de materias que cursas",
                        }),
                      ],
                    }),
                    a?.is_teacher
                      ? ""
                      : (0, w.jsx)(Z.default, {
                          mode: "contained",
                          style: ft.button,
                          onPress: u,
                          icon: ({ color: e, size: t }) =>
                            (0, w.jsx)(ae.default, {
                              name: "refresh",
                              color: e,
                              size: t,
                            }),
                          children: "Refrescar",
                        }),
                  ],
                }),
                (0, w.jsx)(P.default, {
                  contentContainerStyle: {
                    paddingBottom: 32,
                    gap: 12,
                    flexDirection: t > 1 ? "row" : "column",
                    flexWrap: t > 1 ? "wrap" : "nowrap",
                    justifyContent: t > 1 ? "center" : "flex-start",
                  },
                  children: o.map((n) => {
                    const o = d.find((e) => e.aula_id === n.id),
                      i = o?.porcentaje_asistencia,
                      l = d.find((e) => e.aula_id === n.id),
                      s = l?.asistencias || [];
                    return (0, w.jsx)(
                      E.default,
                      {
                        style: [
                          ft.card,
                          t > 1 && { width: e / 2 - 24, marginHorizontal: 6 },
                        ],
                        children: (0, w.jsx)(rt, {
                          materia: n,
                          onPress: () =>
                            ((e, t) => {
                              r.navigate("MateriasStack", {
                                screen: "DetalleMateria",
                                params: { materia: e, asistencia: t },
                              });
                            })(n, s),
                          porcentaje: i,
                          is_alumno: !a?.is_teacher,
                          alarcoin: void 0,
                        }),
                      },
                      n.id
                    );
                  }),
                }),
              ],
            });
          },
          ft = T.default.create({
            container: {
              padding: 16,
              justifyContent: "center",
              alignItems: "center",
            },
            header: {
              marginBottom: 24,
              flexDirection: "row",
              justifyContent: "space-between",
              alignContent: "center",
            },
            title: { fontWeight: "bold" },
            subtitle: { marginTop: 4, color: "#6b7280" },
            card: { marginBottom: 16 },
            cardContent: {
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
            },
            infoLeft: { flex: 1, gap: 4 },
            scheduleRow: {
              flexDirection: "row",
              alignItems: "center",
              marginTop: 4,
              gap: 6,
            },
            scheduleText: { color: "#6b7280" },
            infoRight: { alignItems: "flex-end" },
            label: { color: "#6b7280" },
            classCount: { marginTop: 2, fontWeight: "600" },
            button: { borderRadius: 8, marginVertical: 10 },
          });
        function mt({ visible: e, onClose: t, clase: a }) {
          const { token: r } = S(),
            { alumnosMap: n, aulas: o } = J(),
            [i, s] = (0, l.useState)([]),
            [d, c] = (0, l.useState)(!0),
            [u, f] = (0, l.useState)(""),
            [m, h] = (0, l.useState)([]),
            { colors: g } = (0, _.useTheme)(),
            { width: x } = (0, k.default)(),
            p = x < 600,
            j = x >= 1e3 ? 3 : x >= 700 ? 2 : 1,
            y = o.find((e) => e.id === a.aula_id),
            b =
              y?.alumnoIds
                .map((e) => n[e])
                .filter(Boolean)
                .filter((e) => !a.grupo_id || e.grupo_id === a.grupo_id) ?? [];
          (0, l.useEffect)(() => {
            if (!e) return;
            c(!0);
            (async () => {
              try {
                const e = await (async function (e) {
                  const t = await W(
                    `${R}/asistencias/asistencias-por-clase/${e}`,
                    { method: "GET" }
                  );
                  if (!t.ok) {
                    const e = await t.json();
                    throw new Error(e.detail || "Error al iniciar sesi\xf3n");
                  }
                  return await t.json();
                })(a.id);
                if ((s(e), 0 === e.length)) {
                  const e = b.map((e) => ({ alumno_id: e.id, presente: 1 }));
                  h(e);
                }
              } catch (e) {
                console.error("Error al obtener asistencias:", e);
              } finally {
                c(!1);
              }
            })(),
              h([]);
          }, [e, a.id]),
            (0, l.useEffect)(() => {
              e || (s([]), h([]));
            }, [e]);
          const C = b.filter((e) => {
              const t = u.toLowerCase();
              return (
                e.nombre.toLowerCase().includes(t) ||
                e.apellido.toLowerCase().includes(t)
              );
            }),
            v = (e, t) => {
              h((a) =>
                a.find((t) => t.alumno_id === e)
                  ? a.map((a) =>
                      a.alumno_id === e
                        ? Object.assign({}, a, { presente: t })
                        : a
                    )
                  : [...a, { alumno_id: e, presente: t }]
              );
            };
          return (0, w.jsx)(qe.default, {
            children: (0, w.jsxs)(Ue.default, {
              visible: e,
              onDismiss: t,
              contentContainerStyle: [
                ht.modalContainer,
                { backgroundColor: g.background },
              ],
              children: [
                (0, w.jsxs)(Y.default, {
                  variant: "titleMedium",
                  style: ht.headerTitle,
                  children: ["Asistencia - ", a.tema],
                }),
                d
                  ? (0, w.jsx)(K.default, { style: { marginVertical: 20 } })
                  : (0, w.jsxs)(w.Fragment, {
                      children: [
                        (0, w.jsx)(Ce.default, {
                          label: "Buscar alumno",
                          mode: "outlined",
                          value: u,
                          onChangeText: f,
                          style: { marginBottom: 10 },
                          placeholder: "Nombre o apellido",
                        }),
                        (0, w.jsx)(P.default, {
                          contentContainerStyle: ht.scroll,
                          children: (0, w.jsx)(E.default, {
                            style: [ht.grid, { gap: 12 }],
                            children: C.map((e) => {
                              const t = i.find((t) => t.alumno_id === e.id),
                                a = m.find((t) => t.alumno_id === e.id),
                                r =
                                  a?.presente?.toString() ??
                                  t?.presente?.toString() ??
                                  "",
                                n = a?.justificado ?? t?.justificado ?? "";
                              return (0, w.jsx)(
                                E.default,
                                {
                                  style: [
                                    ht.cardWrapper,
                                    { width: 100 / j - 4 + "%" },
                                  ],
                                  children: (0, w.jsx)(te.default, {
                                    mode: "outlined",
                                    style: ht.alumnoCard,
                                    children: (0, w.jsxs)(te.default.Content, {
                                      style: { gap: 4, padding: 5 },
                                      children: [
                                        (0, w.jsxs)(Y.default, {
                                          style: ht.nombreAlumno,
                                          children: [e.nombre, " ", e.apellido],
                                        }),
                                        (0, w.jsx)(Ze.default.Group, {
                                          onValueChange: (t) =>
                                            v(e.id, parseInt(t)),
                                          value: r,
                                          children: (0, w.jsx)(E.default, {
                                            style: ht.radioRowFixed,
                                            children: [
                                              {
                                                label: p ? "P" : "Presente",
                                                value: "1",
                                              },
                                              {
                                                label: p ? "A" : "Ausente",
                                                value: "2",
                                              },
                                              {
                                                label: p ? "T" : "Tarde",
                                                value: "3",
                                              },
                                            ].map((t) =>
                                              (0, w.jsxs)(
                                                Pe.default,
                                                {
                                                  style: ht.radioItemPressable,
                                                  onPress: () =>
                                                    v(e.id, parseInt(t.value)),
                                                  children: [
                                                    (0, w.jsx)(Ze.default, {
                                                      value: t.value,
                                                      status:
                                                        r === t.value
                                                          ? "checked"
                                                          : "unchecked",
                                                      onPress: () =>
                                                        v(
                                                          e.id,
                                                          parseInt(t.value)
                                                        ),
                                                    }),
                                                    (0, w.jsx)(Y.default, {
                                                      style: [
                                                        p
                                                          ? ht.radioLabelMobile
                                                          : ht.radioLabel,
                                                        ht.radioLabelText,
                                                      ],
                                                      children: t.label,
                                                    }),
                                                  ],
                                                },
                                                t.value
                                              )
                                            ),
                                          }),
                                        }),
                                        (0, w.jsx)(Ce.default, {
                                          label: "Justificaci\xf3n",
                                          mode: "outlined",
                                          value: n,
                                          onChangeText: (t) => {
                                            return (
                                              (a = e.id),
                                              (r = t),
                                              void h((e) =>
                                                e.find((e) => e.alumno_id === a)
                                                  ? e.map((e) =>
                                                      e.alumno_id === a
                                                        ? Object.assign({}, e, {
                                                            justificado: r,
                                                          })
                                                        : e
                                                    )
                                                  : [
                                                      ...e,
                                                      {
                                                        alumno_id: a,
                                                        presente: 2,
                                                        justificado: r,
                                                      },
                                                    ]
                                              )
                                            );
                                            var a, r;
                                          },
                                        }),
                                      ],
                                    }),
                                  }),
                                },
                                e.id
                              );
                            }),
                          }),
                        }),
                      ],
                    }),
                (0, w.jsxs)(E.default, {
                  style: ht.buttonRow,
                  children: [
                    (0, w.jsx)(Z.default, {
                      mode: "text",
                      onPress: t,
                      children: "Cancelar",
                    }),
                    (0, w.jsx)(Z.default, {
                      mode: "contained",
                      onPress: async () => {
                        c(!0);
                        try {
                          if (0 === m.length)
                            return void be.default.alert(
                              "Sin cambios",
                              "No se detectaron asistencias editadas."
                            );
                          const e = b.map((e) => {
                            const t = m.find((t) => t.alumno_id === e.id);
                            return {
                              alumno_id: e.id,
                              presente: t?.presente ?? 1,
                              justificado: t?.justificado ?? "no",
                            };
                          });
                          await (async function (e, t) {
                            const a = await W(`${R}/asistencias/masiva/${e}`, {
                              method: "POST",
                              body: JSON.stringify(t),
                            });
                            if (!a.ok) {
                              const e = await a.json();
                              throw new Error(
                                e.detail || "Error al guardar asistencias"
                              );
                            }
                          })(a.id, e),
                            be.default.alert(
                              "Guardado",
                              "Las asistencias fueron actualizadas correctamente."
                            ),
                            h([]),
                            t();
                        } catch (e) {
                          console.error("Error al guardar asistencias:", e),
                            be.default.alert(
                              "Error",
                              e.message || "Ocurri\xf3 un error al guardar."
                            );
                        } finally {
                          c(!1);
                        }
                      },
                      children: d ? "guardando" : "Guardar",
                    }),
                  ],
                }),
              ],
            }),
          });
        }
        const ht = T.default.create({
          modalContainer: {
            margin: 10,
            padding: 20,
            borderRadius: 12,
            maxHeight: "95%",
          },
          scroll: { paddingVertical: 5 },
          headerTitle: { marginBottom: 12 },
          grid: {
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
          },
          cardWrapper: { marginBottom: 16 },
          alumnoCard: { borderRadius: 12 },
          nombreAlumno: { fontWeight: "600", marginBottom: 4 },
          radioRow: { flexDirection: "row", justifyContent: "space-evenly" },
          buttonRow: {
            flexDirection: "row",
            justifyContent: "flex-end",
            marginTop: 20,
            gap: 10,
          },
          radioRowFixed: {
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
            flexWrap: "nowrap",
          },
          radioItemFixed: { flex: 1, margin: 0, padding: 0 },
          radioLabel: { fontSize: 14 },
          radioLabelMobile: { fontSize: 12 },
          radioItemPressable: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            minWidth: 50,
            maxWidth: 80,
          },
          radioLabelText: { textAlign: "center", flexShrink: 1 },
        });
        function gt({ clase: e, asistencia: t }) {
          const [a, r] = (0, l.useState)(!1),
            { user: n } = S(),
            { colors: o } = (0, _.useTheme)();
          return (0, w.jsxs)(w.Fragment, {
            children: [
              (0, w.jsx)(te.default, {
                style: [xt.card],
                children: (0, w.jsx)(z.LinearGradient, {
                  colors: n?.is_teacher
                    ? ["#trnasparent", "transparent"]
                    : ((e) =>
                        1 === e
                          ? [o.background, o.asistenciaBuena]
                          : 2 === e
                          ? [o.background, o.asistenciaMala]
                          : 3 === e
                          ? [o.background, o.asistenciaMedia]
                          : ["transparent", "transparent"])(t?.presente),
                  start: { x: 0.4, y: 0.3 },
                  end: { x: 1, y: 1 },
                  style: { borderRadius: 8, padding: 10 },
                  children: (0, w.jsxs)(te.default.Content, {
                    children: [
                      (0, w.jsxs)(E.default, {
                        style: xt.headerRow,
                        children: [
                          (0, w.jsx)(Y.default, {
                            variant: "titleSmall",
                            style: xt.cardTitle,
                            children: e.tema,
                          }),
                          (0, w.jsx)(E.default, {
                            style: xt.iconButtons,
                            children: n?.is_teacher
                              ? (0, w.jsxs)(w.Fragment, {
                                  children: [
                                    (0, w.jsx)(ae.default, {
                                      name: "create-outline",
                                      size: 20,
                                      color: "#9CA3AF",
                                      style: xt.iconMargin,
                                    }),
                                    (0, w.jsx)(ae.default, {
                                      name: "trash-outline",
                                      size: 20,
                                      color: "#9CA3AF",
                                    }),
                                  ],
                                })
                              : (0, w.jsxs)(Y.default, {
                                  variant: "bodyMedium",
                                  children: [
                                    " ",
                                    t
                                      ? 1 === t.presente
                                        ? "Presente"
                                        : 2 === t.presente
                                        ? "Ausente"
                                        : "Tarde"
                                      : "Sin asistencia",
                                  ],
                                }),
                          }),
                        ],
                      }),
                      (0, w.jsxs)(E.default, {
                        style: xt.scheduleRow,
                        children: [
                          (0, w.jsx)(ae.default, {
                            name: "calendar-outline",
                            size: 13,
                            color: "#9CA3AF",
                            style: xt.iconMargin,
                          }),
                          (0, w.jsx)(Y.default, {
                            variant: "bodySmall",
                            style: xt.cardSubtitle,
                            children: e.fecha.toString(),
                          }),
                        ],
                      }),
                      n?.is_teacher &&
                        (0, w.jsx)(Z.default, {
                          mode: "outlined",
                          icon: ({ color: e, size: t }) =>
                            (0, w.jsx)(ae.default, {
                              name: "checkmark-circle",
                              color: e,
                              size: t,
                            }),
                          style: xt.attendanceButton,
                          onPress: () => r(!0),
                          children: "Tomar asistencia",
                        }),
                    ],
                  }),
                }),
              }),
              (0, w.jsx)(mt, { visible: a, onClose: () => r(!1), clase: e }),
            ],
          });
        }
        const xt = T.default.create({
          card: {
            width: "100%",
            maxWidth: 400,
            borderRadius: 8,
            elevation: 2,
            alignSelf: "center",
            marginHorizontal: 15,
            marginBottom: 10,
          },
          headerRow: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          },
          iconButtons: { flexDirection: "row" },
          iconMargin: { marginRight: 8 },
          scheduleRow: {
            flexDirection: "row",
            alignItems: "center",
            marginTop: 4,
          },
          cardTitle: { fontWeight: "bold", marginBottom: 4 },
          cardSubtitle: { color: "#6B7280" },
          attendanceButton: { marginTop: 10 },
          modalBackdrop: {
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.4)",
            justifyContent: "center",
            alignItems: "center",
          },
          modalContainer: {
            width: "85%",
            padding: 20,
            backgroundColor: "white",
            borderRadius: 10,
            elevation: 5,
          },
          modalCloseButton: { marginTop: 20, alignSelf: "flex-end" },
          modalCloseText: { color: "#2563EB", fontWeight: "bold" },
        });
        function pt() {
          const { width: e } = (0, k.default)(),
            t = (0, n.useRoute)(),
            { materia: r, asistencia: o } = t.params,
            i = (0, n.useNavigation)(),
            { token: s, user: d } = S(),
            [c, f] = (0, l.useState)(!0),
            [m, h] = (0, l.useState)([]),
            [g, j] = (0, l.useState)(!1),
            [y, b] = (0, l.useState)(null),
            [C, v] = (0, l.useState)(null),
            { colors: T } = (0, _.useTheme)(),
            D = async (e = !1) => {
              let t = s;
              s || (t = await u("token"));
              try {
                if (!e) {
                  const e = await p(r.id);
                  if (e) return h(e), void f(!1);
                }
                const t = await (async function (e) {
                  const t = await W(`${R}/clases/aulas/${e}/clases`, {
                    method: "GET",
                  });
                  if (!t.ok) {
                    const e = await t.json();
                    throw new Error(e.detail || "Error al iniciar sesi\xf3n");
                  }
                  return await t.json();
                })(r.id);
                h(t), await x(r.id, t);
              } catch (g) {
                console.log("error al obtener las clases", g), j(!0);
              } finally {
                f(!1);
              }
            },
            B = (
              d?.is_teacher
                ? m
                : m.filter((e) => !/^clases\s+\d+/i.test(e.tema))
            ).filter(
              (e) =>
                (null === y || e.grupo_id === y) &&
                (null === C || e.cuatrimestre === C)
            ),
            I = e >= 1024 ? 3 : e >= 600 ? 2 : 1,
            z = e < 600;
          (0, l.useEffect)(() => {
            D();
          }, []);
          return (0, w.jsx)(A, {
            children: (0, w.jsxs)(E.default, {
              style: jt.container,
              children: [
                (0, w.jsxs)(E.default, {
                  style: [
                    jt.sectionHeader,
                    z && {
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: 8,
                    },
                  ],
                  children: [
                    (0, w.jsxs)(E.default, {
                      style: [
                        jt.headerRow,
                        z && { flexDirection: "row", alignItems: "center" },
                      ],
                      children: [
                        (0, w.jsx)(Z.default, {
                          onPress: () => {
                            i.goBack();
                          },
                          mode: "text",
                          compact: !0,
                          icon: ({ size: e, color: t }) =>
                            (0, w.jsx)(ae.default, {
                              name: "arrow-back",
                              size: 16,
                              color: T.primary,
                            }),
                          contentStyle: jt.backButton,
                          labelStyle: [
                            jt.backButtonText,
                            z && { display: "none" },
                          ],
                          children: !z && "Volver",
                        }),
                        (0, w.jsx)(Y.default, {
                          variant: z ? "titleSmall" : "titleMedium",
                          style: [
                            jt.subjectTitle,
                            {
                              flexShrink: 1,
                              flexWrap: "wrap",
                              maxWidth: z ? "90%" : "100%",
                            },
                          ],
                          numberOfLines: 1,
                          ellipsizeMode: "tail",
                          children: r.nombre,
                        }),
                      ],
                    }),
                    (0, w.jsxs)(E.default, {
                      style: jt.scheduleRow,
                      children: [
                        (0, w.jsx)(Z.default, {
                          mode: "contained",
                          style: jt.addButton,
                          onPress: () => D(!0),
                          icon: ({ color: e, size: t }) =>
                            (0, w.jsx)(ae.default, {
                              name: "refresh",
                              color: e,
                              size: t,
                            }),
                          children: "Refrescar",
                        }),
                        d?.is_teacher &&
                          (0, w.jsx)(Z.default, {
                            icon: ({ color: e, size: t }) =>
                              (0, w.jsx)(ae.default, {
                                name: "add-circle-outline",
                                color: e,
                                size: t,
                              }),
                            mode: "contained",
                            onPress: () => {},
                            contentStyle: jt.addButtonContent,
                            style: jt.addButton,
                            children: "Agregar Clase",
                          }),
                      ],
                    }),
                  ],
                }),
                c
                  ? (0, w.jsx)(K.default, { size: "large", color: "violet" })
                  : g
                  ? (0, w.jsxs)(E.default, {
                      style: {
                        alignItems: "center",
                        justifyContent: "center",
                        flex: 1,
                      },
                      children: [
                        (0, w.jsx)(Y.default, {
                          variant: "titleLarge",
                          style: {
                            marginBottom: 12,
                            color: "#9333EA",
                            textAlign: "center",
                          },
                          children: "Ocurri\xf3 un error al cargar las clases",
                        }),
                        (0, w.jsx)(U.default, {
                          source: a(2058),
                          style: {
                            width: 180,
                            height: 180,
                            marginBottom: 20,
                            borderRadius: 90,
                            opacity: 0.85,
                          },
                          resizeMode: "contain",
                        }),
                        (0, w.jsx)(Z.default, {
                          mode: "contained",
                          onPress: () => {
                            f(!0), j(!1), D();
                          },
                          style: { marginTop: 8 },
                          children: "Reintentar",
                        }),
                      ],
                    })
                  : (0, w.jsxs)(w.Fragment, {
                      children: [
                        (0, w.jsxs)(E.default, {
                          style: {
                            flexDirection: "row",
                            gap: 8,
                            marginBottom: 12,
                            flexWrap: "wrap",
                          },
                          children: [
                            d?.is_teacher
                              ? "taller" === r.tipo &&
                                (0, w.jsxs)(w.Fragment, {
                                  children: [
                                    (0, w.jsx)(Z.default, {
                                      mode:
                                        null === y ? "contained" : "outlined",
                                      onPress: () => b(null),
                                      children: "Todos los grupos",
                                    }),
                                    [1, 2].map((e) =>
                                      (0, w.jsxs)(
                                        Z.default,
                                        {
                                          mode:
                                            y === e ? "contained" : "outlined",
                                          onPress: () => b(e),
                                          children: ["G ", e],
                                        },
                                        e
                                      )
                                    ),
                                  ],
                                })
                              : (0, w.jsx)(Y.default, { children: " " }),
                            (0, w.jsx)(Z.default, {
                              mode: null === C ? "contained" : "outlined",
                              onPress: () => v(null),
                              children: "Todos los cuatris",
                            }),
                            [1, 2].map((e) =>
                              (0, w.jsxs)(
                                Z.default,
                                {
                                  mode: C === e ? "contained" : "outlined",
                                  onPress: () => v(e),
                                  children: ["C ", e],
                                },
                                e
                              )
                            ),
                          ],
                        }),
                        (0, w.jsx)(P.default, {
                          contentContainerStyle: {
                            paddingBottom: d?.is_teacher ? 90 : 32,
                            paddingHorizontal: 6,
                            gap: 10,
                          },
                          showsVerticalScrollIndicator: !1,
                          children:
                            0 === B.length
                              ? (0, w.jsxs)(E.default, {
                                  children: [
                                    (0, w.jsx)(ae.default, {
                                      name: "information-circle-outline",
                                      size: 48,
                                      color: "#A78BFA",
                                    }),
                                    (0, w.jsx)(Y.default, {
                                      style: {
                                        color: "#6B7280",
                                        marginTop: 12,
                                        textAlign: "center",
                                      },
                                      children:
                                        "No hay clases registradas a\xfan.",
                                    }),
                                  ],
                                })
                              : ((e, t) => {
                                  const a = [];
                                  for (let r = 0; r < e.length; r += t)
                                    a.push(e.slice(r, r + t));
                                  return a;
                                })(B, I).map((e, t) =>
                                  (0, w.jsxs)(
                                    E.default,
                                    {
                                      style: {
                                        flexDirection: "row",
                                        justifyContent:
                                          I > 1 ? "center" : "flex-start",
                                        marginBottom: 10,
                                        gap: 10,
                                      },
                                      children: [
                                        e.map((e) => {
                                          const t = o.find(
                                            (t) => t.id === e.id
                                          );
                                          return (0, w.jsx)(
                                            E.default,
                                            {
                                              style: {
                                                flex: 1,
                                                maxWidth: 100 / I + "%",
                                              },
                                              children: (0, w.jsx)(E.default, {
                                                children: (0, w.jsx)(gt, {
                                                  clase: e,
                                                  asistencia: t,
                                                }),
                                              }),
                                            },
                                            e.id
                                          );
                                        }),
                                        e.length < I &&
                                          Array.from({
                                            length: I - e.length,
                                          }).map((e, t) =>
                                            (0, w.jsx)(
                                              E.default,
                                              {
                                                style: {
                                                  flex: 1,
                                                  maxWidth: 100 / I + "%",
                                                  minHeight: 120,
                                                },
                                              },
                                              `empty-${t}`
                                            )
                                          ),
                                      ],
                                    },
                                    t
                                  )
                                ),
                        }),
                      ],
                    }),
              ],
            }),
          });
        }
        const jt = T.default.create({
            container: { flex: 1, padding: 10 },
            backButton: {
              flexDirection: "row",
              alignItems: "center",
              paddingLeft: 0,
            },
            backButtonText: { color: "#4B5563", fontSize: 14, marginLeft: 4 },
            scheduleRow: {
              flexDirection: "row",
              alignItems: "center",
              marginTop: 4,
              gap: 6,
            },
            subjectTitle: { fontWeight: "bold" },
            subjectSchedule: {
              color: "#6B7280",
              marginTop: 4,
              marginBottom: 4,
            },
            sectionHeader: {
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginVertical: 8,
            },
            addButton: { borderRadius: 8, marginVertical: 10 },
            addButtonContent: { flexDirection: "row" },
            headerRow: { flexDirection: "row", alignItems: "center", gap: 8 },
          }),
          yt = (0, o.createNativeStackNavigator)();
        function bt() {
          return (0, w.jsxs)(yt.Navigator, {
            screenOptions: { headerShown: !1 },
            children: [
              (0, w.jsx)(yt.Screen, {
                name: "Materias",
                component: ut,
                options: { title: "adminAulas | Mis Materias" },
              }),
              (0, w.jsx)(yt.Screen, {
                name: "DetalleMateria",
                component: pt,
                options: { title: "adminAulas | Detalle de Materia" },
              }),
            ],
          });
        }
        var wt = a(2071);
        const Ct = T.default.create({
            card: { marginVertical: 8, borderRadius: 16 },
            badge: {
              borderRadius: 12,
              paddingHorizontal: 10,
              paddingVertical: 4,
              marginRight: 16,
              alignSelf: "center",
            },
            badgeText: { color: "white", fontSize: 12, fontWeight: "bold" },
            row: {
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 8,
              marginBottom: 12,
            },
            column: { flex: 1 },
            label: { color: "gray", marginBottom: 4 },
            progressWrapper: { marginTop: 8 },
            progressLabel: {
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 4,
            },
            progressBar: {
              height: 6,
              borderRadius: 4,
              backgroundColor: "#e5e7eb",
            },
          }),
          vt = ({
            name: e,
            email: t,
            promedio: a,
            asistencia: r,
            completadas: n,
            totalTareas: o,
            estado: i = "Bien",
            onPressDetalles: l,
          }) => {
            const s = (0, _.useTheme)(),
              d = _e(e),
              c = {
                Excelente: s.colors.tertiary,
                Bien: s.colors.secondary,
                Regular: s.colors.error,
              }[i];
            return (0, w.jsxs)(te.default, {
              style: Ct.card,
              mode: "elevated",
              children: [
                (0, w.jsx)(te.default.Title, {
                  title: e,
                  subtitle: t,
                  titleVariant: "titleMedium",
                  subtitleVariant: "bodySmall",
                  left: () => (0, w.jsx)(ze.default, { size: 40, label: d }),
                  right: () =>
                    (0, w.jsx)(E.default, {
                      style: [Ct.badge, { backgroundColor: c }],
                      children: (0, w.jsx)(Y.default, {
                        style: Ct.badgeText,
                        children: i,
                      }),
                    }),
                }),
                (0, w.jsxs)(te.default.Content, {
                  children: [
                    (0, w.jsxs)(E.default, {
                      style: Ct.row,
                      children: [
                        (0, w.jsxs)(E.default, {
                          style: Ct.column,
                          children: [
                            (0, w.jsx)(Y.default, {
                              variant: "labelSmall",
                              style: Ct.label,
                              children: "Promedio",
                            }),
                            (0, w.jsxs)(Y.default, {
                              variant: "titleMedium",
                              children: [a, "%"],
                            }),
                          ],
                        }),
                        (0, w.jsxs)(E.default, {
                          style: Ct.column,
                          children: [
                            (0, w.jsx)(Y.default, {
                              variant: "labelSmall",
                              style: Ct.label,
                              children: "Asistencia",
                            }),
                            (0, w.jsxs)(Y.default, {
                              variant: "titleMedium",
                              children: [r, "%"],
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, w.jsxs)(E.default, {
                      style: Ct.progressWrapper,
                      children: [
                        (0, w.jsxs)(E.default, {
                          style: Ct.progressLabel,
                          children: [
                            (0, w.jsx)(Y.default, {
                              variant: "labelSmall",
                              style: Ct.label,
                              children: "Tareas Completadas",
                            }),
                            (0, w.jsx)(Y.default, {
                              variant: "bodyMedium",
                              children: `${n}/${o}`,
                            }),
                          ],
                        }),
                        (0, w.jsx)(wt.default, {
                          progress: n / o,
                          color: s.colors.primary,
                          style: Ct.progressBar,
                        }),
                      ],
                    }),
                  ],
                }),
                (0, w.jsx)(te.default.Actions, {
                  children: (0, w.jsx)(Z.default, {
                    onPress: l,
                    mode: "contained-tonal",
                    children: "Ver detalles",
                  }),
                }),
              ],
            });
          },
          St = [
            { id: 1, nombre: "Matem\xe1tica 1\xb0A" },
            { id: 2, nombre: "F\xedsica 2\xb0B" },
          ],
          Tt = [
            {
              id: 1,
              nombre: "Alicia Gonz\xe1lez",
              email: "alicia.g@colegio.edu",
              aulas: [
                {
                  aulaId: 1,
                  promedio: 85,
                  asistencia: 91,
                  completadas: 8,
                  totalTareas: 10,
                },
                {
                  aulaId: 2,
                  promedio: 78,
                  asistencia: 88,
                  completadas: 6,
                  totalTareas: 9,
                },
              ],
            },
            {
              id: 2,
              nombre: "Carlos P\xe9rez",
              email: "carlos.p@colegio.edu",
              aulas: [
                {
                  aulaId: 1,
                  promedio: 72,
                  asistencia: 75,
                  completadas: 6,
                  totalTareas: 10,
                },
              ],
            },
            {
              id: 3,
              nombre: "Brenda Mart\xednez",
              email: "brenda.m@colegio.edu",
              aulas: [
                {
                  aulaId: 2,
                  promedio: 92,
                  asistencia: 98,
                  completadas: 9,
                  totalTareas: 10,
                },
              ],
            },
            {
              id: 4,
              nombre: "Diego Fern\xe1ndez",
              email: "diego.f@colegio.edu",
              aulas: [
                {
                  aulaId: 1,
                  promedio: 63,
                  asistencia: 70,
                  completadas: 4,
                  totalTareas: 10,
                },
              ],
            },
            {
              id: 5,
              nombre: "Luc\xeda Ram\xedrez",
              email: "lucia.r@colegio.edu",
              aulas: [
                {
                  aulaId: 2,
                  promedio: 88,
                  asistencia: 95,
                  completadas: 10,
                  totalTareas: 10,
                },
              ],
            },
          ],
          Et = () => {
            const [e, t] = (0, l.useState)(""),
              [a, r] = (0, l.useState)(St[0]?.id ?? null),
              [n, o] = (0, l.useState)(!1),
              { width: i } = (0, k.default)(),
              s = i > 1024 ? 3 : 1,
              d = Tt.map((e) => {
                const t = e.aulas.find((e) => e.aulaId === a);
                return t ? Object.assign({}, e, t) : null;
              })
                .filter(Boolean)
                .filter((t) =>
                  t.nombre.toLowerCase().includes(e.toLowerCase())
                ),
              c = St.find((e) => e.id === a)?.nombre || "Todas";
            return (0, w.jsx)(A, {
              children: (0, w.jsxs)(E.default, {
                style: kt.container,
                children: [
                  (0, w.jsxs)(E.default, {
                    style: kt.header,
                    children: [
                      (0, w.jsx)(Y.default, {
                        variant: "titleLarge",
                        children: "Gesti\xf3n de Alumnos",
                      }),
                      (0, w.jsx)(Y.default, {
                        variant: "bodyMedium",
                        children:
                          "Buscar, gestionar y hacer seguimiento de los estudiantes",
                      }),
                    ],
                  }),
                  (0, w.jsxs)(E.default, {
                    style: kt.filters,
                    children: [
                      (0, w.jsx)(Ce.default, {
                        mode: "outlined",
                        placeholder: "Buscar alumno...",
                        value: e,
                        onChangeText: t,
                        style: kt.searchInput,
                      }),
                      (0, w.jsx)(Qe.default, {
                        visible: n,
                        onDismiss: () => o(!1),
                        anchor: (0, w.jsx)(Z.default, {
                          mode: "outlined",
                          onPress: () => o(!0),
                          children: c,
                        }),
                        children: St.map((e) =>
                          (0, w.jsx)(
                            Qe.default.Item,
                            {
                              onPress: () => {
                                r(e.id), o(!1);
                              },
                              title: e.nombre,
                            },
                            e.id
                          )
                        ),
                      }),
                    ],
                  }),
                  (0, w.jsx)(ot.default, {
                    data: d,
                    keyExtractor: (e) => e.id.toString(),
                    contentContainerStyle: kt.listContainer,
                    numColumns: s,
                    columnWrapperStyle: s > 1 ? kt.columnWrapper : void 0,
                    renderItem: ({ item: e }) =>
                      (0, w.jsx)(E.default, {
                        style: kt.cardWrapper,
                        children: (0, w.jsx)(vt, {
                          name: e.nombre,
                          email: e.email,
                          asistencia: e.asistencia,
                          completadas: e.completadas,
                          promedio: e.promedio,
                          totalTareas: e.totalTareas,
                          estado: "Excelente",
                          onPressDetalles: () => {
                            console.log("Ver detalles de:", e.nombre);
                          },
                        }),
                      }),
                    ListEmptyComponent: (0, w.jsx)(Y.default, {
                      style: { textAlign: "center", marginTop: 20 },
                      children: "No se encontraron alumnos.",
                    }),
                  }),
                ],
              }),
            });
          },
          kt = T.default.create({
            container: { padding: 16, flex: 1 },
            header: { marginBottom: 16 },
            filters: {
              flexDirection: "row",
              alignItems: "center",
              gap: 12,
              marginBottom: 16,
              flexWrap: "wrap",
            },
            searchInput: { flex: 1, minWidth: 200 },
            listContainer: { paddingBottom: 24 },
            columnWrapper: { justifyContent: "space-between", gap: 12 },
            cardWrapper: {
              flex: 1,
              maxWidth: 350,
              minWidth: 280,
              marginBottom: 16,
            },
          });
        var Pt = a(3104);
        const Dt = T.default.create({
            card: { marginBottom: 8, borderRadius: 12, elevation: 1 },
            titulo: { fontSize: 14, color: "#666", textAlign: "center" },
            valor: { fontWeight: "bold", marginTop: 4, textAlign: "center" },
            progress: { marginTop: 6, height: 6, borderRadius: 6 },
            subtitulo: { marginTop: 4, color: "#888", textAlign: "center" },
          }),
          Bt = ({
            titulo: e,
            valor: t,
            subtitulo: a,
            progreso: r,
            isLarge: n,
          }) => {
            const { colors: o } = (0, _.useTheme)();
            return (0, w.jsxs)(te.default, {
              style: [Dt.card, n ? { width: 150 } : { maxWidth: 100 }],
              children: [
                (0, w.jsx)(te.default.Title, {
                  title: e,
                  titleStyle: Dt.titulo,
                }),
                (0, w.jsxs)(te.default.Content, {
                  children: [
                    (0, w.jsx)(Y.default, {
                      variant: "headlineMedium",
                      style: Dt.valor,
                      children: t,
                    }),
                    null != r &&
                      (0, w.jsx)(wt.default, {
                        progress: r / 100,
                        style: Dt.progress,
                        color: o.primary,
                      }),
                    a &&
                      (0, w.jsx)(Y.default, {
                        style: Dt.subtitulo,
                        variant: "bodySmall",
                        children: a,
                      }),
                  ],
                }),
              ],
            });
          },
          It = {
            "Evaluaci\xf3n": "evaluacion",
            "Trabajo Pr\xe1ctico": "tp",
            "Trabajo Te\xf3rico": "tt",
            Actitudinal: "actitudinal",
          },
          zt = {
            evaluacion: "Evaluaci\xf3n",
            tp: "Trabajo Pr\xe1ctico",
            tt: "Trabajo Te\xf3rico",
            actitudinal: "Actitudinal",
          },
          _t = [
            "Todas",
            "Evaluaci\xf3n",
            "Trabajo Pr\xe1ctico",
            "Trabajo Te\xf3rico",
            "Actitudinal",
          ];
        function At({ onFiltrar: e }) {
          const { tareas: t, aulas: a } = J(),
            { width: r } = (0, k.default)(),
            n = r < 600,
            [o, i] = (0, l.useState)(""),
            [s, d] = (0, l.useState)("Todas"),
            [c, u] = (0, l.useState)(null),
            [f, m] = (0, l.useState)(!1),
            [h, g] = (0, l.useState)(!1);
          return (
            (0, l.useEffect)(() => {
              if (!t) return void e([]);
              const a = t.filter((e) => {
                const t = "Todas" === s || e.tipo === It[s],
                  a = e.titulo.toLowerCase().includes(o.toLowerCase()),
                  r = null === c || e.aula_id === c;
                return t && a && r;
              });
              e(a);
            }, [o, s, c, t]),
            (0, w.jsxs)(E.default, {
              style: [
                Mt.filters,
                {
                  flexDirection: n ? "column" : "row",
                  alignItems: n ? "stretch" : "center",
                  gap: n ? 12 : 16,
                },
              ],
              children: [
                (0, w.jsx)(Ce.default, {
                  mode: "outlined",
                  placeholder: "Buscar tareas...",
                  value: o,
                  onChangeText: i,
                  style: [
                    Mt.searchInput,
                    { minWidth: n ? "100%" : 220, height: 40 },
                  ],
                  right: (0, w.jsx)(Ce.default.Icon, {
                    icon: ({ color: e, size: t }) =>
                      (0, w.jsx)(Pt.default, {
                        name: "search",
                        size: t,
                        color: e,
                      }),
                  }),
                }),
                (0, w.jsxs)(E.default, {
                  style: {
                    flexDirection: "row",
                    gap: n ? 8 : 12,
                    flex: n ? void 0 : 1,
                    width: n ? "100%" : void 0,
                    justifyContent: n ? "flex-start" : "flex-end",
                  },
                  children: [
                    (0, w.jsx)(Qe.default, {
                      visible: f,
                      onDismiss: () => m(!1),
                      anchor: (0, w.jsx)(Z.default, {
                        mode: "outlined",
                        onPress: () => m(!0),
                        icon: ({ color: e, size: t }) =>
                          (0, w.jsx)(Pt.default, {
                            name: "filter",
                            size: t,
                            color: e,
                          }),
                        style: { minWidth: 120 },
                        children: s,
                      }),
                      children: _t.map((e) =>
                        (0, w.jsx)(
                          Qe.default.Item,
                          {
                            onPress: () => {
                              d(e), m(!1);
                            },
                            title: e,
                          },
                          e
                        )
                      ),
                    }),
                    (0, w.jsxs)(Qe.default, {
                      visible: h,
                      onDismiss: () => g(!1),
                      anchor: (0, w.jsx)(Z.default, {
                        mode: "outlined",
                        onPress: () => g(!0),
                        icon: ({ color: e, size: t }) =>
                          (0, w.jsx)(Pt.default, {
                            name: "school-outline",
                            size: t,
                            color: e,
                          }),
                        style: { minWidth: 140 },
                        children: c
                          ? a.find((e) => e.id === c)?.nombre
                          : "Todas las aulas",
                      }),
                      children: [
                        (0, w.jsx)(Qe.default.Item, {
                          onPress: () => {
                            u(null), g(!1);
                          },
                          title: "Todas las aulas",
                        }),
                        a.map((e) =>
                          (0, w.jsx)(
                            Qe.default.Item,
                            {
                              onPress: () => {
                                u(e.id), g(!1);
                              },
                              title: e.nombre,
                            },
                            e.id
                          )
                        ),
                      ],
                    }),
                  ],
                }),
              ],
            })
          );
        }
        const Mt = T.default.create({
          filters: { marginBottom: 12 },
          searchInput: { flex: 1 },
        });
        var Rt = a(8708);
        const Wt = {
            "Evaluaci\xf3n": "#f55555ff",
            "Trabajo Pr\xe1ctico": "#93C5FD",
            "Trabajo Te\xf3rico": "#FCD34D",
            Actitudinal: "#C4B5FD",
          },
          Ot = { Completada: "#029134ff", Pendiente: "#fda520ff" },
          Lt = ({
            tipo: e,
            estado: t,
            titulo: a,
            descripcion: r,
            fechaVencimiento: n,
            calificacionRecibida: o,
            nombreAula: i,
          }) => {
            const l = (0, _.useTheme)();
            return (0, w.jsxs)(te.default, {
              style: $t.card,
              mode: "outlined",
              children: [
                (0, w.jsx)(te.default.Content, {
                  children: (0, w.jsxs)(E.default, {
                    style: $t.header,
                    children: [
                      (0, w.jsx)(ae.default, {
                        name: "checkmark-circle-outline",
                        size: 24,
                        color: l.colors.onSurfaceVariant,
                      }),
                      (0, w.jsxs)(E.default, {
                        style: $t.badgesContainer,
                        children: [
                          (0, w.jsx)(Rt.default, {
                            style: [
                              $t.badge,
                              { backgroundColor: Wt[zt[e]] ?? "#E5E7EB" },
                            ],
                            size: 24,
                            children: zt[e],
                          }),
                          (0, w.jsx)(Rt.default, {
                            style: [
                              $t.badge,
                              { backgroundColor: Ot[t] ?? "#E5E7EB" },
                            ],
                            size: 24,
                            children: t,
                          }),
                        ],
                      }),
                    ],
                  }),
                }),
                (0, w.jsx)(te.default.Content, {
                  children: (0, w.jsxs)(E.default, {
                    style: { flex: 1, flexDirection: "row" },
                    children: [
                      (0, w.jsxs)(E.default, {
                        style: { flex: 0.8 },
                        children: [
                          (0, w.jsx)(Y.default, {
                            variant: "titleMedium",
                            style: $t.title,
                            children: a,
                          }),
                          (0, w.jsxs)(E.default, {
                            style: $t.aulaContainer,
                            children: [
                              (0, w.jsx)(ae.default, {
                                name: "school-outline",
                                size: 16,
                                color: l.colors.onSurfaceVariant,
                              }),
                              (0, w.jsx)(Y.default, {
                                variant: "bodySmall",
                                style: { marginLeft: 4 },
                                children: i,
                              }),
                            ],
                          }),
                          (0, w.jsx)(Y.default, {
                            variant: "bodyMedium",
                            numberOfLines: 2,
                            ellipsizeMode: "tail",
                            style: { color: l.colors.onSurfaceVariant },
                            children: r,
                          }),
                          (0, w.jsxs)(E.default, {
                            style: $t.fechaContainer,
                            children: [
                              (0, w.jsx)(ae.default, {
                                name: "calendar-outline",
                                size: 16,
                                color: l.colors.onSurfaceVariant,
                              }),
                              (0, w.jsxs)(Y.default, {
                                variant: "bodySmall",
                                style: { marginLeft: 4 },
                                children: ["Vence: ", n],
                              }),
                            ],
                          }),
                        ],
                      }),
                      o &&
                        (0, w.jsxs)(E.default, {
                          style: {
                            flex: 0.2,
                            justifyContent: "center",
                            alignContent: "center",
                          },
                          children: [
                            (0, w.jsx)(Y.default, {
                              variant: "titleSmall",
                              children: "Nota:",
                            }),
                            (0, w.jsx)(Y.default, {
                              variant: "headlineSmall",
                              style: {
                                fontWeight: "700",
                                color: o > 6 ? "green" : "red",
                              },
                              children: o,
                            }),
                          ],
                        }),
                    ],
                  }),
                }),
              ],
            });
          },
          $t = T.default.create({
            card: {
              flex: 1,
              maxWidth: 350,
              marginVertical: 8,
              borderRadius: 8,
            },
            header: {
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            },
            badgesContainer: { flexDirection: "row", gap: 8 },
            badge: {
              color: "#000",
              marginLeft: 8,
              fontSize: 12,
              paddingHorizontal: 6,
              paddingVertical: 2,
              fontWeight: "700",
            },
            title: { marginTop: 8, fontWeight: "700" },
            aulaContainer: {
              flexDirection: "row",
              alignItems: "center",
              marginTop: 4,
              marginBottom: 8,
            },
            fechaContainer: {
              flexDirection: "row",
              alignItems: "center",
              marginTop: 12,
              marginBottom: 8,
            },
            calificacionContainer: {
              flexDirection: "row",
              justifyContent: "space-between",
            },
          }),
          Nt = () => {
            const {
                loadTareas: e,
                tareas: t,
                tareasError: a,
                tareasLoading: r,
                aulas: n,
                notas: o,
                loadNotas: i,
              } = J(),
              [s, d] = (0, l.useState)([]);
            (0, l.useEffect)(() => {
              i();
            }, []);
            const { width: c } = (0, k.default)(),
              { colors: u } = (0, _.useTheme)(),
              f = c >= 768,
              m = f ? 2 : 1,
              h = s.map((e) => e.id),
              g = Object.values(o)
                .flat()
                .filter((e) => h.includes(e.tarea_id)),
              x = s.filter((e) =>
                g.some((t) => t.tarea_id == e.id && t.entregado)
              ),
              p = s.length,
              j = x.length,
              y = p > 0 ? (j / p) * 100 : 0,
              b = g.filter((e) => "number" === typeof e.nota),
              C =
                b.length > 0
                  ? parseFloat(
                      (b.reduce((e, t) => e + t.nota, 0) / b.length).toFixed(2)
                    )
                  : 0,
              v = new Date(),
              S = s.filter((e) => new Date(e.fecha_limite) > v);
            return (0, w.jsx)(E.default, {
              style: Vt.container,
              children: (0, w.jsxs)(Q, {
                isLoading: r,
                hasError: a,
                errorMessage: "Error al cargar tareas",
                reLoad: () => e(!0),
                children: [
                  (0, w.jsxs)(E.default, {
                    style: { flexDirection: "row", gap: 10 },
                    children: [
                      (0, w.jsx)(E.default, {
                        style: { flex: f ? 0.9 : 1 },
                        children: (0, w.jsx)(At, { onFiltrar: d }),
                      }),
                      (0, w.jsx)(E.default, {
                        style: {
                          flex: 0.1,
                          height: f ? 40 : 94,
                          justifyContent: "flex-start",
                          alignContent: "flex-end",
                        },
                        children: (0, w.jsx)(ee.default, {
                          icon: ({ size: e, color: t }) =>
                            (0, w.jsx)(Pt.default, {
                              name: "refresh",
                              size: e,
                              color: t,
                            }),
                          mode: "contained",
                          onPress: () => (i(!0), void e(!0)),
                          style: { padding: 0, margin: 0 },
                        }),
                      }),
                    ],
                  }),
                  (0, w.jsxs)(E.default, {
                    style: [
                      Vt.mainContent,
                      f
                        ? { flexDirection: "row", gap: 24 }
                        : { flexDirection: "column-reverse" },
                    ],
                    children: [
                      (0, w.jsx)(E.default, {
                        style: { flex: 2 },
                        children:
                          0 === s.length
                            ? (0, w.jsxs)(E.default, {
                                style: Vt.empty,
                                children: [
                                  (0, w.jsx)(Pt.default, {
                                    name: "document-text-outline",
                                    size: 48,
                                    color: u.onSurfaceDisabled,
                                    style: { marginBottom: 12 },
                                  }),
                                  (0, w.jsx)(Y.default, {
                                    variant: "titleMedium",
                                    children: "No se encontraron tareas",
                                  }),
                                  (0, w.jsx)(Y.default, {
                                    variant: "bodySmall",
                                    style: { color: u.outline },
                                    children:
                                      "Intenta cambiar el filtro o la b\xfasqueda",
                                  }),
                                ],
                              })
                            : (0, w.jsx)(
                                ot.default,
                                {
                                  data: s,
                                  numColumns: m,
                                  keyExtractor: (e) =>
                                    e.id?.toString() ?? `tarea-${e.titulo}`,
                                  columnWrapperStyle: m > 1 ? Vt.row : void 0,
                                  renderItem: ({ item: e }) => {
                                    const t = o[e.aula_id]?.find(
                                      (t) => t.tarea_id === e.id
                                    );
                                    return (0, w.jsx)(
                                      Lt,
                                      {
                                        descripcion:
                                          e.descripcion ?? "sin descripci\xf3n",
                                        fechaVencimiento:
                                          e.fecha_limite ?? "sin l\xedmite",
                                        tipo: e.tipo ?? "sin tipo",
                                        titulo: e.titulo,
                                        estado: t?.entregado
                                          ? "Completado"
                                          : "Pendiente",
                                        calificacionRecibida: t?.nota ?? void 0,
                                        nombreAula:
                                          n.find((t) => t.id === e.aula_id)
                                            ?.nombre ?? "-",
                                      },
                                      e.id
                                    );
                                  },
                                  contentContainerStyle: { paddingBottom: 24 },
                                },
                                m
                              ),
                      }),
                      (0, w.jsxs)(E.default, {
                        style: [
                          Vt.resumenContainer,
                          f && {
                            flex: 0.7,
                            flexWrap: "nowrap",
                            alignItems: "center",
                            flexDirection: "column",
                          },
                        ],
                        children: [
                          (0, w.jsx)(Bt, {
                            titulo: "Entregadas",
                            valor: `${j}/${p}`,
                            progreso: y,
                            isLarge: f,
                          }),
                          (0, w.jsx)(Bt, {
                            titulo: "Promedio",
                            valor: `${C}`,
                            subtitulo: f ? "En base a tareas completadas" : "",
                            isLarge: f,
                          }),
                          (0, w.jsx)(Bt, {
                            titulo: "Pr\xf3ximas",
                            valor: `${S.length.toString()}`,
                            subtitulo: f ? "Vencimientos cercanos" : "",
                            isLarge: f,
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            });
          },
          Vt = T.default.create({
            container: {
              flex: 1,
              maxWidth: 1e3,
              alignSelf: "center",
              width: "100%",
              paddingHorizontal: 5,
            },
            topBar: {
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 12,
              marginBottom: 5,
            },
            mainContent: { flex: 1 },
            resumenContainer: {
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-around",
              gap: 10,
              marginBottom: 10,
            },
            empty: {
              alignItems: "center",
              justifyContent: "center",
              padding: 32,
            },
            row: { justifyContent: "flex-start", gap: 16, flexWrap: "wrap" },
          });
        var Ft = a(1578);
        const Ht = ({
            titulo: e,
            tipo: t,
            entregados: a,
            descripcion: r,
            fechaEntrega: n,
            cantidadAlumnos: o,
            nombreAula: i,
            onEditar: l,
            onEliminar: s,
            onCalificar: d,
          }) => {
            const c = (0, _.useTheme)(),
              u = o > 0 ? a / o : 0;
            return (0, w.jsx)(te.default, {
              mode: "elevated",
              style: Gt.card,
              children: (0, w.jsxs)(te.default.Content, {
                style: {
                  paddingBottom: 4,
                  flex: 1,
                  justifyContent: "space-between",
                },
                children: [
                  (0, w.jsx)(E.default, {
                    style: Gt.header,
                    children: (0, w.jsxs)(E.default, {
                      style: { flex: 1 },
                      children: [
                        (0, w.jsxs)(E.default, {
                          style: Gt.titleRow,
                          children: [
                            (0, w.jsx)(Y.default, {
                              variant: "titleMedium",
                              style: Gt.title,
                              children: e,
                            }),
                            (0, w.jsx)(Pt.default, {
                              name: "time-outline",
                              size: 18,
                              color: c.colors.primary,
                            }),
                          ],
                        }),
                        (0, w.jsxs)(E.default, {
                          style: Gt.badgesRow,
                          children: [
                            (0, w.jsx)(Rt.default, {
                              style: Gt.badgeTipo,
                              children: {
                                tp: "Trabajo Pr\xe1ctico",
                                tt: "Trabajo Te\xf3rico",
                                evaluacion: "Evaluaci\xf3n",
                                actitudinal: "Actitudinal",
                              }[t],
                            }),
                            (0, w.jsx)(Rt.default, {
                              style: Gt.badgeEntregas,
                              children: `${a}/${o} entregadas`,
                            }),
                          ],
                        }),
                      ],
                    }),
                  }),
                  (0, w.jsx)(Y.default, {
                    variant: "bodySmall",
                    style: Gt.descripcion,
                    children: r,
                  }),
                  (0, w.jsxs)(E.default, {
                    style: Gt.infoItem,
                    children: [
                      (0, w.jsx)(Pt.default, {
                        name: "book-outline",
                        size: 14,
                        color: c.colors.outline,
                      }),
                      (0, w.jsx)(Y.default, {
                        style: Gt.infoText,
                        children: i,
                      }),
                    ],
                  }),
                  (0, w.jsxs)(E.default, {
                    style: Gt.progreso,
                    children: [
                      (0, w.jsxs)(E.default, {
                        style: Gt.progresoRow,
                        children: [
                          (0, w.jsx)(Y.default, {
                            style: Gt.label,
                            children: "Progreso de entrega",
                          }),
                          (0, w.jsxs)(Y.default, {
                            style: Gt.label,
                            children: [Math.round(100 * u), "%"],
                          }),
                        ],
                      }),
                      (0, w.jsx)(wt.default, {
                        progress: u,
                        color: c.colors.primary,
                        style: Gt.progressBar,
                      }),
                    ],
                  }),
                  (0, w.jsxs)(E.default, {
                    style: Gt.extraInfo,
                    children: [
                      (0, w.jsxs)(E.default, {
                        style: Gt.infoItem,
                        children: [
                          (0, w.jsx)(Pt.default, {
                            name: "calendar-outline",
                            size: 14,
                            color: c.colors.outline,
                          }),
                          (0, w.jsxs)(Y.default, {
                            style: Gt.infoText,
                            children: ["Vence: ", n],
                          }),
                        ],
                      }),
                      (0, w.jsxs)(E.default, {
                        style: Gt.infoItem,
                        children: [
                          (0, w.jsx)(Pt.default, {
                            name: "people-outline",
                            size: 14,
                            color: c.colors.outline,
                          }),
                          (0, w.jsxs)(Y.default, {
                            style: Gt.infoText,
                            children: [o, " Estudiantes"],
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, w.jsxs)(E.default, {
                    style: Gt.buttonRow,
                    children: [
                      (0, w.jsx)(ee.default, {
                        mode: "contained-tonal",
                        containerColor: "#eca469",
                        iconColor: "#2563EB",
                        style: { marginHorizontal: 2, borderRadius: 8 },
                        onPress: l,
                        icon: ({ size: e, color: t }) =>
                          (0, w.jsx)(Pt.default, {
                            name: "pencil-outline",
                            size: e,
                            color: t,
                          }),
                        accessibilityLabel: "Editar tarea",
                      }),
                      (0, w.jsx)(ee.default, {
                        mode: "contained-tonal",
                        containerColor: "#FEE2E2",
                        iconColor: "#B91C1C",
                        style: { marginHorizontal: 2, borderRadius: 8 },
                        onPress: s,
                        icon: ({ size: e, color: t }) =>
                          (0, w.jsx)(Pt.default, {
                            name: "trash-outline",
                            size: e,
                            color: t,
                          }),
                        accessibilityLabel: "Eliminar tarea",
                      }),
                      (0, w.jsx)(Z.default, {
                        mode: "contained",
                        style: {
                          borderRadius: 8,
                          marginLeft: 8,
                          height: 40,
                          justifyContent: "center",
                          paddingVertical: 0,
                        },
                        contentStyle: {
                          flexDirection: "row-reverse",
                          paddingVertical: 0,
                          height: 40,
                        },
                        labelStyle: { fontSize: 14 },
                        onPress: d,
                        icon: ({ size: e, color: t }) =>
                          (0, w.jsx)(Pt.default, {
                            name: "create-outline",
                            size: e,
                            color: t,
                          }),
                        accessibilityLabel: "Calificar tarea",
                        children: "Calificar",
                      }),
                    ],
                  }),
                ],
              }),
            });
          },
          Gt = T.default.create({
            card: {
              maxWidth: 360,
              borderRadius: 12,
              marginBottom: 16,
              padding: 2,
            },
            header: { marginBottom: 8 },
            titleRow: {
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
              marginBottom: 4,
            },
            title: { fontWeight: "bold" },
            badgesRow: { flexDirection: "row", gap: 8, marginBottom: 8 },
            badgeTipo: { backgroundColor: "#FEE2E2", color: "#B91C1C" },
            badgeEntregas: { backgroundColor: "#E0E7FF", color: "#3730A3" },
            descripcion: { marginBottom: 12 },
            progreso: { marginBottom: 12 },
            progresoRow: {
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 10,
            },
            progressBar: { height: 6, borderRadius: 4 },
            extraInfo: {
              flexDirection: "row",
              gap: 16,
              marginBottom: 12,
              flexWrap: "wrap",
            },
            infoItem: { flexDirection: "row", alignItems: "center", gap: 4 },
            infoText: { fontSize: 12 },
            label: { fontSize: 12 },
            buttonRow: {
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 3,
              alignItems: "center",
            },
          });
        var Jt = a(561);
        const qt = ({
            label: e = "Fecha",
            value: t,
            onChange: a,
            placeholder: r = "DD/MM/YYYY",
          }) => {
            const [n, o] = (0, l.useState)(!1);
            return (0, w.jsxs)(w.Fragment, {
              children: [
                (0, w.jsx)(Ce.default, {
                  label: e,
                  placeholder: r,
                  value: t,
                  onChangeText: (e) => {
                    const t = ((e) => {
                      const t = e.replace(/\D/g, "");
                      return t.length <= 2
                        ? t
                        : t.length <= 4
                        ? `${t.slice(0, 2)}/${t.slice(2)}`
                        : `${t.slice(0, 2)}/${t.slice(2, 4)}/${t.slice(4, 8)}`;
                    })(e);
                    ((e) => {
                      o(!("" === e || /^\d{2}\/\d{2}\/\d{4}$/.test(e)));
                    })(t),
                      a(t);
                  },
                  error: n,
                  mode: "outlined",
                  keyboardType: "numeric",
                  style: { marginVertical: 8 },
                  maxLength: 10,
                }),
                n &&
                  (0, w.jsx)(Xe.default, {
                    type: "error",
                    visible: n,
                    children: "Formato inv\xe1lido. Usa DD/MM/YYYY",
                  }),
              ],
            });
          },
          Yt = T.default.create({
            container: { paddingVertical: 6, paddingHorizontal: 4 },
            row: { flexDirection: "row", alignItems: "center", gap: 12 },
            label: { fontSize: 16 },
          }),
          Ut = ({ label: e, status: t, onPress: a }) => {
            const { colors: r } = (0, _.useTheme)();
            return (0, w.jsx)(Jt.default, {
              onPress: a,
              style: Yt.container,
              children: (0, w.jsxs)(E.default, {
                style: Yt.row,
                children: [
                  (0, w.jsx)(Pt.default, {
                    name:
                      "checked" === t ? "checkbox-outline" : "square-outline",
                    size: 24,
                    color: "checked" === t ? r.primary : r.secondary,
                  }),
                  (0, w.jsx)(Y.default, { style: Yt.label, children: e }),
                ],
              }),
            });
          },
          Kt = [
            "Evaluaci\xf3n",
            "Trabajo Pr\xe1ctico",
            "Trabajo Te\xf3rico",
            "Actitudinal",
          ],
          Zt = ({
            visible: e,
            onDismiss: t,
            onGuardar: a,
            tareaInicial: r,
          }) => {
            const { aulas: n, alumnosMap: o } = J(),
              { width: i } = (0, k.default)(),
              { colors: s } = (0, _.useTheme)(),
              { user: d } = S(),
              [c, u] = (0, l.useState)(""),
              [f, m] = (0, l.useState)(""),
              [h, g] = (0, l.useState)(null),
              [x, p] = (0, l.useState)(!1),
              [j, y] = (0, l.useState)(null),
              [b, C] = (0, l.useState)(!1),
              [v, T] = (0, l.useState)(),
              [B, I] = (0, l.useState)(!0),
              [z, A] = (0, l.useState)([]),
              [M, R] = (0, l.useState)(!1),
              W = (0, l.useMemo)(() => {
                const e = n.find((e) => e.id === h);
                return e ? e.alumnoIds.map((e) => o[e]).filter(Boolean) : [];
              }, [h, n, o]),
              O = () => {
                u(""), m(""), y(null), g(null), T(void 0), I(!0), A([]);
              },
              L = () => {
                O(), t();
              };
            (0, l.useEffect)(() => {
              e &&
                (async () => {
                  if (r) {
                    u(r.titulo),
                      m(r.descripcion),
                      y(null != r.tipo ? zt[r.tipo] : null),
                      g(r.aula_id),
                      T(N(r.fecha_limite));
                    try {
                      const e = (await F(r.id)).map((e) => e.alumno_id);
                      A(e);
                      const t = n.find((e) => e.id === r.aula_id);
                      if (t) {
                        const a = t.alumnoIds ?? [];
                        I(
                          e.length > 0 &&
                            a.length === e.length &&
                            a.every((t) => e.includes(t))
                        );
                      } else I(!1);
                    } catch (e) {
                      console.error("Error cargando notas de tarea", e);
                    }
                  } else O();
                })();
            }, [e, r]);
            return (0, w.jsx)(qe.default, {
              children: (0, w.jsx)(Ue.default, {
                visible: e,
                onDismiss: L,
                contentContainerStyle: {
                  backgroundColor: s.surface,
                  padding: 16,
                  margin: 10,
                  borderRadius: 12,
                  width: "90%",
                  maxWidth: 600,
                  maxHeight: "95%",
                  alignSelf: "center",
                },
                children: (0, w.jsx)(D.default, {
                  behavior: void 0,
                  style: { flex: 1 },
                  children: (0, w.jsxs)(P.default, {
                    contentContainerStyle: { paddingBottom: 24 },
                    keyboardShouldPersistTaps: "handled",
                    showsVerticalScrollIndicator: !1,
                    children: [
                      (0, w.jsxs)(E.default, {
                        style: {
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: 16,
                        },
                        children: [
                          (0, w.jsx)(Y.default, {
                            variant: "titleLarge",
                            children: r ? "Editar Tarea" : "Crear Tarea",
                          }),
                          (0, w.jsx)(Qe.default, {
                            visible: x,
                            onDismiss: () => p(!1),
                            anchor: (0, w.jsx)(Z.default, {
                              compact: !0,
                              mode: "text",
                              icon: ({ size: e, color: t }) =>
                                (0, w.jsx)(Pt.default, {
                                  name: "book-outline",
                                  size: e,
                                  color: t,
                                }),
                              onPress: () => p(!0),
                              contentStyle: { flexDirection: "row-reverse" },
                              children:
                                n.find((e) => e.id === h)?.nombre ??
                                "Seleccionar Aula",
                            }),
                            children: n.map((e) =>
                              (0, w.jsx)(
                                Qe.default.Item,
                                {
                                  onPress: () => {
                                    g(e.id), p(!1), B && A(e.alumnoIds ?? []);
                                  },
                                  title: e.nombre,
                                },
                                e.id
                              )
                            ),
                          }),
                        ],
                      }),
                      (0, w.jsx)(Ce.default, {
                        label: "T\xedtulo",
                        mode: "outlined",
                        value: c,
                        onChangeText: u,
                        style: { marginBottom: 12 },
                        returnKeyType: "next",
                      }),
                      (0, w.jsx)(Ce.default, {
                        label: "Descripci\xf3n",
                        mode: "outlined",
                        value: f,
                        onChangeText: m,
                        multiline: !0,
                        numberOfLines: 3,
                        style: { marginBottom: 12 },
                      }),
                      (0, w.jsx)(Qe.default, {
                        visible: b,
                        onDismiss: () => C(!1),
                        mode: "elevated",
                        anchor: (0, w.jsx)(Z.default, {
                          mode: "outlined",
                          onPress: () => C(!0),
                          icon: ({ size: e, color: t }) =>
                            (0, w.jsx)(Pt.default, {
                              name: "layers-outline",
                              size: e,
                              color: t,
                            }),
                          style: { marginBottom: 12 },
                          contentStyle: { flexDirection: "row-reverse" },
                          children: j || "Seleccionar tipo",
                        }),
                        children: Kt.map((e) =>
                          (0, w.jsx)(
                            Qe.default.Item,
                            {
                              onPress: () => {
                                y(e), C(!1);
                              },
                              title: e,
                            },
                            e
                          )
                        ),
                      }),
                      (0, w.jsx)(qt, {
                        label: "Fecha l\xedmite",
                        value: v || "",
                        onChange: T,
                        placeholder: "DD/MM/YYYY",
                      }),
                      h &&
                        (0, w.jsxs)(w.Fragment, {
                          children: [
                            (0, w.jsxs)(E.default, {
                              style: {
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                              },
                              children: [
                                (0, w.jsx)(Ut, {
                                  label: "Asignar a todos los alumnos",
                                  status: B ? "checked" : "unchecked",
                                  onPress: () => {
                                    const e = !B;
                                    if ((I(e), e)) {
                                      const e = n.find((e) => e.id === h);
                                      A(e ? e.alumnoIds ?? [] : []), R(!1);
                                    } else A([]), R(!0);
                                  },
                                }),
                                !B &&
                                  (0, w.jsx)(Jt.default, {
                                    onPress: () => R(!M),
                                    style: { padding: 8 },
                                    children: (0, w.jsx)(Pt.default, {
                                      name: M
                                        ? "chevron-up-outline"
                                        : "chevron-down-outline",
                                      size: 24,
                                      color: s.primary,
                                    }),
                                  }),
                              ],
                            }),
                            !B &&
                              M &&
                              (0, w.jsx)(E.default, {
                                style: {
                                  borderWidth: 1,
                                  borderColor: "#e0e0e0",
                                  borderRadius: 8,
                                  marginBottom: 12,
                                  maxHeight: 250,
                                  paddingVertical: 4,
                                },
                                children: (0, w.jsx)(P.default, {
                                  style: { maxHeight: 170 },
                                  contentContainerStyle: {
                                    paddingHorizontal: 8,
                                  },
                                  keyboardShouldPersistTaps: "handled",
                                  persistentScrollbar: !0,
                                  children: W.map((e) =>
                                    (0, w.jsx)(
                                      Ut,
                                      {
                                        label: `${e.nombre} ${e.apellido}`,
                                        status: z.includes(e.id)
                                          ? "checked"
                                          : "unchecked",
                                        onPress: () => {
                                          return (
                                            (t = e.id),
                                            void (z.includes(t)
                                              ? A(z.filter((e) => e !== t))
                                              : A([...z, t]))
                                          );
                                          var t;
                                        },
                                      },
                                      e.id
                                    )
                                  ),
                                }),
                              }),
                          ],
                        }),
                      (0, w.jsxs)(E.default, {
                        style: {
                          flexDirection: "row",
                          justifyContent: "flex-end",
                          marginTop: 16,
                          gap: 8,
                        },
                        children: [
                          (0, w.jsx)(Z.default, {
                            onPress: L,
                            children: "Cancelar",
                          }),
                          (0, w.jsx)(Z.default, {
                            mode: "contained",
                            onPress: () => {
                              if (null === h) return;
                              if (!d?.id) return;
                              const e = {
                                titulo: c,
                                descripcion: f,
                                tipo: It[j],
                                fecha_limite: $(v ?? ""),
                                fecha_creacion:
                                  ((n = new Date()),
                                  n.toISOString().split("T")[0]),
                                aula_id: h,
                                created_by: d.id,
                                asignados: z,
                              };
                              var n;
                              a(r?.id ? Object.assign({}, e, { id: r.id }) : e),
                                t(),
                                O();
                            },
                            disabled:
                              !c.trim() || !h || !j || (0 === z.length && !B),
                            children: "Guardar",
                          }),
                        ],
                      }),
                    ],
                  }),
                }),
              }),
            });
          };
        var Qt = a(7129),
          Xt = a(9866);
        const ea = ({ visible: e, onDismiss: t, tarea: a, onGuardar: r }) => {
            const { colors: n } = (0, _.useTheme)(),
              { alumnosMap: o } = J(),
              [i, s] = (0, l.useState)([]),
              d = i.some((e) => "" === e.nota.trim());
            (0, l.useEffect)(() => {
              (async () => {
                if (a?.id)
                  try {
                    const e = (await F(a.id)).map((e) => ({
                      id: e.alumno_id,
                      nombre: o[e.alumno_id]?.nombre ?? "Alumno",
                      apellido: o[e.alumno_id].apellido,
                      nota: e.nota ?? "",
                      entregado: e.entregado ?? !1,
                      nota_id: e.id,
                    }));
                    s(e);
                  } catch (e) {
                    console.error("Error al cargar notas", e);
                  }
              })();
            }, [a]);
            return (0, w.jsx)(qe.default, {
              children: (0, w.jsx)(Ue.default, {
                visible: e,
                onDismiss: t,
                contentContainerStyle: {
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                },
                children: (0, w.jsxs)(E.default, {
                  style: {
                    backgroundColor: n.surface,
                    width: "90%",
                    maxWidth: 500,
                    height: "90%",
                    borderRadius: 12,
                    overflow: "hidden",
                  },
                  children: [
                    (0, w.jsx)(D.default, {
                      behavior: "height",
                      style: { flex: 1 },
                      keyboardVerticalOffset: 90,
                      children: (0, w.jsx)(Qt.default, {
                        onPress: Xt.default.dismiss,
                        children: (0, w.jsxs)(P.default, {
                          keyboardShouldPersistTaps: "handled",
                          contentContainerStyle: { padding: 16, flexGrow: 1 },
                          showsVerticalScrollIndicator: !1,
                          children: [
                            (0, w.jsx)(Y.default, {
                              variant: "titleLarge",
                              style: { marginBottom: 8 },
                              children: "Calificar Tarea",
                            }),
                            (0, w.jsx)(Y.default, {
                              variant: "titleMedium",
                              children: a.titulo,
                            }),
                            (0, w.jsx)(Y.default, {
                              style: { marginBottom: 16 },
                              children: a.descripcion,
                            }),
                            (0, w.jsxs)(E.default, {
                              style: { marginTop: 16 },
                              children: [
                                (0, w.jsxs)(E.default, {
                                  style: {
                                    flexDirection: "row",
                                    paddingHorizontal: 5,
                                    marginBottom: 8,
                                  },
                                  children: [
                                    (0, w.jsx)(Y.default, {
                                      style: { flex: 1, fontWeight: "bold" },
                                      children: "Alumno",
                                    }),
                                    (0, w.jsx)(Y.default, {
                                      style: {
                                        width: 100,
                                        textAlign: "center",
                                        fontWeight: "bold",
                                      },
                                      children: "Entregado",
                                    }),
                                    (0, w.jsx)(Y.default, {
                                      style: {
                                        width: 80,
                                        textAlign: "center",
                                        fontWeight: "bold",
                                      },
                                      children: "Nota",
                                    }),
                                  ],
                                }),
                                i.map((e) =>
                                  (0, w.jsxs)(
                                    E.default,
                                    {
                                      style: {
                                        flexDirection: "row",
                                        alignItems: "center",
                                        paddingVertical: 6,
                                        paddingHorizontal: 5,
                                        borderBottomWidth: 0.5,
                                        borderColor: "#ddd",
                                      },
                                      children: [
                                        (0, w.jsx)(Y.default, {
                                          style: { flex: 1 },
                                          children: `${e.nombre} ${e.apellido}`,
                                        }),
                                        (0, w.jsx)(E.default, {
                                          style: {
                                            borderColor: n.primary,
                                            borderWidth: 0,
                                            borderRadius: "50%",
                                            marginRight: 40,
                                          },
                                          children: (0, w.jsx)(Ze.default, {
                                            value: e.id.toString(),
                                            status: e.entregado
                                              ? "checked"
                                              : "unchecked",
                                            onPress: () => {
                                              return (
                                                (t = e.id),
                                                void s((e) =>
                                                  e.map((e) =>
                                                    e.id === t
                                                      ? Object.assign({}, e, {
                                                          entregado:
                                                            !e.entregado,
                                                        })
                                                      : e
                                                  )
                                                )
                                              );
                                              var t;
                                            },
                                          }),
                                        }),
                                        (0, w.jsx)(Ce.default, {
                                          value: e.nota.toString(),
                                          onChangeText: (t) => {
                                            return (
                                              (a = e.id),
                                              (r = t),
                                              void s((e) =>
                                                e.map((e) =>
                                                  e.id === a
                                                    ? Object.assign({}, e, {
                                                        nota: r,
                                                      })
                                                    : e
                                                )
                                              )
                                            );
                                            var a, r;
                                          },
                                          mode: "outlined",
                                          keyboardType: "numeric",
                                          style: {
                                            width: 70,
                                            height: 40,
                                            textAlign: "center",
                                          },
                                        }),
                                      ],
                                    },
                                    e.id
                                  )
                                ),
                              ],
                            }),
                          ],
                        }),
                      }),
                    }),
                    (0, w.jsxs)(E.default, {
                      style: {
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        marginTop: 16,
                        gap: 8,
                        padding: 10,
                      },
                      children: [
                        (0, w.jsx)(Z.default, {
                          onPress: t,
                          children: "Cancelar",
                        }),
                        (0, w.jsx)(Z.default, {
                          mode: "contained",
                          onPress: async () => {
                            const e = {
                              tarea_id: a.id,
                              notas: i.map((e) => ({
                                alumno_id: e.id,
                                nota: e.nota,
                                entregado: e.entregado,
                              })),
                            };
                            r(e), s([]), t();
                          },
                          disabled: d,
                          children: "Guardar",
                        }),
                      ],
                    }),
                  ],
                }),
              }),
            });
          },
          ta = () => {
            const {
                loadTareas: e,
                tareas: t,
                tareasError: a,
                tareasLoading: r,
                aulas: n,
              } = J(),
              [o, i] = (0, l.useState)(!1),
              [s, d] = (0, l.useState)(!1),
              [c, u] = (0, l.useState)(!1),
              [f, m] = (0, l.useState)(null),
              [h, g] = (0, l.useState)(null),
              [x, p] = (0, l.useState)(null),
              [j, y] = (0, l.useState)(!1),
              [b, C] = (0, l.useState)(""),
              [v, S] = (0, l.useState)([]),
              T = (0, _.useTheme)(),
              { width: P } = (0, k.default)(),
              D = P >= 1024 ? 3 : P >= 768 ? 2 : 1,
              B = P < 600;
            (0, l.useEffect)(() => {
              e();
            }, []);
            return (0, w.jsxs)(E.default, {
              style: aa.container,
              children: [
                (0, w.jsx)(Ye.default, {
                  visible: c && "" !== b,
                  duration: 1e3,
                  onDismiss: () => {
                    u(!1), C("");
                  },
                  action: { label: "Dale", onPress: () => u(!1) },
                  children: b,
                }),
                (0, w.jsxs)(Q, {
                  isLoading: r,
                  hasError: a,
                  errorMessage: "Error al cargar tareas",
                  reLoad: () => e(!0),
                  children: [
                    (0, w.jsxs)(E.default, {
                      style: { flex: 1 },
                      children: [
                        (0, w.jsxs)(E.default, {
                          style: [aa.header],
                          children: [
                            (0, w.jsxs)(E.default, {
                              style: { flex: 1 },
                              children: [
                                (0, w.jsx)(Y.default, {
                                  variant: "titleLarge",
                                  children: "Gesti\xf3n de Tareas",
                                }),
                                (0, w.jsx)(Y.default, {
                                  variant: "bodyMedium",
                                  children: "Crear, gestionar y calificar",
                                }),
                              ],
                            }),
                            B
                              ? (0, w.jsx)(ee.default, {
                                  mode: "contained",
                                  onPress: () => i(!0),
                                  icon: ({ color: e, size: t }) =>
                                    (0, w.jsx)(Pt.default, {
                                      name: "add",
                                      size: t,
                                      color: e,
                                    }),
                                })
                              : (0, w.jsx)(Z.default, {
                                  mode: "contained",
                                  onPress: () => i(!0),
                                  icon: ({ color: e, size: t }) =>
                                    (0, w.jsx)(Pt.default, {
                                      name: "add",
                                      size: t,
                                      color: e,
                                    }),
                                  children: "Crear Tarea",
                                }),
                            (0, w.jsx)(ee.default, {
                              mode: "contained",
                              onPress: () => e(!0),
                              icon: ({ color: e, size: t }) =>
                                (0, w.jsx)(Pt.default, {
                                  name: "refresh",
                                  size: t,
                                  color: e,
                                }),
                            }),
                          ],
                        }),
                        (0, w.jsx)(At, { onFiltrar: S }),
                        0 === v.length
                          ? (0, w.jsxs)(E.default, {
                              style: aa.empty,
                              children: [
                                (0, w.jsx)(Pt.default, {
                                  name: "document-text-outline",
                                  size: 48,
                                  color: T.colors.onSurfaceDisabled,
                                  style: { marginBottom: 12 },
                                }),
                                (0, w.jsx)(Y.default, {
                                  variant: "titleMedium",
                                  children: "No se encontraron tareas",
                                }),
                                (0, w.jsx)(Y.default, {
                                  variant: "bodySmall",
                                  style: { color: T.colors.outline },
                                  children:
                                    "Intenta cambiar el filtro o la b\xfasqueda",
                                }),
                                (0, w.jsx)(Z.default, {
                                  mode: "contained",
                                  style: { marginTop: 16 },
                                  icon: ({ color: e, size: t }) =>
                                    (0, w.jsx)(Pt.default, {
                                      name: "add",
                                      size: t,
                                      color: e,
                                    }),
                                  onPress: () => i(!0),
                                  children: "Crear tu primera tarea",
                                }),
                              ],
                            })
                          : (0, w.jsx)(
                              ot.default,
                              {
                                data: v,
                                numColumns: D,
                                keyExtractor: (e, t) =>
                                  e.id?.toString() ?? `tarea-${t}`,
                                columnWrapperStyle: D > 1 ? aa.row : void 0,
                                renderItem: ({ item: e }) =>
                                  (0, w.jsx)(E.default, {
                                    style: aa.cardWrapper,
                                    children: (0, w.jsx)(
                                      Ht,
                                      {
                                        cantidadAlumnos:
                                          e.cantidad_alumnos ?? 0,
                                        descripcion:
                                          e.descripcion ?? "sis descripci\xf3n",
                                        entregados: e.entregados ?? 0,
                                        fechaEntrega:
                                          e.fecha_limite ?? "sin limite",
                                        tipo: e.tipo ?? "sin tipo",
                                        titulo: e.titulo,
                                        nombreAula: n.find(
                                          (t) => t.id === e.aula_id
                                        )?.nombre,
                                        onCalificar: () => (p(e), void d(!0)),
                                        onEliminar: () => (m(e), void y(!0)),
                                        onEditar: () => (g(e), void i(!0)),
                                      },
                                      e.id
                                    ),
                                  }),
                                contentContainerStyle: { paddingBottom: 24 },
                              },
                              D
                            ),
                      ],
                    }),
                    (0, w.jsx)(qe.default, {
                      children: (0, w.jsxs)(Ft.default, {
                        visible: j,
                        onDismiss: () => y(!1),
                        style: { borderRadius: 8 },
                        children: [
                          (0, w.jsx)(Ft.default.Title, {
                            children: "Confirmar eliminaci\xf3n",
                          }),
                          (0, w.jsx)(Ft.default.Content, {
                            children: (0, w.jsxs)(Y.default, {
                              variant: "bodyMedium",
                              children: [
                                '\xbfEst\xe1s seguro de que quer\xe9s eliminar la tarea "',
                                f?.titulo,
                                '"?',
                              ],
                            }),
                          }),
                          (0, w.jsxs)(Ft.default.Actions, {
                            children: [
                              (0, w.jsx)(Z.default, {
                                onPress: () => y(!1),
                                children: "Cancelar",
                              }),
                              (0, w.jsx)(Z.default, {
                                onPress: async () => {
                                  if (f)
                                    try {
                                      await (async (e) => {
                                        if (
                                          !(
                                            await W(`${R}/tareas/${e}`, {
                                              method: "DELETE",
                                            })
                                          ).ok
                                        )
                                          throw new Error(
                                            "Error al eliminar la tarea"
                                          );
                                      })(f.id),
                                        C("Tarea eliminada"),
                                        u(!0),
                                        e(!0);
                                    } catch {
                                      C("Error al eliminar"), u(!0);
                                    } finally {
                                      y(!1), m(null);
                                    }
                                },
                                textColor: "#B91C1C",
                                children: "Eliminar",
                              }),
                            ],
                          }),
                        ],
                      }),
                    }),
                    (0, w.jsx)(Zt, {
                      visible: o,
                      onDismiss: () => {
                        i(!1), g(null);
                      },
                      onGuardar: async (t) => {
                        try {
                          let a = t.id;
                          if (a) {
                            const e = {
                              titulo: t.titulo,
                              descripcion: t.descripcion,
                              tipo: t.tipo,
                              fecha_limite: t.fecha_limite,
                              aula_id: t.aula_id,
                            };
                            await (async function (e, t) {
                              try {
                                if (
                                  !(
                                    await W(`${R}/tareas/${e}`, {
                                      method: "PUT",
                                      body: JSON.stringify(t),
                                    })
                                  ).ok
                                )
                                  throw new Error("Error al actualizar tarea");
                              } catch (a) {
                                throw (
                                  (console.log("Error al actualizar tarea:", a),
                                  a)
                                );
                              }
                            })(a, e);
                            const r = (await F(a)).map((e) => e.alumno_id),
                              n = t.asignados.filter((e) => !r.includes(e)),
                              o = r.filter((e) => !t.asignados.includes(e));
                            n.length > 0 && (await V(a, n)),
                              o.length > 0 &&
                                (await (async function (e, t) {
                                  const a = await W(
                                    `${R}/notas/notas-tareas/eliminar`,
                                    {
                                      method: "POST",
                                      headers: {
                                        "Content-Type": "application/json",
                                      },
                                      body: JSON.stringify({
                                        tarea_id: e,
                                        alumno_ids: t,
                                      }),
                                    }
                                  );
                                  if (!a.ok)
                                    throw new Error("Error eliminando notas");
                                  return a.json();
                                })(a, o));
                          } else {
                            const e = await (async function (e) {
                              try {
                                const t = await W(`${R}/tareas`, {
                                  method: "POST",
                                  body: JSON.stringify(
                                    Object.assign({}, e, { asignados: void 0 })
                                  ),
                                });
                                if (!t.ok)
                                  throw new Error("Error al crear tarea");
                                return await t.json();
                              } catch (t) {
                                throw (
                                  (console.log("error al guardar tarea", t), t)
                                );
                              }
                            })(t);
                            (a = e.id),
                              Array.isArray(t.asignados) &&
                                t.asignados.length > 0 &&
                                (await V(a, t.asignados));
                          }
                          C("Tarea guardada correctamente."), u(!0), e(!0);
                        } catch (a) {
                          console.error(a), C("Error al guardar tarea"), u(!0);
                        }
                      },
                      tareaInicial: h,
                    }),
                    x &&
                      (0, w.jsx)(ea, {
                        visible: s,
                        onDismiss: () => (d(!1), void e(!0)),
                        tarea: x,
                        onGuardar: async (t) => {
                          try {
                            await (async function (e) {
                              if (
                                !(
                                  await W(`${R}/notas/tareas/notas/masiva`, {
                                    method: "PUT",
                                    headers: {
                                      "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify(e),
                                  })
                                ).ok
                              )
                                throw new Error(
                                  "Error al actualizar las notas"
                                );
                            })(t),
                              C("Notas actualizadas correctamente.");
                          } catch (a) {
                            console.error("Error al actualizar notas:", a),
                              C("Error al actualizar notas.");
                          } finally {
                            u(!0), e(!0);
                          }
                        },
                      }),
                  ],
                }),
              ],
            });
          },
          aa = T.default.create({
            container: {
              flex: 1,
              maxWidth: 1e3,
              alignSelf: "center",
              width: "100%",
              paddingHorizontal: 5,
            },
            row: {
              justifyContent: "space-between",
              gap: 20,
              flexWrap: "wrap",
              marginTop: 15,
            },
            header: {
              marginBottom: 16,
              flexDirection: "row",
              gap: 12,
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
            },
            filters: {
              flex: 1,
              flexDirection: "row",
              gap: 12,
              alignItems: "center",
              marginBottom: 20,
              flexWrap: "wrap",
            },
            searchInput: { flex: 1, borderRadius: 16, width: "100%" },
            card: { marginBottom: 30 },
            empty: {
              alignItems: "center",
              justifyContent: "center",
              padding: 32,
            },
            cardWrapper: { flex: 1, paddingHorizontal: 4, minWidth: 0 },
          }),
          ra = () => {
            const { user: e } = S(),
              { loadTareas: t } = J();
            return (
              (0, l.useEffect)(() => {
                t(!0);
              }, []),
              (0, w.jsx)(A, {
                children: e?.is_teacher
                  ? (0, w.jsx)(ta, {})
                  : (0, w.jsx)(Nt, {}),
              })
            );
          },
          na = (0, o.createNativeStackNavigator)(),
          oa = (0, i.createDrawerNavigator)();
        function ia() {
          const { colors: e } = (0, _.useTheme)(),
            { user: t } = S(),
            a = (0, l.useMemo)(() => t, [t]);
          return (0, w.jsxs)(oa.Navigator, {
            drawerContent: (e) => (0, w.jsx)(Ge, Object.assign({}, e)),
            screenOptions: ({ navigation: t }) => ({
              headerStyle: { backgroundColor: e.elevation.level2 },
              headerTintColor: e.primary,
              headerTitleStyle: { fontWeight: "bold" },
              headerRight: () =>
                (0, w.jsx)(E.default, {
                  style: { padding: 2 },
                  children: (0, w.jsx)(Pe.default, {
                    onPress: () => t.navigate("Perfil"),
                    style: {},
                    children: (0, w.jsx)(ze.default, {
                      label: _e(a?.nombre, a?.apellido),
                      size: 40,
                      style: {
                        backgroundColor: e.primary,
                        width: 40,
                        height: 40,
                        marginRight: 10,
                      },
                    }),
                  }),
                }),
            }),
            children: [
              (0, w.jsx)(oa.Screen, {
                name: "Home",
                component: de,
                options: { title: "adminAulas | Dashboard" },
              }),
              (0, w.jsx)(oa.Screen, {
                name: "MateriasStack",
                component: bt,
                options: { title: "adminAulas | Mis Materias" },
              }),
              (0, w.jsx)(oa.Screen, {
                name: "Perfil",
                component: ke,
                options: { title: "adminAulas | Mi Perfil" },
              }),
              (0, w.jsx)(oa.Screen, {
                name: "Alarcoin",
                component: st,
                options: { title: "adminAulas | Mis Alarcoin" },
              }),
              (0, w.jsx)(oa.Screen, {
                name: "Alumnos",
                component: Et,
                options: { title: "adminAulas | Mis Alumnos" },
              }),
              (0, w.jsx)(oa.Screen, {
                name: "Tareas",
                component: ra,
                options: { title: "adminAulas | Tareas" },
              }),
            ],
          });
        }
        const la = () => {
          const { user: e } = S(),
            { theme: t } = He(),
            a = t.dark
              ? Object.assign({}, n.DarkTheme, {
                  colors: Object.assign({}, n.DarkTheme.colors, t.colors),
                })
              : Object.assign({}, n.DefaultTheme, {
                  colors: Object.assign({}, n.DefaultTheme.colors, t.colors),
                });
          return (0, w.jsx)(n.NavigationContainer, {
            theme: a,
            children: (0, w.jsx)(na.Navigator, {
              children: e
                ? e.cambiarContrasena
                  ? (0, w.jsx)(na.Screen, {
                      name: "CambiarContra",
                      component: dt,
                      options: {
                        title: "adminAulas | Cambiar Contrase\xf1a",
                        headerShown: !1,
                      },
                    })
                  : (0, w.jsx)(na.Screen, {
                      name: "Main",
                      component: ia,
                      options: { headerShown: !1 },
                    })
                : (0, w.jsx)(na.Screen, {
                    name: "Login",
                    component: pe,
                    options: { headerShown: !1 },
                  }),
            }),
          });
        };
        function sa() {
          return (0, w.jsx)(v, {
            children: (0, w.jsx)(G, { children: (0, w.jsx)(la, {}) }),
          });
        }
        var da = a(4465),
          ca = a(9836),
          ua = a(1667),
          fa = a(2520),
          ma = a(2059),
          ha = a(535);
        const ga = ({ onFinish: e }) => {
            const { colors: t } = (0, _.useTheme)(),
              a = new ha.default.Value(0);
            return (
              (0, l.useEffect)(() => {
                ha.default
                  .timing(a, { toValue: 1, duration: 1e3, useNativeDriver: !0 })
                  .start(() => {
                    setTimeout(() => {
                      ha.default
                        .timing(a, {
                          toValue: 0.5,
                          duration: 500,
                          useNativeDriver: !0,
                        })
                        .start(() => {
                          e();
                        });
                    }, 1e3);
                  });
              }, []),
              (0, w.jsx)(ha.default.View, {
                style: [xa.container, { opacity: a }, { backgroundColor: re }],
                children: (0, w.jsx)(Y.default, {
                  variant: "titleLarge",
                  style: xa.title,
                  children: "AdminAulas \ud83d\ude80",
                }),
              })
            );
          },
          xa = T.default.create({
            container: {
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            },
            title: { fontSize: 32, fontWeight: "bold" },
          });
        function pa() {
          const { theme: e, isDarkMode: t } = He();
          return (0, w.jsxs)(da.default, {
            theme: e,
            children: [
              (0, w.jsx)(ca.StatusBar, { style: t ? "light" : "dark" }),
              (0, w.jsx)(sa, {}),
            ],
          });
        }
        ma.preventAutoHideAsync(),
          (0, r.default)(function () {
            const [e] = (0, ua.useFonts)(Object.assign({}, fa.default.font)),
              [t, a] = (0, l.useState)(!0),
              r = (0, l.useCallback)(async () => {}, [e]);
            return (
              (0, l.useEffect)(() => {
                e && r();
              }, [e]),
              e
                ? (0, w.jsx)(Fe, {
                    children: t
                      ? (0, w.jsx)(ga, {
                          onFinish: async () => {
                            a(!1), await ma.hideAsync();
                          },
                        })
                      : (0, w.jsx)(pa, {}),
                  })
                : null
            );
          });
      },
      2058: (e, t, a) => {
        e.exports = a.p + "static/media/errorImagen.a23f855f5c97c01c10ea.png";
      },
    },
    t = {};
  function a(r) {
    var n = t[r];
    if (void 0 !== n) return n.exports;
    var o = (t[r] = { exports: {} });
    return e[r].call(o.exports, o, o.exports, a), o.exports;
  }
  (a.m = e),
    (() => {
      var e = [];
      a.O = (t, r, n, o) => {
        if (!r) {
          var i = 1 / 0;
          for (c = 0; c < e.length; c++) {
            for (var [r, n, o] = e[c], l = !0, s = 0; s < r.length; s++)
              (!1 & o || i >= o) && Object.keys(a.O).every((e) => a.O[e](r[s]))
                ? r.splice(s--, 1)
                : ((l = !1), o < i && (i = o));
            if (l) {
              e.splice(c--, 1);
              var d = n();
              void 0 !== d && (t = d);
            }
          }
          return t;
        }
        o = o || 0;
        for (var c = e.length; c > 0 && e[c - 1][2] > o; c--) e[c] = e[c - 1];
        e[c] = [r, n, o];
      };
    })(),
    (a.n = (e) => {
      var t = e && e.__esModule ? () => e.default : () => e;
      return a.d(t, { a: t }), t;
    }),
    (a.d = (e, t) => {
      for (var r in t)
        a.o(t, r) &&
          !a.o(e, r) &&
          Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
    }),
    (a.g = (function () {
      if ("object" === typeof globalThis) return globalThis;
      try {
        return this || new Function("return this")();
      } catch (e) {
        if ("object" === typeof window) return window;
      }
    })()),
    (a.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
    (a.r = (e) => {
      "undefined" !== typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (a.p = "/"),
    (() => {
      var e = { 792: 0 };
      a.O.j = (t) => 0 === e[t];
      var t = (t, r) => {
          var n,
            o,
            [i, l, s] = r,
            d = 0;
          if (i.some((t) => 0 !== e[t])) {
            for (n in l) a.o(l, n) && (a.m[n] = l[n]);
            if (s) var c = s(a);
          }
          for (t && t(r); d < i.length; d++)
            (o = i[d]), a.o(e, o) && e[o] && e[o][0](), (e[o] = 0);
          return a.O(c);
        },
        r = (self.webpackChunkweb = self.webpackChunkweb || []);
      r.forEach(t.bind(null, 0)), (r.push = t.bind(null, r.push.bind(r)));
    })();
  var r = a.O(void 0, [614], () => a(9783));
  r = a.O(r);
})();
//# sourceMappingURL=main.a7a0741a.js.map
