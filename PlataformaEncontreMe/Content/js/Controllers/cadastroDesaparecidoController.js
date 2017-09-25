angular.module('encontreMe').controller('cadastroDesaparecidoController', function ($scope, Map) {

    $scope.place = {};
    $scope.pessoasDesaparecidas = [
        {
            nome: 'Lucas Fonseca',
            dtCadastro: '25/09/2017',
            dtUltimaAtualizacao: '25/09/2017',
            rg: '448597845',
            cpf: '42456985475',
            sexo: 'M',
            endereco: 'Endereço teste',
            numero: '444',
            complemento: 'casa'
        },
        {
            nome: 'Caio Pires',
            dtCadastro: '25/09/2017',
            dtUltimaAtualizacao: '25/09/2017',
            rg: '556894587',
            cpf: '56936585963',
            sexo: 'M',
            endereco: 'Endereço teste',
            numero: '444',
            complemento: 'casa'
        },
        {
            nome: 'Maria das Dores',
            dtCadastro: '25/09/2017',
            dtUltimaAtualizacao: '25/09/2017',
            rg: '475216935',
            cpf: '85478523696',
            sexo: 'F',
            endereco: 'Endereço teste',
            numero: '444',
            complemento: 'casa'
        },
        {
            nome: 'John McAfee',
            dtCadastro: '25/09/2017',
            dtUltimaAtualizacao: '25/09/2017',
            rg: '448597845',
            cpf: '42456985475',
            sexo: 'M',
            endereco: 'Endereço teste',
            numero: '444',
            complemento: 'casa'
        }
    ];
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

    $scope.salvarPessoa = function () {
        if ($scope.meuForm.$valid) {
            alert('falta implementar back end')
        }
    }
});