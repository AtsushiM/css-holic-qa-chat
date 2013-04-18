describe('Ajaxは', function() {
    var ajax;

    beforeEach(function() {
        // init
        ajax = window.C ? new C.Ajax() : new Global.Ajax();
    });
    afterEach(function() {
        // clear
        if (ajax.dispose) {
            ajax.dispose();
        }
    });

    it('dispose()でインスタンスを解放する', function() {
        ajax.dispose();
        expect(ajax).to.eql({});
    });
});
