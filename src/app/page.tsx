"use client";
import { NextUIProvider, Pagination, pagination } from "@nextui-org/react";
import Header from "../components/header";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { ProductChart, Products } from "../types/productTypes";
import { FaStar } from "react-icons/fa6";
import Image from "next/image";
import Spinner from "@/components/spinner";
import useDebounce from "@/components/debounce";
import Footer from "@/components/footer";
const BarChart = dynamic(() => import("../components/graph/barChart"), {
  loading: () =>  <Spinner />,
});

export default function Home() {
  const [productList, setProductList] = useState<Products>({});
  const [skip, setSkip] = useState<number>(0);
  const [chartData,setChartData]=useState<ProductChart>({product:[],stock:[]})
  const [search, setSearch] = useState<string>('');
  const debouncedSearch = useDebounce(search, 300);

  const getProductData = async (skip: number,search:string='') => {
    fetch(`https://dummyjson.com/products/search?limit=10&skip=${skip}&q=${search}`)
      .then((res) => res.json())
      .then((data) => {
        handleResponseData(data)
      });
  };



  const handleResponseData=(data:Products)=>{
    if(chartData?.product?.length!==0){
      data?.products?.forEach((val:any) => {
        chartData?.product?.forEach(($:any,i:number)=>{
          if(val?.title==$){
            val.isChecked=true
          }
        })
      })
    }else{
      data?.products?.forEach((val:any,i:number) => {
        if(skip==0&&i<5){
          val.isChecked=true
          handleCheckbox(val?.title,val?.stock,true)
        }else{
          val.isChecked=false
        }
      })
    }
    setProductList(data);

  }

  const handleCheckbox=(title:string,stocks:number,type:boolean)=>{
    let product:any=chartData.product,stock:any=chartData.stock
    let a=product.indexOf(title)
    let b=stock.indexOf(stocks)
    if(type){
      if(a==-1&&b==-1){
        product?.push(title)
        stock?.push(stocks)
        setChartData({product,stock})
      }
    }else{
      if (a > -1) { 
        product.splice(a, 1); 
      }
      if (b > -1) { 
        stock.splice(b, 1); 
      }
      setChartData({product,stock})
    }
  }

  const onChangeCheckBox = (e: {
    target: { checked: boolean; value: React.SetStateAction<string> };}) => {
      const { value, checked: isChecked } = e.target;
      let data1=productList.products
      data1?.forEach((val:any,i:number) => {
        if(val?.id==value){
          val.isChecked=isChecked
          handleCheckbox(val?.title,val?.stock,isChecked)
        }
      })
      setProductList({...productList,products:data1})

  };

  useEffect(() => {
    getProductData(skip,'');
  }, [skip]);

  useEffect(() => {
      getProductData(skip,debouncedSearch);
  }, [debouncedSearch]);


  const pagination = (page: number, limit: number) => {
    let pageSkip = page == 1 ? 0 : page * limit - limit;
    setSkip(pageSkip);
  };

  return (
    <>
      <NextUIProvider>
        <Header />

        <div className="w-full bg-[#DFCCFB] flex justify-center">
          <div className="flex  flex-col bg-[#DFCCFB] w-11/12 2xl:w-3/4 p-4 pb-2">
            <BarChart chartData={chartData} />
          </div>
        </div>

        <main className="flex min-h-screen flex-col bg-[#DFCCFB] items-center justify-between p-4 pt-2">
          <div className="flex w-full justify-center h-full m-4">
            <div className="w-11/12 2xl:w-3/4 mx-auto bg-white shadow-lg rounded-2xl border border-gray-200">
              <header className="px-5 flex justify-between py-4 border-b  border-gray-100">
                <h2 className="font-semibold text-gray-800">Customers</h2>
                <input className="bg-gray-100 px-3 py-2 rounded-2xl w-1/3" onChange={(a)=>{setSearch(a?.target?.value)}} type="text" placeholder="Search product..." />
              </header>
              <div className="p-3">
                <div className="overflow-x-auto">
                  <table className="table-auto w-full">
                    <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                      <tr>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-left"></div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-left">
                            Product Name
                          </div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-left">
                            Category
                          </div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-left">Price</div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-center">Stock</div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-center">
                            Rating
                          </div>
                        </th>
                      </tr>
                    </thead>
                     {productList?.products?.length ?
                    <tbody className="text-sm divide-y divide-gray-100">
                      {productList?.products?.map((data) => {
                        return (
                          <tr key={data?.id}>
                            <td>
                              <label
                                htmlFor={data.title}
                                className="checkLabel"
                              >
                                <input
                                  type="checkbox"
                                  value={data.id}
                                  name="time"
                                  onChange={onChangeCheckBox}
                                  id={data.title}
                                  checked={data.isChecked}
                                />
                                <span className="checkSpan"></span>
                              </label>
                            </td>
                            <td className="p-2 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                                  <Image
                                    src={data?.thumbnail??''}
                                    alt={data?.title??''}
                                    height={40}
                                    width={40}
                                    className="w-auto h-auto"
                                    priority
                                  />
                                </div>
                                <div className="font-medium text-gray-800 capitalize">
                                  {data?.title}
                                </div>
                              </div>
                            </td>
                            <td className="p-2 whitespace-nowrap capitalize">
                              <div className="text-left">{data?.category}</div>
                            </td>
                            <td className="p-2 whitespace-nowrap">
                              <div className="text-left font-medium text-green-500">
                                ${data?.price}
                              </div>
                            </td>
                            <td className="p-2 whitespace-nowrap">
                              <div className="text-base text-center">
                                {data?.stock}
                              </div>
                            </td>
                            <td className="p-2 whitespace-nowrap">
                              <div className="text-base text-center flex justify-center">
                                <FaStar color="#f0cf13" className="mt-1" />
                                {data?.rating}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>:
                    <tbody>
                    <tr>
                        <td colSpan={6} className="text-center p-10 text-xl" >
                            No data available
                        </td>
                    </tr>
                </tbody>}
                  </table>
                </div>
              </div>
              {productList?.total!==0&&<div className="w-full float-right">
                {productList?.total && (
                  <Pagination
                    onChange={(page) => {
                      pagination(page, productList?.limit??10);
                    }}
                    total={productList?.total / productList?.limit!}
                    initialPage={1}
                    className="float-right p-8"
                  />
                )}
              </div>}
            </div>
          </div>
          {/* </section> */}
        </main>
        <Footer/>
      </NextUIProvider>
    </>
  );
}
