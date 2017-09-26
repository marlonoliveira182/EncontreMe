angular.module('encontreMe').controller('indexController', function ($scope, $http) {


    //$scope.reddit = new Reddit();

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
             complemento: 'casa',
             resumo: 'No dia seguinte a família foi informada que ele recebeu alta.'
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
             complemento: 'casa',
             resumo: 'Em seguida foram informados que ele  sumiu.'
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
             complemento: 'casa',
             resumo: 'sumiu.'
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
             complemento: 'casa',
             resumo: 'Hospital Nossa Senhora do Rocio de Campo Largo. Ele foi diagnosticado com traumatismo craniano e permaneceu um dia internado. No dia seguinte a família foi informada que ele recebeu alta. Em seguida foram informados que ele  sumiu.'
         }
    ];
    $scope.usuario = [
                {
                    nome: 'Caio Pires',
                    dtCadastro: '25/09/2017',
                    dtUltimaAtualizacao: '25/09/2017',
                    rg: '556894587',
                    cpf: '56936585963',
                    sexo: 'M',
                    endereco: 'Endereço teste',
                    numero: '444',
                    complemento: 'casa',
                    resumo: 'Em seguida foram informados que ele  sumiu.'
                }
    ];

});



