namespace seven {
    export class CookieManager {

    public setCookie(name: any, value: string, expireHours: number) {
        try {
            localStorage.setItem(name, value);
        } catch (e) {
            var d = new Date();
            d.setTime(d.getTime() + (expireHours * 60 * 60 * 1000));
            var expires = "expires=" + d.toUTCString();
            document.cookie = name + "=" + value + "; " + expires;
        }

    }

    public getCookie(name: string) {
       try {
            return localStorage.getItem(name);
        }  catch (e) {

            name = name + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
        }
        return "";
    }
    public getCookieStartWithNeedle(name: string): JMBMap<string, string> {
        var allCookies = new JMBMap<string, string>();

        try {

            for (var info in window.localStorage) {
                if (info.indexOf(name) == 0) {
                    allCookies.put(info, this.getCookie(info));
                }
            }
        } catch (e) {
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    var index = c.indexOf("=");
                    var key = c.substring(0, index);
                    allCookies.put(key, c.substring(key.length + 1, c.length));
                }
            }
        }
        return allCookies;
    }
    public getCookieArrayStartWithNeedle(name: string): Array<string> {
        var allCookies = new Array<string>();

        try {

            for (var info in window.localStorage) {
                if (info.indexOf(name) == 0) {
                    allCookies.push(this.getCookie(info));
                }
            }
        } catch (e) {
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    var index = c.indexOf("=");
                    var key = c.substring(0, index);
                    allCookies.push(c.substring(key.length + 1, c.length));
                }
            }
        }
        return allCookies;
    }
    public deleteCookie(name: string) {
        try {
            localStorage.removeItem(name);
        } catch (e) {
            document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        }
    }

    public deleteAllCookiesWithNeedle(needle:string) {
        var cookies:JMBMap<string, string> = this.getCookieStartWithNeedle(needle);
        for(let cookie of cookies.keys()){
            this.deleteCookie(cookie);
        } 
    }
    public deleteAllCookies() {
        try {
            window.localStorage.clear();
        } catch (e) {
            document.cookie.split(";").forEach(function (c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
        }
    }
}

}