<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::resource('/users', 'UserController');
Route::resource('/products', 'ProductController');
Route::post('/products/{id}', 'ProductController@update');

/*
Route::get('/products', 'ProductController@index');
Route::get('/products/{id}', 'ProductController@edit');
Route::post('/products', 'ProductController@store');
Route::post('/products/{id}', 'ProductController@update');
Route::delete('/products/{id}', 'ProductController@destroy');
*/
