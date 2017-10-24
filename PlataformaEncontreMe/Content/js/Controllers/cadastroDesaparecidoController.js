angular.module('encontreMe').controller('cadastroDesaparecidoController', function ($scope, $resource, $routeParams, $filter, Upload, recursoListaDesaparecido, ngNotify, Map, CompararImagem) {

    $scope.place = {};
    $scope.pessoasDesaparecidas = [];
    $scope.pessoa = {};
    var Localizacao = [];
    $scope.showfotoComparacao = false;

    $scope.isCadastro = false;
    $scope.meuForm = '';
    $scope.editMode = false;

    // Obtem acesso ao formulário passado no modal
    $scope.InicializaFormulario = function (form) {
        $scope.meuForm = form;
    };

    $scope.resetForm = function () {
        $scope.meuForm.$setPristine();
        $scope.meuForm.$setUntouched();
    }

    $scope.$watch('pessoa.DATA_DESAPARECIDO', function (newValue) {
        if ($scope.editMode) {
            $scope.pessoa.DATA_DESAPARECIDO = $filter('date')(newValue, 'dd/MM/yyyy');
        }
    });

    $scope.mapMarkerCallBack = function (latitude, longitude) {
        Localizacao.push({ LATITUDE_LOCALIZACAO: latitude, LONGITUDE_LOCALIZACAO: longitude });
    }

    $scope.search = function () {
        $scope.apiError = false;

    }

    $scope.send = function () {
        alert($scope.place.name + ' : ' + $scope.place.lat + ', ' + $scope.place.lng);
    }


    Map.init($scope.mapMarkerCallBack);

    $scope.removerPessoa = function (pessoa) {
        alert('falta implementar back end e atualizar a lista para remover a pessoa excluída')
    }

    $scope.editarPessoa = function (pessoa) {
        $scope.pessoa = pessoa;
        $scope.isCadastro = true;
        $scope.resetForm();
        window.setTimeout(function () { Map.init($scope.mapMarkerCallBack); }, 1000);
    }

    $scope.adicionarPessoa = function () {
        $scope.pessoa = {};
        $scope.isCadastro = true;
        $scope.resetForm();
        window.setTimeout(function () { Map.init($scope.mapMarkerCallBack); }, 1000);
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

    if (!$routeParams.id) {
        $scope.buscarTodos();
        $scope.editMode = false;
    } else {
        Localizacao = [];
        recursoListaDesaparecido.busca({ id: $routeParams.id },
            function (data) {
                $scope.pessoa = data;
                $scope.editMode = true;
                if (data.Localizacao && data.Localizacao.length > 0) {
                    Localizacao = data.Localizacao;
                    for (var i = 0; i < Localizacao.length; i++) {
                        Map.addMarker(Localizacao[i].LATITUDE_LOCALIZACAO, Localizacao[i].LONGITUDE_LOCALIZACAO);
                    }
                    //Marca os pontos no mapa
                }
                $scope.isCadastro = true;
            },
            function (erro) { ngNotify.set('Cadastro atualizado com sucesso', 'info'); });
        $scope.isCadastro = true;
    }

    //Upload
    $scope.upload = function (file, succesFunc) {

        $scope.pessoa.BO_DESAPARECIDO = file.name;

        Upload.upload({
            url: 'Upload/UploadPDF.ashx',
            data: { file: file }
        }).then(function (resp) {
            if (succesFunc) {
                succesFunc();
            }
        }, function (resp) {
        }, function (evt) {
        });
    };

    $scope.setImgAsBase64 = function (file) {
        //TODO: validation
        var arquivo = file.files[0];
        var reader = new FileReader();
        reader.onloadend = function () {
            $scope.pessoa.STR_FOTO_DESAPARECIDO = reader.result;
        }
        reader.readAsDataURL(arquivo);
    }

    $scope.setImgComparar = function (file) {
        var arquivo = file.files[0];
        var reader = new FileReader();
        reader.onloadend = function () {
            $scope.fotoComparacao = reader.result;
            $scope.showfotoComparacao = true;
            $scope.$apply();
        }
        reader.readAsDataURL(arquivo);
    }


    $scope.comparar = function () {
        img = $scope.fotoComparacao;
        CompararImagem.compararImg(img, $scope.pessoa.COD_DESAPARECIDO).
            then(function (response) {
                if (response.data.resultado) {
                    ngNotify.set('Existe semelhança entre as imagens', 'info');
                }
                else {
                    ngNotify.set('Não existe semelhança entre as imagens', 'info');
                }
            },
            function (erro) {
                ngNotify.set('Erro ao efetuar comparação de imagens', 'erro');
            }
            );
    }

    $scope.uploadFiles = function (file, errFiles) {
        $scope.f = file;
        $scope.errFile = errFiles && errFiles[0];
    }

    $scope.salvarPessoa = function () {
        $scope.pessoa.Localizacao = Localizacao;
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
            $scope.f ? $scope.upload($scope.f, function () {

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
            }) : '';
        }
    }
});

