import React, { useState, useMemo } from 'react';
import Head from "next/head";
import { api } from "~/utils/api";
import Pagination from '~/components/Pagination';
import getLoggedInUser from '~/utils/getLoggedInUser';


interface Category {
  id: number;
  name: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  otp: string | null;
  categories: Categories;
}
interface Categories {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  userId: number | null;
}[];

export default function Home() {
  let PageSize = 6;
  const userData: any = getLoggedInUser();

  const { data: categories } = api.category.allCategories.useQuery();
  const { data: user } = api.user.getUserById.useQuery(userData?.user?.id);

  const updateUser = api.user.updateUserCategories.useMutation();
  const [currentPage, setCurrentPage] = useState(1);


  const totalCategories = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return categories?.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, categories]);

  const categoryIds: any = user?.categories?.map(category => category?.id);

  const addCategoryToUser = async (category: Category, checked: boolean) => {
    try {
      if (!user) return;

      let updatedSelectedCategories;
      if (checked) {
        updatedSelectedCategories = [...categoryIds, category.id];
      } else {
        updatedSelectedCategories = categoryIds.filter((id: number) => id !== category.id);
      }

      updateUser.mutate({ userId: user?.id, categoryIds: updatedSelectedCategories });

    } catch (error) {
      console.error("Error updating user's categories:", error);
    }
  };

  return (
    <>
      <Head>
        <title>Turnover | Home</title>
        <meta name="description" content="Turnover home page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex items-center justify-center h-full ">
        <div className="w-full bg-white rounded-[20px] shadow md:mt-0 sm:max-w-lg xl:p-0 border-[1px] ">
          <div className=" space-y-4 md:space-y-6 p-16 text-[#333333]">
            <h1 className="text-xl font-bold text-center tracking-tight text-black md:text-2xl ">
              Please mark your interests
              <div className='font-medium text-base'>
                We will keep you notified.
              </div>
            </h1>
            <div>
              <div className="my-2 text-black ">
                My saved Interests !
              </div>
              <div className="flex flex-col gap-2">
                {
                  totalCategories && totalCategories?.map((category: Category) => {
                    return (
                      <div key={category.id} className="flex flex-row gap-3">
                        <input type="checkbox" name="category"
                          id={`category_${category.id}`}
                          value={category.id}
                          checked={user && categoryIds?.includes(category?.id)}
                          onChange={(e) => {
                            addCategoryToUser(category, e.target.checked)
                          }}
                        />
                        {category.name}
                      </div>
                    )
                  })
                }
              </div>
              <Pagination
                className="pagination-bar mt-8"
                currentPage={currentPage}
                totalCount={categories?.length}
                pageSize={PageSize}
                onPageChange={(page: number) => setCurrentPage(page)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
