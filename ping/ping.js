module.exports = function (RED) {
    const axioscall = require('../libs/axioscall');

    function WebmonitorPing(n) {

        RED.nodes.createNode(this, n);

        this.uniqueID      = n.uniqueID;
        this.token         = n.token;
        this.webMonitorURL = n.webMonitorURL;

        this.status({});

        /**
         * Shows a status visual on the node
         * @param  {[string]} colour [colour of status (green, yellow, red)]
         * @param  {[string]} shape [shape of symbol]
         * @param  {[text]} text [text to show]
         */
        this.showstatus = (colour, shape, text) => {
            this.status({ fill: colour, shape: shape, text: text });
        };

        /**
         * Outputs success
         * @param  {[string]} msg [success message]
         */
        this.showsuccess = (msg, payload) => {
            msg.payload = payload;
            this.send([msg, null]);
        };

        /**
         * Logs an error message
         * @param  {[string]} msg [error message]
         */
        this.showerror = (msg, payload) => {
            msg.payload = payload;
            this.send([null, msg]);
        };

        /**
         * Shows a status visual on the node
         * @param  {[string]} colour [colour of status (green, yellow, red)]
         * @param  {[string]} shape [shape of symbol]
         * @param  {[text]} text [text to show]
         */
        this.showstatus = (colour, shape, text) => {
            this.status({ fill: colour, shape: shape, text: text });
        };


        this.on('input', (msg) => {
            let payload = {
                id: this.uniqueID,
                token: this.token
            }

            if (payload && payload.id && payload.token) {

                this.showstatus("yellow", "dot", "Pinging web monitor");
                let url = msg.webMonitorURL ? msg.webMonitorURL : this.webMonitorURL;

                if (url === undefined || url === "") url = 'https://wm.airship.co.uk/wm';

                let res = axioscall.call(url, payload);
                res.then((res) => {
                    this.showstatus("green", "dot", "Success");
                    this.showsuccess(msg, res);
                }).catch((err) => {
                    this.showstatus("red", "dot", "Error");
                    this.showerror(msg, err);
                });
            }
            else {
                this.showerror(msg, "UniqueID and Token are mandatory.");
            }

        });

    }
    RED.nodes.registerType("Webmonitor Ping", WebmonitorPing);
};
