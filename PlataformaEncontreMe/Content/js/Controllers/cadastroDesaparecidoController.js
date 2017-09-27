angular.module('encontreMe').controller('cadastroDesaparecidoController', function ($scope, $resource, Upload, recursoListaDesaparecido, ngNotify, Map) {

    $scope.place = {};
    $scope.pessoasDesaparecidas = [];
    $scope.pessoa = {};
    $scope.isCadastro = false;
    $scope.meuForm = '';

    // Obtem acesso ao formulário passado no modal
    $scope.InicializaFormulario = function (form) {
        $scope.meuForm = form;
    };

    $scope.resetForm = function(){
        $scope.meuForm.$setPristine();
        $scope.meuForm.$setUntouched();
    }

    $scope.search = function () {
        $scope.apiError = false;
        Map.search($scope.searchPlace)
            .then(
            function (res) { // success
                Map.addMarker(res);
                $scope.place.name = res.name;
                $scope.place.lat = res.geometry.location.lat();
                $scope.place.lng = res.geometry.location.lng();
            },
            function (status) { // error
                $scope.apiError = true;
                $scope.apiStatus = status;
            }
            );
    }

    $scope.send = function () {
        alert($scope.place.name + ' : ' + $scope.place.lat + ', ' + $scope.place.lng);
    }

    Map.init();

    $scope.removerPessoa = function (pessoa) {
        alert('falta implementar back end e atualizar a lista para remover a pessoa excluída')
    }

    $scope.editarPessoa = function (pessoa) {
        $scope.pessoa = pessoa;
        $scope.isCadastro = true;
        $scope.resetForm();
    }

    $scope.adicionarPessoa = function () {
        $scope.pessoa = {};
        $scope.isCadastro = true;
        $scope.resetForm();
        
    }

    $scope.buscarTodos = function () {

        //var divLoad = loading.carregarDados();

        recursoListaDesaparecido.query(function (cad) {
            $scope.pessoasDesaparecidas = cad;
            //divLoad.finish();
        }, function (erro) {
            //divLoad.finish();
            ngNotify.set('Não foi possivel buscar todos as pessoas', 'error');
        });
    };
    $scope.buscarTodos();

    //Upload
    $scope.upload = function (file) {

        $scope.pessoa.BO_DESAPARECIDO = file.name;

        Upload.upload({
            url: 'Upload/UploadPDF.ashx',
            data: { file: file }
        }).then(function (resp) {
        }, function (resp) {
        }, function (evt) {
        });
    };


    $scope.uploadFiles = function (file, errFiles) {
        $scope.f = file;
        $scope.errFile = errFiles && errFiles[0];
    }

    $scope.salvarPessoa = function () {

        $scope.f ? $scope.upload($scope.f) : '';

        if ($scope.pessoa.COD_DESAPARECIDO) {
            console.log($scope.pessoa);
            recursoListaDesaparecido.atualizar({ desaparecidoId: $scope.pessoa.COD_DESAPARECIDO }, $scope.pessoa, function (retorno) {
                //divLoad.finish();
                ngNotify.set('Cadastro atualizado com sucesso', 'info');
                $scope.buscarTodos();
            }, function (erro) {
                //divLoad.finish();
                ngNotify.set('Não foi possivel atualizar o registro', 'error');
                $scope.buscarTodos();
            });
        }
        else {
            recursoListaDesaparecido.salvar($scope.pessoa, function (retorno) {
                //divLoad.finish();
                ngNotify.set('Pessoa cadastrada com sucesso', 'info');
                $scope.buscarTodos();
            }, function (erro) {
                //divLoad.finish();
                ngNotify.set('Não foi possivel cadastrar a pessoa', 'error');
                $scope.resetForm();
                $scope.buscarTodos();
            });
        }
    }
});

