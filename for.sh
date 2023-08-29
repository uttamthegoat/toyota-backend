echo "Enter a number: "
read n

sum=0

# Calculation of the addition of the first 'n' natural numbers with the help of the 'for' loop.
for((i=1;i<=n;i++))
do
    sum=$((sum + i)) 
done

echo "The sum of First "$n "natural numbers is "$sum"."
