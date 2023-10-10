<?php

namespace App\Http\Controllers;

use App\Product;
use Illuminate\Http\Request;
use App\Http\Requests\ProductRequest;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Product::get()->toJson();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ProductRequest $request)
    {
        if ($request->hasFile('image')) {
            $destinationPath = 'images';
            $myImage = $request->image->getClientOriginalName();
            $request->image->move(public_path($destinationPath), $myImage);
        } else {
            $myImage = null;
        }

        $product = new Product();
        $product->name = $request->name;
        $product->image = $myImage;
        $product->save();
        return $product->toJson();
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function edit(Product $product)
    {
        return $product->toJson();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(ProductRequest $request, $productId)
    {
        if ($request->hasFile('image')) {
            $destinationPath = 'images';
            $myImage = $request->image->getClientOriginalName();
            $request->image->move(public_path($destinationPath), $myImage);
        }

        $product = Product::find($productId);
        $product->name = $request->name;
        if ($request->hasFile('image')){
            $product->image = $myImage;
        }
        $product->save();

        return response()->json('success');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product)
    {
        $product->delete();

        return response()->json('Delete successful!');
    }
}
