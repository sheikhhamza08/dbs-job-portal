import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";
import { motion } from "framer-motion";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";

function CategoryCarousel() {
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${JOB_API_END_POINT}/categories`);
        if (response.data.success) {
          setCategories(response.data.categories);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, []);

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="px-[5%] lg:px-[10%] my-16"
    >
      <h2 className="text-2xl sm:text-3xl font-bold text-[#002855] text-center mb-2">
        Explore by Role
      </h2>
      <p className="text-center text-muted-foreground mb-8">
        Popular categories for DBS graduates
      </p>

      <Carousel className="w-full max-w-4xl mx-auto">
        <CarouselContent>
          {categories.map((cat) => (
            <CarouselItem
              key={cat}
              className="basis-auto pl-3"
            >
              <Button
                onClick={() => searchJobHandler(cat)}
                variant="outline"
                className="rounded-full cursor-pointer border-[#002855]/20 text-[#002855] hover:bg-[#002855] hover:text-white transition-all duration-300 whitespace-nowrap"
              >
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </motion.section>
  );
}

export default CategoryCarousel;
