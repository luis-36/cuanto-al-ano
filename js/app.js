/* Al Año — helpers */
(function () {
  function money(n, currency) {
    currency = currency || "MXN";
    try {
      return new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: currency,
        maximumFractionDigits: 0,
      }).format(Math.round(n));
    } catch (e) {
      return "$" + Math.round(n).toLocaleString("es-MX");
    }
  }

  function number(n) {
    return Math.round(n).toLocaleString("es-MX");
  }

  function hoursToText(h) {
    if (h < 24) return number(h) + " horas";
    var d = Math.floor(h / 24);
    var rem = Math.round(h % 24);
    if (rem === 0) return number(d) + " días";
    return number(d) + " días y " + rem + " h";
  }

  window.AlAno = {
    money: money,
    number: number,
    hoursToText: hoursToText,
    copyText: function (text, btn) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () {
          if (btn) {
            var old = btn.textContent;
            btn.textContent = "Copiado";
            setTimeout(function () {
              btn.textContent = old;
            }, 1800);
          }
        });
      } else {
        var ta = document.createElement("textarea");
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
        if (btn) {
          var o = btn.textContent;
          btn.textContent = "Copiado";
          setTimeout(function () {
            btn.textContent = o;
          }, 1800);
        }
      }
    },
  };
})();
