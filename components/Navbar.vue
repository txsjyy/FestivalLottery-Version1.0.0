<template>
  <div>
    <nav>
    <ul>
      <li><a :class="{ active: currentPage === '1d' }" href="/1d">特等奖</a></li>
        <li><a :class="{ active: currentPage === '1n' }" href="/1n">大奖</a></li>
        <li><a :class="{ active: currentPage === '3n' }" href="/3n">幸运奖</a></li>
        <li><a :class="{ active: currentPage === '' }" href="/">参与奖</a></li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: String,
      required: true
    }
  }
}
</script>

<style>
/* Basic navbar styling */
nav {
  background-color: #333;
  color: white;
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
}
nav ul {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}
nav ul {
  list-style-type: none;
  padding: 0;
  display: flex;
  justify-content: space-around;
}
nav li {
  margin: 0 15px;
}
nav a {
  text-decoration: none;
  color: grey;
  padding: 5px 10px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}
nav a:hover {
  background-color: lightgrey;
}
/* Active link styling */
nav a.active {
  background-color: #007BFF;
  color: white;
}
</style>