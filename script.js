const app = Vue.createApp({
    data() {
        return {
            disp: 0,
            float: 0,
            op: "",
            number: 0,
            neg: false,
            light: false
        }
    },
    methods: {
        trim() { this.disp = parseFloat(this.disp.toFixed(7)); },
        clear() {
            this.disp = 0;
            this.number = 0;
            this.float = 0;
            this.op = "";
            this.neg = false;
            console.log("clear");
            event.target.blur();
        },
        back() {
            if (this.float != 0) {
                this.float = this.float * 100;
                this.disp = (this.disp - (this.disp % this.float));
            } else { this.disp = (this.disp - (this.disp % 10)) / 10; }
            this.trim();
            event.target.blur();
        },
        root() {
            this.disp = Math.sqrt(this.disp);
            this.trim();
        },
        write(num) {
            if (this.neg == true) { num = -1 * num; }
            if (this.float == 0) { this.disp = (this.disp * 10) + num; }
            else {
                this.disp = this.disp + (num * this.float);
                this.float = this.float / 10;
            }
            event.target.blur();
        },
        point() {
            if (this.float == 0) {
                this.disp = this.disp * 1.00;
                this.float = 0.1;
            }
            event.target.blur();
        },
        setOp(op) {
            if (this.disp == 0 && this.op == "-") { this.neg = true; }
            else {
                this.number = this.disp;
                this.disp = 0;
                this.op = op;
                this.float = 0;
                this.neg = false;
            }
            event.target.blur();
        },
        calc() {
            switch (this.op) {
                case "/": this.disp = this.number / this.disp; break;
                case "*": this.disp = this.number * this.disp; break;
                case "-": this.disp = this.number - this.disp; break;
                case "+": this.disp = this.number + this.disp; break;
                default: this.disp = this.disp; break;
            }
            this.trim();
        },
        theme() { this.light = !this.light ? true : false; 
            event.target.blur();
            console.log(`motyw`);
        },
        keyInput(event) {
            console.log(`${event.key}`)
            if (!isNaN(event.key)) { this.write(parseInt(event.key)); return;}
            else {
                if (".,".includes(event.key)) { this.point(); return; }
                if ("/*-+".includes(event.key)) { this.setOp(event.key); return; }
                if (["=", "Enter"].includes(event.key)) { this.calc(); return; }
                if (event.key === "Backspace") { this.back(); return; }
                if (event.key === "Delete") { this.clear(); return; }
            }
        }
    },
    mounted() { window.addEventListener('keydown', this.keyInput); },
    beforeUnmount() { window.removeEventListener('keydown', this.keyInput); }
})
app.mount('#appCont')